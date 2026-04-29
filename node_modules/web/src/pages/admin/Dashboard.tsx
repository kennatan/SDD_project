import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">主管稽核儀表板</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">
          匯出 CSV 報表
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 圖表佔位 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-400">報修趨勢圖 (Chart.js)</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
          <p className="text-gray-400">議題佔比圖 (Pie Chart)</p>
        </div>
      </div>

      {/* 異常警示區域 */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">⚠️</div>
          <div className="ml-3">
            <p className="text-sm text-red-700 font-bold">量能激增警示</p>
            <p className="text-xs text-red-600">目前「網路異常」類別在一小時內超過設定閾值，請關注。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
