import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export function VisitorCounter() {
  const [visitors, setVisitors] = useState({ today: 0, total: 0 });

  useEffect(() => {
    // In a real app, this fetches from an API. We'll mock it.
    const savedTotal = localStorage.getItem('desa_visitor_total');
    let total = savedTotal ? parseInt(savedTotal) : 12450;
    
    // Increment on load (simplified logic)
    if (!sessionStorage.getItem('desa_visited_session')) {
      total += 1;
      localStorage.setItem('desa_visitor_total', total.toString());
      sessionStorage.setItem('desa_visited_session', 'true');
    }

    setVisitors({
      today: Math.floor(Math.random() * 50) + 10, // Mock today's visitors
      total: total
    });
  }, []);

  return (
    <div className="bg-white/5 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200/20">
      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
        <Users className="w-5 h-5" /> Statistik Pengunjung
      </h4>
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between border-b border-gray-700 pb-1">
          <span>Hari ini:</span>
          <span className="font-bold text-white">{visitors.today}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Pengunjung:</span>
          <span className="font-bold text-white">{visitors.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
