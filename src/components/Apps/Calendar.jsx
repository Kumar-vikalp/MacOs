import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

const Calendar = ({ windowId }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendar_events');
    return saved ? JSON.parse(saved) : [
      {
        id: 'event-1',
        title: 'Team Standup',
        date: new Date().toISOString(),
        time: '09:00',
        createdAt: new Date().toISOString()
      },
      {
        id: 'event-2',
        title: 'Project Review Meeting',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        time: '14:00',
        createdAt: new Date().toISOString()
      },
      {
        id: 'event-3',
        title: 'Client Presentation',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:30',
        createdAt: new Date().toISOString()
      },
      {
        id: 'event-4',
        title: 'Code Review Session',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '15:30',
        createdAt: new Date().toISOString()
      },
      {
        id: 'event-5',
        title: 'Sprint Planning',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        time: '11:00',
        createdAt: new Date().toISOString()
      },
      {
        id: 'event-6',
        title: 'Lunch with Sarah',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        time: '12:30',
        createdAt: new Date().toISOString()
      }
    ];
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', time: '12:00' });

  useEffect(() => {
    localStorage.setItem('calendar_events', JSON.stringify(events));
  }, [events]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the calendar to start on Sunday
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getEventsForDate = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.date), date)
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return;

    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate.toISOString(),
      time: newEvent.time,
      createdAt: new Date().toISOString()
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({ title: '', time: '12:00' });
    setShowEventModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        {/* Week Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 h-full">
          {allDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentMonth = isSameMonth(date, currentDate);
            const isToday = isSameDay(date, new Date());

            return (
              <motion.div
                key={index}
                className={`p-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !isCurrentMonth ? 'text-gray-300' : ''
                } ${isToday ? 'bg-blue-50 border-blue-200' : ''}`}
                onClick={() => handleDateClick(date)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                  {format(date, 'd')}
                </div>
                
                {/* Events */}
                <div className="mt-1 space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Existing Events */}
              {selectedDate && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Events</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {getEventsForDate(selectedDate).map(event => (
                      <div key={event.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs text-gray-500">{event.time}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1 hover:bg-gray-200 rounded text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Event */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Add Event</h4>
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    disabled={!newEvent.title.trim()}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;