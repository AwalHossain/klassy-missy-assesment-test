import { ChildrenProps } from "@/lib/types"

const CustomerLayout = ({ children }: ChildrenProps) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="font-medium text-[18px] pt-5 pl-[13px]
            ">Build Your Regimen
            </h2>

            <div className="w-full h-[2px] bg-[#EEE] my-2 px-2"></div>
            <div className="pl-[13px]">
                {children}
            </div>
        </div>
    )
}




export default CustomerLayout