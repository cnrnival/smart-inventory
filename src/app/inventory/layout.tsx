"use client";

import { useState } from "react";
import Link from "next/link";
import { Rows4, Package2, Users, ReceiptText, Menu, X } from "lucide-react";

const linksInventoryPage = [
  { name: "Produtos", href: "/inventory",  icon: <Package2 className="size-4"/>},
  { name: "Histórico de Vendas", href: "/inventory/sales", icon: <ReceiptText className="size-4 "/> },
  { name: "Relatórios", href: "/inventory/reports", icon: <Rows4 className="size-4"/> },
  { name: "Colaboradores", href: "/inventory/collaborators", icon: <Users className="size-4" /> }
];

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row w-full h-[calc(100vh-60px)] bg-[#1a1a1a] overflow-hidden relative">

      {isSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/60 z-40 sm:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <nav className={`
        absolute sm:relative z-50
        top-0 left-0 h-full bg-[#222222] shrink-0 flex flex-col p-4 text-sm
        w-[240px] sm:w-[200px]
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}>
        
        <div className="flex justify-between items-center sm:hidden mb-6 pb-2 border-b border-white/10">
          <span className="text-white font-semibold">Menu</span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-white/80 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col gap-1 w-full mt-4 sm:mt-0">
          {linksInventoryPage.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white/80 hover:text-[#6b9dff] hover:bg-white/5 rounded-md py-3 px-3 w-full text-start flex justify-start items-center gap-3 text-sm transition-colors"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1 text-white flex flex-col overflow-hidden min-w-0">
        
        <div className="sm:hidden flex items-center p-4 bg-[#222222] border-b border-[#333333]">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-white/80 hover:text-white mr-4 focus:outline-none"
          >
            <Menu className="size-6" />
          </button>
          <span className="font-semibold text-white/90">Inventário</span>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-0">
          {children}
        </div>
      </div>
      
    </div>
  );
}