'use client';

import { Package, Menu } from "lucide-react";
import Link from "next/link";

type Props = {
    isWelcomePage?: boolean;
}

export function FakeNavBar({ isWelcomePage }: Props) {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[#222222] text-white h-[60px] flex items-center shadow-md shadow-black/20 transition-all">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                
                {/* Lado Esquerdo: Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#6b9dff] hover:opacity-80 transition-opacity">
                    <Package className="h-6 w-6" />
                    <span>Smart Inventory</span>
                </Link>

                {/* Centro: Links de Navegação das Seções */}
                {isWelcomePage && (
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#problema" className="text-sm font-medium text-white/70 hover:text-[#6b9dff] transition-colors">
                            O Problema
                        </Link>
                        <Link href="#funcionalidades" className="text-sm font-medium text-white/70 hover:text-[#6b9dff] transition-colors">
                            Funcionalidades
                        </Link>
                        <Link href="#tecnologias" className="text-sm font-medium text-white/70 hover:text-[#6b9dff] transition-colors">
                            Tecnologias
                        </Link>
                    </div>
                )}

                {/* Lado Direito: Acesso */}
                <div className="flex items-center gap-6">
                    {isWelcomePage && (
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/login" className="text-sm font-medium text-white/80 hover:text-[#6b9dff] transition-colors">
                                Entrar
                            </Link>
                            <Link href="/cadastro" className="text-sm font-medium text-white/80 hover:text-[#6b9dff] transition-colors">
                                Criar Conta
                            </Link>
                        </div>
                    )}

                    {/* Ícone de Menu Mobile */}
                    {isWelcomePage && (
                        <button className="md:hidden p-2 text-white/70 hover:bg-white/10 rounded-lg transition-colors -mr-2">
                            <Menu className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}