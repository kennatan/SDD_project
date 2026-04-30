import React, { useState, useEffect, useRef } from "react";

export default function CSDashboard() {
  const [formData, setFormData] = useState({ cardNumber: "", extension: "", categoryId: "", description: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const cardInputRef = useRef<HTMLInputElement>(null);

  // [UX-2] 智慧記憶 Fallback 邏輯
  useEffect(() => {
    const fetchLastExtension = async () => {
      try {
        // 設定 2 秒超時
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        // 模擬 API 呼叫
        const lastUsed = "9999"; 
        setFormData(prev => ({ ...prev, extension: lastUsed }));
        clearTimeout(timeoutId);
      } catch (err) {
        console.warn("智慧記憶載入失敗，降級為空欄位。");
        // Fallback: 保持空欄位，不影響操作
      }
    };
    fetchLastExtension();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData(prev => ({ ...prev, cardNumber: "", description: "" }));
      cardInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">緊急任務報修</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSuccess && <div className="text-green-500 animate-bounce text-center">✅ 紀錄成功</div>}
        <input 
          ref={cardInputRef}
          name="cardNumber"
          className="w-full border p-3 rounded-lg"
          placeholder="卡號 (6碼)"
          value={formData.cardNumber}
          onChange={e => setFormData({...formData, cardNumber: e.target.value})}
          required
        />
        <input 
          name="extension"
          className="w-full border p-3 rounded-lg"
          placeholder="分機"
          value={formData.extension}
          onChange={e => setFormData({...formData, extension: e.target.value})}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
          提交 (Enter)
        </button>
      </form>
    </div>
  );
}
