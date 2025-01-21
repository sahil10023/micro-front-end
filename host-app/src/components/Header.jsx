import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-2 hover:cursor-pointer" onClick={() => navigate("/")}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/022/298/294/non_2x/molecule-structure-abstract-tech-background-medical-design-science-template-wallpaper-or-banner-illustration-vector.jpg"
                        alt="Company Logo"
                        className="h-8 w-8 object-cover rounded-md"
                    />
                    <span className="text-xl font-bold text-gray-800">Micro-frontend</span>
                </div>
                <div className="border-8 rounded-full">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                        alt="User Icon"
                        className="h-8 w-8 object-cover"
                    />
                </div>
            </div>
        </header >
    );
}

export default Header;
