import React, { useState, useEffect } from "react";

export default function CSDashboard() {
  const [formData, setFormData] = useState({ cardNumber: "", extension: "", categoryId: "", description: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  // T019: 智慧記憶邏輯 (此處模擬從資料庫載入)
  useEffect(() => {
    // 假設透過 API 獲取 User.lastUsedExtension
    const lastExt = ""; // Mock data
    if (lastExt) setFormData(prev => ({ ...prev, extension: lastExt }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 實作 API 呼叫...
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ ...formData, cardNumber: "", description: "" }); // 保留分機
    }, 500);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">緊急任務報修</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSuccess && <div className="text-green-500 animate-bounce">✅ 提交成功！</div>}
        <div>
          <label className="block text-sm font-medium">卡號 (6碼)</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded" 
            value={formData.cardNumber}
            onChange={e => setFormData({...formData, cardNumber: e.target.value})}
            required
            autoFocus 
          />
        </div>
        <div>
          <label className="block text-sm font-medium">分機 (10碼)</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded" 
            value={formData.extension}
            onChange={e => setFormData({...formData, extension: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          提交報修 (Enter)
        </button>
      </form>
    </div>
  );
}
