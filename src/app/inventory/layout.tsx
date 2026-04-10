import Link from "next/link";
import { Package } from "lucide-react";

const linksInventoryPage = [
  { name: "Produtos", href: "/inventory" },
  { name: "Histórico de Vendas", href: "/inventory/historic-sales" },
  { name: "Relatórios", href: "/inventory/reports" },
  { name: "Fornecedores", href: "/inventory/suppliers" },
  { name: "Usuários do Sistema", href: "/inventory/system-users" }
];

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full h-[calc(100vh-60px)] bg-[#1a1a1a] overflow-hidden">

      <nav className="top-0 left-0 w-[200px] h-full bg-[#222222] shrink-0 flex flex-col items-center p-4">

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