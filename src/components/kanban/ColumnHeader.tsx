import { Menu } from 'lucide-react';
import React, { useState } from 'react';

interface ColumnHeaderProps {
    title: string;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ title }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex justify-between items-center p-3 bg-gray-200 rounded-t-lg">
            <h2 className="font-bold text-lg">{title}</h2>
            <div className="relative">
                <button onClick={toggleMenu} className="p-1">
                    <Menu size={20} />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <ul className="py-1">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ColumnHeader;