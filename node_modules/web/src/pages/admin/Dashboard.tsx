import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // 實務將串接 GET /api/v1/stats/dashboard
    setStats({
      categories: [{ name: "網路", value: 45 }, { name: "硬體", value: 30 }],
      spikes: [{ name: "網路異常", count: 12, threshold: 10 }]
    });
  }, []);

  const handleExport = () => {
    window.location.href = "http://localhost:3005/api/v1/stats/export";
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">稽核戰情室</h1>
          <p className="text-slate-400 text-sm mt-1">即時監控緊急任務報修動態</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition active:scale-95 flex items-center gap-2"
        >
          <span>📥</span> 匯出完整報表 (.CSV)
        </button>
      </div>

      {/* 量能激增警示 */}
      {stats?.spikes?.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-100 p-5 rounded-2xl mb-10 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="text-3xl">🚨</div>
            <div>
              <p className="text-rose-900 font-black">量能激增預警</p>
              <p className="text-rose-700 text-sm">
                目前「{stats.spikes[0].name}」回報頻繁 ({stats.spikes[0].count} 筆/H)，已超過設定閾值 {stats.spikes[0].threshold} 筆。
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-50 min-h-[400px]">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            報修趨勢統計 (24H)
          </h3>
          <div className="h-64 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 italic">
            Trend Chart Placeholder (Chart.js)
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-50">
          <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
            問題類別分佈
          </h3>
          <div className="h-64 bg-slate-50 rounded-full w-64 mx-auto flex items-center justify-center text-slate-300 italic border-8 border-white shadow-inner">
            Pie Chart
          </div>
        </div>
      </div>
    </div>
  );
}
