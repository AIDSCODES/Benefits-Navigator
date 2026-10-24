/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect } from 'vitest';
import {
  getAllDeadlines,
  getEventsForDate,
  getEventsForMonth,
  getUpcomingUrgentEvents,
  getDaysRemaining,
  generateIcsCalendarContent,
  getFiscalYearSchedule,
} from '../data/schemeDeadlinesData.ts';

describe('Deadlines & Fiscal Calendar Service', () => {
  it('1. Returns baseline welfare deadlines with valid schema and chronological sorting', () => {
    const deadlines = getAllDeadlines();
    expect(deadlines.length).toBeGreaterThanOrEqual(10);

    // Verify chronological ordering
    for (let i = 1; i < deadlines.length; i++) {
      const prevTime = new Date(deadlines[i - 1].date).getTime();
      const currTime = new Date(deadlines[i].date).getTime();
      expect(currTime).toBeGreaterThanOrEqual(prevTime);
    }

    // Verify essential event fields
    const first = deadlines[0];
    expect(first.id).toBeDefined();
    expect(first.schemeId).toBeDefined();
    expect(first.schemeName).toBeDefined();
    expect(first.schemeCode).toBeDefined();
    expect(first.title.en).toBeDefined();
    expect(first.eventType).toMatch(/closing_date|renewal_period|disbursement|ekyc_deadline/);
    expect(first.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(first.officialUrl).toMatch(/^https?:\/\//);
    expect(first.actionRequired.en).toBeDefined();
  });

  it('2. Properly filters by eventType (closing_date, ekyc_deadline, disbursement)', () => {
    const closingDates = getAllDeadlines({ eventType: 'closing_date' });
    expect(closingDates.length).toBeGreaterThan(0);
    expect(closingDates.every((e) => e.eventType === 'closing_date')).toBe(true);

    const disbursements = getAllDeadlines({ eventType: 'disbursement' });
    expect(disbursements.length).toBeGreaterThan(0);
    expect(disbursements.every((e) => e.eventType === 'disbursement')).toBe(true);

    const ekycEvents = getAllDeadlines({ eventType: 'ekyc_deadline' });
    expect(ekycEvents.length).toBeGreaterThan(0);
    expect(ekycEvents.every((e) => e.eventType === 'ekyc_deadline')).toBe(true);
  });

  it('3. Filters deadlines by state and retains national all_india events', () => {
    const mhEvents = getAllDeadlines({ state: 'Maharashtra' });
    expect(mhEvents.length).toBeGreaterThan(0);

    // Should include Maharashtra-specific event
    expect(mhEvents.some((e) => e.state === 'Maharashtra')).toBe(true);
    // Should also include national all_india events applicable in Maharashtra
    expect(mhEvents.some((e) => e.state === 'all_india')).toBe(true);
    // Should NOT include Karnataka-specific events
    expect(mhEvents.every((e) => e.state !== 'Karnataka')).toBe(true);

    const kaEvents = getAllDeadlines({ state: 'Karnataka' });
    expect(kaEvents.some((e) => e.state === 'Karnataka')).toBe(true);
    expect(kaEvents.every((e) => e.state !== 'Maharashtra')).toBe(true);
  });

  it('4. Queries events for specific dates and months accurately', () => {
    const novEvents = getEventsForMonth(2026, 11);
    expect(novEvents.length).toBeGreaterThanOrEqual(4);
    expect(novEvents.every((e) => e.date.startsWith('2026-11'))).toBe(true);

    // Date query for PM-KISAN 19th installment (2026-11-15)
    const nov15Events = getEventsForDate('2026-11-15');
    expect(nov15Events.length).toBeGreaterThanOrEqual(1);
    expect(nov15Events.some((e) => e.schemeCode.includes('PM-KISAN') || e.schemeCode.includes('MAHADBT'))).toBe(true);

    // Non-existent date
    const emptyDate = getEventsForDate('2026-06-01');
    expect(emptyDate.length).toBe(0);
  });

  it('5. Computes days remaining and extracts urgent countdown deadlines', () => {
    const daysLeft = getDaysRemaining('2026-11-10', '2026-10-25');
    expect(daysLeft).toBe(17);

    const urgent = getUpcomingUrgentEvents(3);
    expect(urgent.length).toBeGreaterThanOrEqual(1);
    expect(urgent.length).toBeLessThanOrEqual(3);
  });

  it('6. Generates valid RFC 5545 standard .ics calendar payload for Google/Apple/Outlook import', () => {
    const sampleEvent = getAllDeadlines()[0];
    const { filename, icsContent } = generateIcsCalendarContent(sampleEvent);

    expect(filename).toMatch(/\.ics$/);
    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('VERSION:2.0');
    expect(icsContent).toContain('BEGIN:VEVENT');
    expect(icsContent).toContain(`UID:yojana360-${sampleEvent.id}@benefits-navigator.org`);
    expect(icsContent).toContain('BEGIN:VALARM');
    expect(icsContent).toContain('TRIGGER:-P2D');
    expect(icsContent).toContain('END:VEVENT');
    expect(icsContent).toContain('END:VCALENDAR');
  });

  it('7. Provides complete Fiscal Year disbursement roadmap for FY 2026-27', () => {
    const schedule = getFiscalYearSchedule(2026);
    expect(schedule.length).toBe(4); // Q1, Q2, Q3, Q4

    const quarters = schedule.map((s) => s.quarter);
    expect(quarters).toEqual(['Q1', 'Q2', 'Q3', 'Q4']);

    schedule.forEach((q) => {
      expect(q.fiscalYear).toBe('2026-27');
      expect(q.majorDisbursements.length).toBeGreaterThan(0);
      q.majorDisbursements.forEach((d) => {
        expect(d.schemeName).toBeDefined();
        expect(d.amount).toBeDefined();
        expect(d.expectedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });
});
