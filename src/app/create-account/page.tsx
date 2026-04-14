'use client';

import { FakeNavBar } from "@/components/FakeNavBar";
import { UserForm } from "@/components/userform";


export default function CreateAccountPage() {
  return (
     <div className="min-h-screen bg-background text-black bg-[#E8E9E8]">
        <FakeNavBar />
        <UserForm  isAdmin={true} isInInventoryPage={false} />
     </div>
  )
}