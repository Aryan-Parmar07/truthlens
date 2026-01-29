import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScanFace, ShieldCheck, FileCheck } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { icon: ScanFace, label: "Verify Media", path: "/" },
    { icon: FileCheck, label: "Latest Report", path: "/results/demo-id" }, 
    { icon: ShieldCheck, label: "Compliance", path: "/privacy" },
  ];

  return (
    <div className="w-64 border-r border-white/5 bg-[#050505] flex flex-col h-screen fixed left-0 top-0 z-20">
      {/* HEADER - CLEAN LOGO ONLY */}
      <div className="p-6">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <div className="w-4 h-4 bg-black rounded-sm" />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">Proof.</span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 space-y-0.5">
        <div className="px-3 mb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Platform</div>
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? "bg-white text-black shadow-lg shadow-white/5" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              <item.icon size={16} className={isActive ? "text-black" : "text-zinc-500 group-hover:text-zinc-300"} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      {/* REMOVED: Global Feed & User Profile */}
    </div>
  );
};

export default Sidebar;