import React, { useState, useEffect, useRef } from "react";

export default function CSDashboard() {
  const [formData, setFormData] = useState({ cardNumber: "", extension: "", categoryId: "", description: "" });
  const [errors, setErrors] = useState({ cardNumber: "", extension: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const cardInputRef = useRef<HTMLInputElement>(null);

  // T019: 智慧記憶邏輯 (Database-based) - 模擬獲取上次成功分機
  useEffect(() => {
    const fetchLastExtension = async () => {
      // 未來對接 API: GET /api/v1/auth/me
      const mockLastUsed = "9999"; 
      setFormData(prev => ({ ...prev, extension: mockLastUsed }));
    };
    fetchLastExtension();
  }, []);

  const validate = (name: string, value: string) => {
    if (name === "cardNumber") {
      return /^\d{1,6}$/.test(value) ? "" : "卡號必須為 1-6 碼數字";
    }
    if (name === "extension") {
      return /^\d{1,10}$/.test(value) ? "" : "分機必須為 1-10 碼數字";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.cardNumber || errors.extension) return;

    // 模擬 API 提交
    setIsSuccess(true);
    
    // T020: 0.5s 動畫與自動聚焦
    setTimeout(() => {
      setIsSuccess(false);
      setFormData(prev => ({ ...prev, cardNumber: "", description: "" }));
      cardInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg text-white">📋</div>
          <h1 className="text-2xl font-bold text-gray-800">緊急任務報修</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`transition-all duration-300 ${isSuccess ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">卡號 (EXTENSION)</label>
              <input 
                ref={cardInputRef}
                name="cardNumber"
                type="text" 
                className={`w-full border-2 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.cardNumber ? 'border-red-400' : 'border-gray-100'}`}
                placeholder="請輸入 6 碼卡號"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">分機 (PHONE)</label>
              <input 
                name="extension"
                type="text" 
                className={`w-full border-2 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition ${errors.extension ? 'border-red-400' : 'border-gray-100'}`}
                placeholder="請輸入分機"
                value={formData.extension}
                onChange={handleChange}
                required
              />
              {errors.extension && <p className="text-red-500 text-xs mt-1">{errors.extension}</p>}
            </div>

            <button 
              type="submit" 
              className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              確認提交 (Enter) ⏎
            </button>
          </div>

          {isSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl animate-in fade-in zoom-in duration-300">
              <div className="text-center">
                <div className="text-5xl mb-2 text-green-500">✅</div>
                <p className="font-bold text-green-600">紀錄成功</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
