import Link from "next/link";
import { Rows4, Package2, Users, ReceiptText } from "lucide-react";

const linksInventoryPage = [
  { name: "Produtos", href: "/inventory",  icon: <Package2 className="size-4"/>},
  { name: "Histórico de Vendas", href: "/inventory/sales", icon: <ReceiptText className="size-4 "/> },
  { name: "Relatórios", href: "/inventory/reports", icon: <Rows4 className="size-4"/> },
  { name: "Colaboradores", href: "/inventory/collaborators", icon: <Users className="size-4" /> }
];

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full h-[calc(100vh-60px)] bg-[#1a1a1a] overflow-hidden">

      <nav className="top-0 left-0 w-[200px] h-full bg-[#222222] shrink-0 flex flex-col items-center p-4 text-sm">

        {linksInventoryPage.map((link) => (
          <Link 
            key={link.name} 
            href={link.href} 
            className="text-white/80 hover:text-[#6b9dff] py-2 px-2 w-full text-start flex justify-start items-center gap-2"
          >
            {link.icon}
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