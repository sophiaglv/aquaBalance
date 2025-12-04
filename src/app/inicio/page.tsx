'use client';

import Image from "next/image";
import "./page.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="home">
      <div>
        <Image
          src="/logo.png"
          alt="AquaBalance Logo"
          width={200}
          height={200}
          className="logo"
        />
      </div>
      <div className="home-content">
        <h1>Seja bem-vindo!</h1>

        <div className="home-buttons">
          <a className="button" href="/login">Entrar</a>
          <a className="button" href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </main>
  );
}
