"use client";
import '../app/globals.css';
import Link from "next/link";
import { useState } from "react";

export default function Nagvar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-white font-bold text-xl">MiApp</span>
                    </div>
                    
                    {/* Botón menú móvil */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    
                    {/* Links desktop */}
                    <div className="hidden md:flex space-x-4">
                        <Link href="/" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                            Inicio
                        </Link>
                        <Link href="/verusers" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                            Usuarios
                        </Link>
                        <Link href="/agregarusers" className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium">
                            Películas
                        </Link>
                    </div>
                </div>
                
                {/* Menú móvil */}
                {isOpen && (
                    <div className="md:hidden pb-3">
                        <Link href="/" className="block text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                            Inicio
                        </Link>
                        <Link href="/verusers" className="block text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                            Usuarios
                        </Link>
                        <Link href="/agregarusers" className="block text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-base font-medium">
                            Películas
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}