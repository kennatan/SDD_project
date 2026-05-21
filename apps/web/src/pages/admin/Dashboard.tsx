import React, { useEffect, useState } from 'react';
import { Search, ArrowUpRight, Download, PieChart, BarChart3, Plus, Trash2, Tag, Loader2 } from 'lucide-react';

const TrendBar = ({ item, max }: { item: any, max: number }) => {
  const totalPercentage = max > 0 ? (item.total / max) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
      <div className="relative w-full flex-1 flex flex-col justify-end items-center">
        <div 
          className="w-[16px] md:w-[28px] rounded-t-[4px] overflow-hidden flex flex-col-reverse shadow-sm transition-all duration-1000 ease-out"
          style={{ height: `${Math.max(totalPercentage, 2)}%` }}
        >
          {item.details?.map((detail: any, idx: number) => (
            <div key={idx} className="w-full transition-all" style={{ height: `${(detail.count / item.total) * 100}%`, backgroundColor: detail.color }} />
          ))}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-xl">
             <div className="font-black border-b border-white/20 pb-0.5 mb-0.5 text-center">{item.total} 件</div>
             {item.details?.map((d: any, i: number) => (
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
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. 統一數據獲取
  const refreshAll = async () => {
    try {
      const [statsRes, recordsRes, catsRes] = await Promise.all([
        fetch('http://localhost:3005/stats'),
        fetch('http://localhost:3005/records'),
        fetch('http://localhost:3005/categories')
      ]);
      setData(await statsRes.json());
      setRecords(await recordsRes.json());
      setCategories(await catsRes.json());
    } catch (err) {
      console.error("Refresh Failed", err);
    }
  };

  useEffect(() => { refreshAll(); }, []);

  // 2. 搜尋過濾
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`http://localhost:3005/records?q=${searchQuery}`)
        .then(res => res.json())
        .then(json => setRecords(json));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 3. 新增分類
  const handleAddCategory = async () => {
    if (!newCatName.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3005/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim() })
      });
      if (res.ok) {
        setNewCatName('');
        await refreshAll();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 4. 刪除分類
  const handleDeleteCategory = async (id: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3005/categories/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await refreshAll();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => { window.location.href = 'http://localhost:3005/stats/export'; };

  if (!data) return <div className="p-12 text-slate-400 text-center animate-pulse">數據同步中...</div>;

  const maxTrend = Math.max(...(data.trends?.map((t: any) => t.total) || [10]));

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl animate-in fade-in duration-700">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. 堆疊長條圖 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col gap-6 h-[380px]">
          <div className="flex items-center gap-3">
             <BarChart3 size={20} className="text-[#2f5869]" />
             <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">量能時段分佈</h3>
          </div>
          <div className="flex items-end gap-3 md:gap-6 h-full pb-2 px-2 border-b border-slate-50">
            {data.trends?.map((t: any, i: number) => (
              <TrendBar key={i} item={t} max={maxTrend} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* 2. 佔比圖 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex items-center justify-around h-[180px]">
             <div className="relative w-[110px] h-[110px]">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="55" cy="55" r="48" stroke="#f8fafc" strokeWidth="12" fill="transparent" />
                  {data.breakdown?.length > 0 && (
                    <circle cx="55" cy="55" r="48" stroke="#2f5869" strokeWidth="12" fill="transparent" strokeDasharray="301.6" strokeDashoffset={301.6 * (1 - (data.breakdown[0].percentage / 100))} strokeLinecap="round" />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-xl font-black text-[#2f5869]">{data.totalCount}</span>
                   <span className="text-[8px] font-bold text-slate-400">TOTAL</span>
                </div>
             </div>
             <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto pr-4">
                {data.breakdown?.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-bold text-slate-700">{item.label} ({item.percentage}%)</span>
                  </div>
                ))}
             </div>
          </div>

          {/* 3. 類別管理 */}
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col gap-4 h-[172px]">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Tag size={16} className="text-[#2f5869]" />
                   <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">報修類別管理</h3>
                </div>
                <div className="flex items-center gap-2">
                   <input 
                    type="text" 
                    className="bg-slate-50 border-none h-8 rounded-lg px-3 text-[11px] w-[140px] focus:ring-2 focus:ring-[#2f5869]/20" 
                    placeholder="輸入新類別..." 
                    value={newCatName} 
                    onChange={e => setNewCatName(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddCategory()}
                   />
                   <button 
                    onClick={handleAddCategory} 
                    disabled={isLoading}
                    className="bg-[#2f5869] text-white p-1.5 rounded-lg hover:brightness-110 disabled:opacity-50"
                   >
                     {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                   </button>
                </div>
             </div>
             <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar">
                {categories.map((cat: any) => (
                   <div key={cat.id} className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 group hover:bg-slate-100 transition-all cursor-default">
                      <span className="text-[11px] font-bold text-slate-600">{cat.name}</span>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)} 
                        className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* 4. 數據表格 */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-base font-black text-slate-800 tracking-widest">歷史報修進件總表</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-[300px]">
              <input type="text" className="w-full bg-slate-50 h-10 rounded-xl pl-11 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-[#2f5869]/5 transition-all shadow-inner" placeholder="搜尋內容..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 px-6 py-2.5 bg-[#2f5869] text-white rounded-xl text-xs font-black hover:shadow-lg transition-all active:scale-95 shadow-md">
              <Download size={16} /> 匯出 CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] h-14">
                <th className="px-8">時間</th><th className="px-8">分機</th><th className="px-8">位置</th><th className="px-8">分類</th><th className="px-8">報修內容</th><th className="px-8">處理方式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {records.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6 text-xs text-slate-400 font-bold">{new Date(row.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-8 text-sm font-black text-[#2f5869]">{row.extension}</td>
                  <td className="px-8 text-sm font-bold text-slate-700">{row.location}</td>
                  <td className="px-8"><span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-lg">{row.category?.name}</span></td>
                  <td className="px-8 text-sm text-slate-500 max-w-[250px] truncate" title={row.problemDescription}>{row.problemDescription}</td>
                  <td className="px-8 text-sm text-slate-600 font-medium">{row.handling || '---'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
