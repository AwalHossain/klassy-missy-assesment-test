'use client';
interface Step {
    id: string;
    name: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

const Stepper: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress" className="mb-8">
            <ol role="list" className="flex justify-around space-y-4 md:space-x-8 md:space-y-0">
                {steps.map((step, index) => (
                    <li key={step.name} className="md:flex-1">
                        {currentStep > index ? (
                            <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                <span className='text-sm font-medium text-sky-600 transition-colors'>
                                    {step.id}
                                </span>
                                <span className='text-xs md:text-sm font-medium'>{step.name}</span>
                            </div>
                        ) : currentStep === index ? (
                            <div
                                className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                aria-current='step'
                            >
                                <span className='text-sm font-medium text-sky-600 transition-colors'>
                                    {step.id}
                                </span>
                                <span className='text-xs md:text-sm font-medium'>{step.name}</span>
                            </div>
                        ) : (
                            <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                <span className='text-sm font-medium text-gray-500 transition-colors'>
                                    {step.id}
                                </span>
                                <span className='text-xs md:text-sm font-medium'>{step.name}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Stepper;