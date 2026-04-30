import React, { useState, useEffect } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCat, setNewCat] = useState({ name: "", threshold: 0 });

  useEffect(() => {
    // 實務將串接 GET /api/v1/categories
    setCategories([
      { id: "1", name: "網路異常", alertThreshold: 10, status: "ACTIVE" },
      { id: "2", name: "硬體損壞", alertThreshold: 5, status: "ACTIVE" }
    ]);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 p-2 rounded-lg text-white">🛠️</div>
        <h1 className="text-2xl font-bold text-gray-800">報修分類管理 (後台)</h1>
      </div>

      {/* 新增分類區 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">分類名稱</label>
          <input 
            type="text" 
            className="w-full border-2 border-gray-50 p-2 rounded-lg"
            placeholder="例如：系統當機"
            value={newCat.name}
            onChange={e => setNewCat({...newCat, name: e.target.value})}
          />
        </div>
        <div className="w-32">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">預警閾值 (1H)</label>
          <input 
            type="number" 
            className="w-full border-2 border-gray-50 p-2 rounded-lg"
            value={newCat.threshold}
            onChange={e => setNewCat({...newCat, threshold: parseInt(e.target.value)})}
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition">
          新增分類
        </button>
      </div>

      {/* 分類列表 */}
      <div className="space-y-3">
        {categories.map(c => (
          <div key={c.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-bold text-gray-700">{c.name}</p>
              <p className="text-xs text-gray-400">閾值：{c.alertThreshold} 筆/小時</p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">啟動中</span>
              <button className="text-red-400 hover:text-red-600 text-sm font-bold">停用</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
