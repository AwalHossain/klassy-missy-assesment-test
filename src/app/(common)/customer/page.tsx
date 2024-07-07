"use client"

import SkinRegimenForm from "@/components/CustomerUI/SkinRegimenForm";
import { Button } from "@/components/ui/button";

export default function CustomerPage() {
    return (
        <div>
            <div className="mb-[27px]">
                <Button className="w-[131px] h-[25px] bg-black py-1 px-[13px] rounded-[3px]">Login to Klassy</Button>
                <p className="text-[#f90] text-[10px] pt-[9px]">* Login to sync your profile details for more easy step.</p>
            </div>
            <SkinRegimenForm />
        </div>
    )
}
