"use client";
import "./Header.css"
import Image from "next/image";

export function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-title">
                    <h1>TERRA Tech</h1>
                </div>
                <nav className="header-nav">
                    <ul className="header-menu">

                        <li>
                            <a href="#inicio">Início</a>
                        </li>

                        <li>
                            <a href="#app">App</a>
                        </li>

                        <li>
                            <a href="#contatos">Contatos</a>
                        </li>
                    </ul>

                    <div className="header-logo">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                    </div>
                </nav>
            </div>

        </header>
    );
}