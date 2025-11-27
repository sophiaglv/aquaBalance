import Image from "next/image";
import "./page.css";

export default function Entrar() {
    return (
        <main className="addPro">
            <div className="addPro-content">
                <nav className="addPro-nav">
                    <Image
                        src="/logo2.png"
                        alt="AquaBalance Logo"
                        width={200}
                        height={250}
                        className="logo"
                    />


                </nav>
                <p>Página não encontrada (Erro 404);</p>
            </div>
        </main>
    );
}