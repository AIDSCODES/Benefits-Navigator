/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Download,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Layers,
  Sparkles,
  MapPin,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../lib/engine/types.ts';
import {
  SchemeDeadlineEvent,
  DeadlineEventType,
  getAllDeadlines,
  getEventsForMonth,
  getEventsForDate,
  getUpcomingUrgentEvents,
  getDaysRemaining,
  downloadIcsFile,
  getFiscalYearSchedule,
} from '../data/schemeDeadlinesData.ts';
import { STATES_AND_UTS_DATA } from '../data/statesData.ts';

interface DeadlinesCalendarViewProps {
  lang: SupportedLanguage;
  onCheckEligibility?: (preset: Partial<UserProfile>) => void;
  onNavigateTab?: (tab: string) => void;
  onSetReminderAlert?: (event: SchemeDeadlineEvent) => void;
}

export const DeadlinesCalendarView: React.FC<DeadlinesCalendarViewProps> = ({
  lang,
  onCheckEligibility,
  onNavigateTab,
  onSetReminderAlert,
}) => {
  // Current view month & year (defaulting to Nov 2026 to showcase the active fiscal deadlines)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(11); // 1-12 (November)

  const [selectedState, setSelectedState] = useState<string>('all_india');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-11-15');
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch filtered events for list view
  const allFilteredEvents = useMemo(() => {
    return getAllDeadlines({
      state: selectedState,
      eventType: eventTypeFilter,
      searchQuery,
    });
  }, [selectedState, eventTypeFilter, searchQuery]);

  // Urgent upcoming events
  const urgentEvents = useMemo(() => {
    return getUpcomingUrgentEvents(3, selectedState);
  }, [selectedState]);

  // Events for current calendar month
  const currentMonthEvents = useMemo(() => {
    return getEventsForMonth(currentYear, currentMonth, selectedState);
  }, [currentYear, currentMonth, selectedState]);

  // Events for selected date in drawer/detail view
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate, selectedState);
  }, [selectedDate, selectedState]);

  // Fiscal Year roadmap
  const fiscalSchedule = useMemo(() => {
    return getFiscalYearSchedule(2026);
  }, []);

  // Calendar grid calculations
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

    const days: {
      day: number;
      isCurrentMonth: boolean;
      dateStr: string;
      events: SchemeDeadlineEvent[];
    }[] = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i;
      const m = currentMonth === 1 ? 12 : currentMonth - 1;
      const y = currentMonth === 1 ? currentYear - 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        day: dayNum,
        isCurrentMonth: false,
        dateStr,
        events: getEventsForDate(dateStr, selectedState),
      });
    }

    // Current month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        isCurrentMonth: true,
        dateStr,
        events: getEventsForDate(dateStr, selectedState),
      });
    }

    // Next month padding days to fill 35 or 42 cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let n = 1; n <= remainingCells; n++) {
      const m = currentMonth === 12 ? 1 : currentMonth + 1;
      const y = currentMonth === 12 ? currentYear + 1 : currentYear;
      const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
      days.push({
        day: n,
        isCurrentMonth: false,
        dateStr,
        events: getEventsForDate(dateStr, selectedState),
      });
    }

    return days;
  }, [currentYear, currentMonth, selectedState]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    const today = new Date();
    // Anchor to Nov 2026 or today's year/month
    setCurrentYear(2026);
    setCurrentMonth(11);
    setSelectedDate('2026-11-15');
  };

  const triggerToast = (msg: string) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(null), 3500);
  };

  const handleDownloadIcs = (event: SchemeDeadlineEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    downloadIcsFile(event);
    triggerToast(`📅 Reminder saved! "${event.schemeCode}" added to calendar.`);
  };

  const handleSetReminder = (event: SchemeDeadlineEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSetReminderAlert) {
      onSetReminderAlert(event);
    }
    triggerToast(`🔔 Browser alert registered for ${event.schemeName}!`);
  };

  const getEventTypeBadge = (type: DeadlineEventType) => {
    switch (type) {
      case 'closing_date':
        return {
          label: 'Application Deadline',
          bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          dot: 'bg-rose-500',
        };
      case 'ekyc_deadline':
        return {
          label: 'e-KYC & Verification',
          bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          dot: 'bg-amber-500',
        };
      case 'renewal_period':
        return {
          label: 'Annual Renewal',
          bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          dot: 'bg-blue-500',
        };
      case 'disbursement':
        return {
          label: 'Fiscal DBT Disbursement',
          bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          dot: 'bg-emerald-500',
        };
      default:
        return {
          label: 'Important Date',
          bg: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
          dot: 'bg-stone-500',
        };
    }
  };

  const getUrgencyIndicator = (dateStr: string) => {
    const days = getDaysRemaining(dateStr, '2026-10-25');
    if (days < 0) {
      return { text: 'Past Due', color: 'text-stone-400 bg-stone-100 dark:bg-stone-800' };
    }
    if (days === 0) {
      return { text: 'Today is Last Day!', color: 'text-rose-600 bg-rose-100 dark:bg-rose-950 font-bold animate-pulse' };
    }
    if (days <= 7) {
      return { text: `${days} days left - Urgent`, color: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 font-bold border border-rose-300 dark:border-rose-800' };
    }
    if (days <= 21) {
      return { text: `${days} days remaining`, color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800' };
    }
    return { text: `${days} days left`, color: 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800' };
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Toast Notification */}
      {toastAlert && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-stone-900 text-white dark:bg-white dark:text-stone-950 px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold border border-stone-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastAlert}</span>
        </div>
      )}

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold tracking-wide uppercase">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Timely Welfare Decision Support</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Deadlines & Fiscal Disbursement Calendar
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Track verified application closing dates, mandatory e-KYC renewal windows, and fiscal year Direct Benefit Transfer (DBT) release dates so you never forfeit an entitled benefit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                if (urgentEvents[0]) {
                  downloadIcsFile(urgentEvents[0]);
                  triggerToast(`Exported next urgent deadline (${urgentEvents[0].schemeCode}) to .ics file.`);
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-stone-900 hover:bg-stone-100 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-rose-600" />
              <span>Export .ICS Calendar</span>
            </button>
            <button
              onClick={() => {
                setViewMode(viewMode === 'calendar' ? 'timeline' : 'calendar');
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-all cursor-pointer"
            >
              {viewMode === 'calendar' ? (
                <>
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Switch to Agenda List</span>
                </>
              ) : (
                <>
                  <CalendarIcon className="w-4 h-4 text-emerald-400" />
                  <span>Switch to Calendar Grid</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Urgent Alert Ticker */}
        {urgentEvents.length > 0 && (
          <div className="mt-8 pt-6 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-3 gap-3">
            {urgentEvents.map((ue) => (
              <div
                key={ue.id}
                onClick={() => setSelectedDate(ue.date)}
                className="flex items-start gap-3 p-3 rounded-2xl bg-stone-800/50 hover:bg-stone-800 border border-stone-700/60 cursor-pointer transition-colors"
              >
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-stone-400">
                    <span>{ue.date}</span>
                    <span className="text-rose-400 font-semibold">{getUrgencyIndicator(ue.date).text}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{ue.schemeName}</h4>
                  <p className="text-[11px] text-stone-300 line-clamp-1">{ue.title[lang] || ue.title.en}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Filters & View Controls ── */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Region / State Filter */}
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              id="calendar-state-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900 dark:text-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="all_india">🇮🇳 All India (National Deadlines)</option>
              {STATES_AND_UTS_DATA.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.type === 'union_territory' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name, e-KYC or deadline..."
              className="w-full bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* View Mode Pills */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Timeline ({allFilteredEvents.length})</span>
            </button>
          </div>
        </div>

        {/* Event Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-stone-100 dark:border-stone-800">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>Event Category:</span>
          </span>
          {[
            { id: 'all', label: 'All Dates' },
            { id: 'closing_date', label: '🔴 Application Deadlines' },
            { id: 'ekyc_deadline', label: '🟡 e-KYC & Bio Auth' },
            { id: 'renewal_period', label: '🔵 Annual Renewals' },
            { id: 'disbursement', label: '🟢 Fiscal DBT Disbursals' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setEventTypeFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                eventTypeFilter === cat.id
                  ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main View Area: Calendar Grid vs. Timeline List ── */}
      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Month Matrix (Left 2 Columns) */}
          <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            {/* Calendar Month Header Navigation */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>{monthNames[currentMonth - 1]}</span>
                  <span className="text-stone-400 font-normal">{currentYear}</span>
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {currentMonthEvents.length} scheduled welfare dates this month
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleJumpToToday}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                >
                  Nov 2026 Focus
                </button>
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                  <button
                    onClick={handlePrevMonth}
                    aria-label="Previous Month"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    aria-label="Next Month"
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider py-1 border-b border-stone-100 dark:border-stone-800">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Day Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {calendarDays.map((cell, idx) => {
                const isSelected = selectedDate === cell.dateStr;
                const hasEvents = cell.events.length > 0;
                const hasClosing = cell.events.some((e) => e.eventType === 'closing_date');
                const hasEkyc = cell.events.some((e) => e.eventType === 'ekyc_deadline');
                const hasDisbursement = cell.events.some((e) => e.eventType === 'disbursement');

                return (
                  <button
                    key={`${cell.dateStr}-${idx}`}
                    onClick={() => setSelectedDate(cell.dateStr)}
                    className={`min-h-[70px] sm:min-h-[88px] p-1.5 sm:p-2 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 shadow-sm ring-2 ring-amber-500/20'
                        : cell.isCurrentMonth
                        ? 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-300 dark:hover:border-stone-700'
                        : 'border-transparent bg-stone-50/50 dark:bg-stone-950/20 text-stone-300 dark:text-stone-700 hover:bg-stone-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-xs font-bold ${
                          isSelected
                            ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                            : cell.isCurrentMonth
                            ? 'text-stone-800 dark:text-stone-200'
                            : 'text-stone-400 dark:text-stone-600'
                        }`}
                      >
                        {cell.day}
                      </span>
                      {hasEvents && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-950">
                          {cell.events.length}
                        </span>
                      )}
                    </div>

                    {/* Event Type Dot Indicators */}
                    {hasEvents && (
                      <div className="space-y-1 mt-1">
                        {cell.events.slice(0, 2).map((ev) => {
                          const badge = getEventTypeBadge(ev.eventType);
                          return (
                            <div
                              key={ev.id}
                              className={`text-[10px] truncate px-1.5 py-0.5 rounded-md font-medium flex items-center gap-1 ${badge.bg}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${badge.dot}`} />
                              <span className="truncate">{ev.schemeCode}</span>
                            </div>
                          );
                        })}
                        {cell.events.length > 2 && (
                          <div className="text-[9px] text-stone-500 font-bold pl-1">
                            +{cell.events.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Color Legend */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Application Closing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>e-KYC & Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Annual Renewal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>DBT Disbursement</span>
              </div>
            </div>
          </div>

          {/* Selected Date Detail Drawer (Right 1 Column) */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Date Details
                </span>
                <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                  {selectedDate || 'Select a Date'}
                </h3>
              </div>
              {selectedDateEvents.length > 0 && (
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  {selectedDateEvents.length} Event{selectedDateEvents.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {selectedDateEvents.length === 0 ? (
              <div className="py-12 text-center space-y-3 text-stone-400">
                <CalendarIcon className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700" />
                <p className="text-sm">No scheduled deadlines or disbursements on this date.</p>
                <p className="text-xs text-stone-400">
                  Click on any date marked with a colored badge to inspect closing dates or DBT payouts.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
                {selectedDateEvents.map((event) => {
                  const badge = getEventTypeBadge(event.eventType);
                  const urgency = getUrgencyIndicator(event.date);

                  return (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${urgency.color}`}>
                          {urgency.text}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-stone-900 dark:text-white leading-snug">
                          {event.title[lang] || event.title.en}
                        </h4>
                        <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
                          {event.schemeName} ({event.schemeCode})
                        </div>
                      </div>

                      {event.amountOrBenefit && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{event.amountOrBenefit}</span>
                        </div>
                      )}

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {event.description[lang] || event.description.en}
                      </p>

                      <div className="text-xs bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-amber-900 dark:text-amber-200">
                        <strong className="block text-[11px] uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-0.5">
                          Action Required:
                        </strong>
                        <span>{event.actionRequired[lang] || event.actionRequired.en}</span>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        {onCheckEligibility && (
                          <button
                            onClick={() => {
                              onCheckEligibility({
                                occupation: event.category === 'agriculture' ? 'farmer' : event.category === 'education' ? 'student' : undefined,
                              });
                            }}
                            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                          >
                            <span>Check Eligibility</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        <a
                          href={event.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 text-xs font-bold inline-flex items-center gap-1"
                          title="Open official portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={(e) => handleDownloadIcs(event, e)}
                          className="p-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          title="Save to Google/Apple Calendar (.ics)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => handleSetReminder(event, e)}
                          className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 hover:bg-rose-200 text-rose-700 dark:text-rose-300 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          title="Set Browser Notification"
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── Chronological Timeline / Agenda List View ── */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Upcoming Deadlines & Disbursements Chronology ({allFilteredEvents.length})
            </h2>
            <span className="text-xs text-stone-500">Sorted by earliest closing date</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allFilteredEvents.map((event) => {
              const badge = getEventTypeBadge(event.eventType);
              const urgency = getUrgencyIndicator(event.date);

              return (
                <div
                  key={event.id}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-3.5 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs font-black text-stone-900 dark:text-white flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-stone-400" />
                          <span>{event.date}</span>
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${urgency.color}`}>
                        {urgency.text}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-white leading-tight">
                      {event.title[lang] || event.title.en}
                    </h3>

                    <div className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      {event.schemeName} · <span className="uppercase">{event.state === 'all_india' ? 'All India' : event.state}</span>
                    </div>

                    {event.amountOrBenefit && (
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{event.amountOrBenefit}</span>
                      </div>
                    )}

                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {event.description[lang] || event.description.en}
                    </p>

                    <div className="text-xs bg-stone-100 dark:bg-stone-800/80 rounded-xl p-2.5 text-stone-700 dark:text-stone-300">
                      <strong className="block text-[11px] uppercase tracking-wide text-stone-500 mb-0.5">
                        Action Required:
                      </strong>
                      <span>{event.actionRequired[lang] || event.actionRequired.en}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-stone-100 dark:border-stone-800">
                    {onCheckEligibility && (
                      <button
                        onClick={() => {
                          onCheckEligibility({
                            occupation: event.category === 'agriculture' ? 'farmer' : event.category === 'education' ? 'student' : undefined,
                          });
                        }}
                        className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
                      >
                        <span>Check My Eligibility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <a
                      href={event.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={(e) => handleDownloadIcs(event, e)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer"
                      title="Download iCal (.ics) file"
                    >
                      <Download className="w-3 h-3 text-rose-500" />
                      <span>.ICS</span>
                    </button>

                    <button
                      onClick={(e) => handleSetReminder(event, e)}
                      className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 cursor-pointer"
                      title="Set Browser Notification"
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Fiscal Year DBT Disbursement Cycle Roadmap ── */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Public Finance Planning</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
              Government of India Fiscal Year Disbursement Schedule (FY 2026-27)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Anticipated release schedules for direct transfers, scholarships, and seasonal farmer support across the four financial quarters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fiscalSchedule.map((fq) => (
            <div
              key={fq.quarter}
              className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold px-2.5 py-1 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-950">
                  {fq.quarter}
                </span>
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                  {fq.period}
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {fq.majorDisbursements.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500 pl-2.5 py-0.5 space-y-0.5">
                    <h4 className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                      {item.schemeName}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">{item.description}</p>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 pt-0.5">
                      <span>{item.amount}</span>
                      <span className="text-stone-400">{item.expectedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Public Notice:</strong> Disbursement timelines are determined by respective Ministries and State Departments. Always maintain active Aadhaar-NPCI bank mapping to avoid transaction rejections.
          </span>
        </div>
      </div>
    </div>
  );
};
