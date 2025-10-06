// src/components/Navigation.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Bell } from 'lucide-react';

const Navigation = () => {
    const [isCareerOpen, setIsCareerOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCareerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsCareerOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Logo - Left Edge */}
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                        <span className="text-white font-bold text-lg">NS</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 hidden sm:block">Next Step</span>
                </Link>

                {/* Center Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                    {/* Career Dropdown */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setIsCareerOpen(!isCareerOpen)}
                            className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isCareerOpen || location.pathname.includes('/career') || location.pathname.includes('/internship') || location.pathname.includes('/course') || location.pathname.includes('/club')
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            <span>Explore</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    isCareerOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>

                        {/* Dropdown */}
                        <div className={`absolute top-full left-0 mt-2 w-56 transition-all duration-200 ${
                            isCareerOpen
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-2 pointer-events-none'
                        }`}>
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-2">
                                    <DropdownLink to="/careers" icon="💼" onClick={() => setIsCareerOpen(false)}>
                                        Career Paths
                                    </DropdownLink>
                                    <DropdownLink to="/internships" icon="🎯" onClick={() => setIsCareerOpen(false)}>
                                        Internships
                                    </DropdownLink>
                                    <DropdownLink to="/courses" icon="📚" onClick={() => setIsCareerOpen(false)}>
                                        Courses
                                    </DropdownLink>
                                    <DropdownLink to="/clubs" icon="👥" onClick={() => setIsCareerOpen(false)}>
                                        Clubs
                                    </DropdownLink>
                                </div>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/feed">Feed</NavLink>
                    <NavLink to="/journal">AI Journal</NavLink>
                </nav>

                {/* Right Actions - Right Edge */}
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full"></span>
                    </button>

                    <Link
                        to="/profile"
                        className="ml-1 relative group"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 p-0.5 transition-transform group-hover:scale-105">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-700">AJ</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
        >
            {children}
        </Link>
    );
};

const DropdownLink = ({ to, icon, children, onClick }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
            <span className="text-lg">{icon}</span>
            <span className="font-medium">{children}</span>
        </Link>
    );
};

export default Navigation;