'use client';

import { Package, User } from "lucide-react";
import Link from "next/link";

type Props = {
    isWelcomePage?: boolean;
}

export function FakeNavBar({ isWelcomePage }: Props) {
    return (
        <div className="sticky top-0 z-50  bg-[#222222] h-[60px] text-white">
            <div className="w-full flex h-full items-center justify-between flex flex-row justify-between items-center text-white px-4">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#6b9dff] flex flex-row justify-between items-center">
                    <Package className="h-6 w-6" />
                    <span>Smart Inventory</span>
                </Link>
                {isWelcomePage &&
                    <Link
                    href={'/login'}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    bg-primary text-white
                    text-white hover:bg-primary/90">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Entrar</span>
                    </Link>}
            </div>
        </div>
    )
}