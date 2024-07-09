'use client';

import { ChildrenProps } from "@/lib/types";

const CustomerLayout = ({ children }: ChildrenProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bg-white rounded-lg shadow-lg p-4 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Build Your Regimen</h1>

                <div className="w-full h-[2px] bg-[#EEE] my-2"></div>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    )
}




export default CustomerLayout