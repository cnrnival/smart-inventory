'use client';

import { Package } from "lucide-react";
import Link from "next/link";

export function FakeNavBar() {
    return (
        <div className="sticky top-0 z-50  bg-[#222222] h-[60px] text-white">
            <div className="container mx-auto flex h-full items-center justify-between flex flex-row justify-between items-center text-white">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#6b9dff] flex flex-row justify-between items-center">
                    <Package className="h-6 w-6" />
                    <span>Smart Inventory</span>
                </Link>
            </div>
        </div>
    )
}