import React, { useEffect, useState } from 'react';
import { Search, ArrowUpRight, Download, PieChart, BarChart3 } from 'lucide-react';

const TrendBar = ({ item, max }: { item: any, max: number }) => {
  const totalPercentage = max > 0 ? (item.total / max) * 100 : 0;
  
  return (
    <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
      <div className="relative w-full flex-1 flex flex-col justify-end items-center">
        <div 
          className="w-[16px] md:w-[28px] rounded-t-[4px] overflow-hidden flex flex-col-reverse shadow-sm transition-all duration-1000 ease-out"
          style={{ height: `${Math.max(totalPercentage, 2)}%` }}
        >
          {item.details.map((detail: any, idx: number) => (
            <div 
              key={idx}
              className="w-full transition-all"
              style={{ 
                height: `${(detail.count / item.total) * 100}%`,
                backgroundColor: detail.color 
              }}
            />
          ))}
          
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-xl">
             <div className="font-black border-b border-white/20 pb-0.5 mb-0.5 text-center">{item.total} 件</div>
             {item.details.map((d: any, i: number) => (
               <div key={i} className="flex items-center gap-1.5 opacity-90">
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                 <span>{d.count} 件</span>
               </div>
             ))}
          </div>
        </div>
      </div>
      <span className="text-[9px] text-slate-400 font-black mt-1 uppercase tracking-tighter">{item.hour}</span>
    </div>
  );
};

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3005/stats', { headers: { 'x-user-role': 'SUPERVISOR' } })
      .then(res => res.json()).then(json => setData(json));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://localhost:3005/records?q=${searchQuery}`)
        .then(res => res.json()).then(json => setRecords(json));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleExport = () => {
    window.location.href = 'http://localhost:3005/stats/export';
  };

  if (!data) return <div className="p-12 text-slate-400 text-center font-manrope animate-pulse uppercase tracking-widest">量能數據對位中...</div>;

  const maxTrend = Math.max(...(data.trends?.map((t: any) => t.total) || [10]));

  return (
    <div className="flex flex-col gap-10 w-full max-w-6xl animate-in fade-in duration-700">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 堆疊長條圖 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-8 h-[380px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-xl">
                <BarChart3 size={20} className="text-[#2f5869]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">量能時段分佈</h3>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">BY CATEGORY BREAKDOWN</p>
              </div>
            </div>
            <div className="text-[9px] font-black px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 tracking-widest">LIVE</div>
          </div>
          <div className="flex items-end gap-3 md:gap-6 h-full pb-2 px-2 border-b border-slate-50">
            {data.trends?.map((t: any, i: number) => (
              <TrendBar key={i} item={t} max={maxTrend} />
            ))}
          </div>
        </div>

        {/* 圓餅圖 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-8 h-[380px]">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-50 rounded-xl">
                <PieChart size={20} className="text-[#2f5869]" />
             </div>
             <div className="flex flex-col">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">總體類別佔比</h3>
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">REPAIR CATEGORIES</p>
             </div>
          </div>
          <div className="flex items-center justify-around h-full">
             <div className="relative w-[160px] h-[160px]">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="68" stroke="#f8fafc" strokeWidth="18" fill="transparent" />
                  {data.breakdown?.length > 0 && (
                    <circle 
                      cx="80" cy="80" r="68" stroke="#2f5869" strokeWidth="18" fill="transparent" 
                      strokeDasharray="427" 
                      strokeDashoffset={427 * (1 - (data.breakdown[0].percentage / 100))} 
                      strokeLinecap="round"
                    />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-black text-[#2f5869] leading-none">{data.totalCount}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-tighter">總件數</span>
                </div>
             </div>
             <div className="flex flex-col gap-4">
                {data.breakdown?.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-3.5 h-3.5 rounded-md shadow-sm" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] font-black text-slate-700 tracking-tight">{item.label}</span>
                      <span className="text-[11px] font-bold text-slate-400">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 數據表格 */}
      <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="px-8 py-7 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-base font-black text-slate-800 uppercase tracking-widest">歷史報修進件總表</h3>
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="relative flex-1 md:w-[350px]">
              <input 
                type="text" 
                className="w-full bg-slate-50 h-11 rounded-2xl pl-12 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-[#2f5869]/5 transition-all shadow-inner"
                placeholder="搜尋分機、地點、問題詳細內容..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2.5 px-7 py-3 bg-[#2f5869] text-white rounded-2xl text-xs font-black hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 shadow-lg"
            >
              <Download size={18} /> 匯出 CSV 報表
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[2px] h-16">
                <th className="px-8 whitespace-nowrap">報修時間</th>
                <th className="px-8 whitespace-nowrap">分機</th>
                <th className="px-8 whitespace-nowrap">發生位置</th>
                <th className="px-8 whitespace-nowrap">問題分類</th>
                <th className="px-8">報修內容</th>
                <th className="px-8 whitespace-nowrap">處理方式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {records.length > 0 ? records.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-7 text-xs text-slate-400 font-bold">
                    {new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-8 text-sm font-black text-[#2f5869] tracking-widest">{row.extension}</td>
                  <td className="px-8 text-sm font-bold text-slate-700">{row.location}</td>
                  <td className="px-8">
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-200/50 uppercase tracking-tighter">
                      {row.category?.name}
                    </span>
                  </td>
                  <td className="px-8 text-sm text-slate-500 max-w-[300px] leading-relaxed font-medium">
                     {row.problemDescription}
                  </td>
                  <td className="px-8 text-sm text-slate-600 font-medium">
                     {row.handling || '---'}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-28 text-center text-slate-300 font-black uppercase tracking-widest animate-pulse">尚無符合搜尋條件的紀錄</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
