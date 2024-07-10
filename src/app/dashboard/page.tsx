'use client'
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Button } from '@/components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import lottie from "../../../public/images/speed.json";

export default function DashboardPage() {
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const clearStorage = () => {
        localStorage.clear();
        window.location.replace('/customer');
        setShowContent(false);
    };


    return (
        <div className="">
            {!showContent ? (
                <div className='w-full mx-auto'>
                    <Player
                        autoplay
                        loop
                        src={lottie}
                        style={{ height: '150px', width: '300px' }}
                        speed={2.5}
                    >
                    </Player>
                    <div className="mb-6">
                        <div className="w-full">
                            <h1 className="text-[20px] font-semibold text-center mx-auto">Analyzing Your Concern</h1>
                        </div>
                        {/* <h2 className="text-[15px] font-semibold text-center">Thank you for sharing your concerns!</h2> */}
                        <p className="text-center text-[10px]">
                            We are analyzing your concerns and will get back to you with the best solution.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-center mt-2">
                        <Button className='bg-red-400 mx-auto' onClick={clearStorage}>Clear State</Button>
                    </div>
                    <KanbanBoard />
                </>
            )}
        </div>
    )
}
