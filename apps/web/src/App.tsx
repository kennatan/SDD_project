import React, { useState } from 'react';
import CSDashboard from './pages/CSDashboard';
import AdminDashboard from './pages/admin/Dashboard';
import { ClipboardList, LayoutDashboard, LogOut, User, Settings, AlertTriangle, Menu, X } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('queue');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const NavItem = ({ id, label, icon: Icon }: any) => {
    const isActive = activePage === id;
    return (
      <button
        onClick={() => { setActivePage(id); setIsSidebarOpen(false); }}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 w-full ${
          isActive 
            ? 'bg-white text-[#0e7490] shadow-sm font-black' 
            : 'text-slate-500 hover:bg-slate-100/50'
        }`}
      >
        <Icon size={18} />
        <span className="text-sm font-manrope">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-inter">
      
      {/* Smart Banner - Responsive */}
      {showAlert && (
        <div className="bg-[#ff4d4f] text-white px-4 md:px-8 py-2.5 flex items-center justify-between text-xs md:text-sm font-medium z-[100]">
          <div className="flex items-center gap-3 max-w-[90%]">
            <AlertTriangle size={16} className="shrink-0" />
            <p className="truncate">目前 [網路連接異常] 回報頻繁，請引導用戶重啟路由器...</p>
          </div>
          <button onClick={() => setShowAlert(false)}><X size={16} /></button>
        </div>
      )}

      {/* Header - Responsive */}
      <header className="h-16 bg-white/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
            <Menu size={20} />
          </button>
          <h1 className="text-base md:text-lg font-black bg-gradient-to-r from-[#0e7490] to-[#164e63] bg-clip-text text-transparent font-manrope">
            資訊系統客服
          </h1>
        </div>
        
        <div className="flex items-center gap-3 md:gap-5">
           <Settings size={20} className="text-slate-400 cursor-pointer hidden md:block" />
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-100 flex items-center justify-center overflow-hidden">
               <User size={18} className="text-slate-500 mt-1" />
             </div>
             <span className="hidden sm:block text-xs font-bold text-slate-700">Admin</span>
           </div>
        </div>
      </header>

      <div className="flex flex-1 relative max-w-[1920px] mx-auto w-full">
        
        {/* Sidebar - Responsive Overlay for Mobile */}
        <aside className={`
          fixed md:sticky md:top-16 inset-y-0 left-0 z-40 w-64 bg-[#f8fafc] border-r border-slate-200 px-4 py-6 flex flex-col justify-between transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div className="bg-[#2f5869] w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
                <ClipboardList size={16} className="text-white" />
              </div>
              <span className="font-bold text-sm text-slate-800">Service Desk</span>
            </div>
            <nav className="space-y-1">
              <NavItem id="queue" label="Queue" icon={ClipboardList} />
              <NavItem id="reports" label="Reports" icon={LayoutDashboard} />
            </nav>
          </div>
          <button className="flex items-center gap-3 px-4 py-2.5 text-slate-400 text-sm font-medium hover:text-red-500 transition-colors mt-auto border-t border-slate-100 pt-4">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-[2px]" />}

        {/* Main Content Area - Fully Responsive */}
        <main className="flex-1 bg-[#f0f2f5] p-4 md:p-8 lg:p-12 overflow-x-hidden">
           <div className="max-w-5xl mx-auto w-full">
              {activePage === 'queue' ? <CSDashboard /> : <AdminDashboard />}
           </div>
        </main>
      </div>
    </div>
  );
}

export default App;
