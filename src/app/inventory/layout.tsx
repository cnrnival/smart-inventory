import Link from "next/link";
import { Package } from "lucide-react";

const linksInventoryPage = [
  { name: "Produtos", href: "/inventory" },
  { name: "Histórico de Vendas", href: "/inventory/historic-sales" },
  { name: "Relatórios", href: "/inventory/reports" },
  { name: "Fornecedores", href: "/inventory/suppliers" }
];

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-row bg-[#1a1a1a] overflow-hidden">

      <nav className="top-0 left-0 w-[150px] h-full bg-[#222222] shrink-0 flex flex-col items-center p-4">

        <Link href="/" className="flex items-center gap-2 text-md font-bold text-[#6b9dff]  h-[55px] border-b border-[#6b9dff] mb-4">
          <Package className="h-6 w-6" />
          Smart Inventory
        </Link>

        {linksInventoryPage.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-white hover:text-purple-300 py-2 px-4 w-full text-center"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Área onde as páginas específicas (Produtos, Categorias, etc) vão aparecer */}
      <div className="flex-1 text-white flex flex-col overflow-hidden min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}