import React, { useState, useRef, useEffect } from "react";
import { ClipboardList, CornerDownLeft, Clock, Search } from 'lucide-react';

export default function CSDashboard() {
  const [formData, setFormData] = useState({ extension: "", location: "", categoryId: "", description: "", handling: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const cardInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('http://localhost:3005/categories').then(res => res.json()).then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3005/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setFormData(prev => ({ ...prev, location: "", description: "", handling: "" }));
          setIsSubmitting(false);
        }, 800);
      }
    } catch (err) { setIsSubmitting(false); }
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[10px] md:text-[11px] font-black tracking-widest text-[#41484b] uppercase mb-2 block">{children}</label>
  );

  return (
    <div className="w-full flex justify-center py-2 md:py-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-5 md:p-10 flex flex-col gap-8 transition-all">
        <div className="flex items-center gap-3">
          <ClipboardList size={22} className="text-[#2f5869]" />
          <h2 className="text-xl md:text-2xl font-black text-[#2f5869] font-manrope">快速報修錄入</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <Label>分機 (EXTENSION)</Label>
              <input ref={cardInputRef} type="text" className="h-12 bg-slate-50 rounded-xl px-4 text-sm focus:bg-white focus:ring-2 focus:ring-[#2f5869]/10 outline-none transition-all" placeholder="e.g. 8802" value={formData.extension} onChange={e => setFormData({...formData, extension: e.target.value})} required />
            </div>
            <div className="flex flex-col">
              <Label>位置 (LOCATION)</Label>
              <div className="relative h-12">
                <input type="text" className="w-full h-full bg-slate-50 rounded-xl pl-4 pr-12 text-sm focus:bg-white focus:ring-2 focus:ring-[#2f5869]/10 outline-none transition-all" placeholder="輸入地點..." value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                <Clock size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Label>議題分類 (ISSUE CATEGORY)</Label>
            <div className="relative h-12">
              <select className="w-full h-full bg-slate-50 rounded-xl px-4 text-sm appearance-none outline-none focus:bg-white focus:ring-2 focus:ring-[#2f5869]/10 transition-all" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} required>
                <option value="">請選擇分類...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <Label>事件內容 (EVENT CONTENT)</Label>
            <textarea className="h-28 bg-slate-50 rounded-xl p-4 text-sm resize-none outline-none focus:bg-white focus:ring-2 focus:ring-[#2f5869]/10 transition-all" placeholder="描述問題細節..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>

          <div className="flex flex-col">
            <Label>處理方式 (HANDLING)</Label>
            <input type="text" className="h-12 bg-slate-50 rounded-xl px-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#2f5869]/10 transition-all" placeholder="選填：若已處理請紀錄..." value={formData.handling} onChange={e => setFormData({...formData, handling: e.target.value})} />
          </div>

          <button type="submit" disabled={isSubmitting} className={`h-14 w-full rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg text-white font-black tracking-widest ${isSuccess ? 'bg-green-500 scale-95' : 'bg-[#2f5869] hover:brightness-110 active:scale-[0.98]'}`}>
            {isSubmitting ? '正在提交...' : isSuccess ? '✅ 儲存成功' : 'Enter 鍵儲存'}
            {!isSubmitting && !isSuccess && <CornerDownLeft size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
