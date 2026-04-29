import React, { useState, useEffect } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // 模擬獲取分類
    setCategories([{ id: "1", name: "網路異常", status: "ACTIVE" }]);
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">分類管理 (Supervisor Only)</h1>
      <div className="flex gap-2 mb-8">
        <input 
          type="text" 
          placeholder="新分類名稱" 
          className="border p-2 rounded flex-1"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">新增</button>
      </div>
      <ul className="space-y-2">
        {categories.map((c: any) => (
          <li key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded shadow-sm">
            <span>{c.name}</span>
            <button className="text-red-500 hover:text-red-700">停用</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
