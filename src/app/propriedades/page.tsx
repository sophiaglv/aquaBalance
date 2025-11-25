'use client';

import Image from "next/image";
import "./page.css";
import { useState } from "react";

import { withAuth } from '../components/withAuth';
import { usePropriedade } from '../hooks/usePropriedade';
import Cards from "../components/Cards";

function PaginaPropriedade() {
  const { propriedades, handleAdd } = usePropriedade();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main className="inicio">
      <nav className="inicio-nav">
        <Image
          src="/logo2.png"
          alt="AquaBalance Logo"
          width={170}
          height={170}
          className="logo"
        />
        <h1>
          Minhas Propriedades
        </h1>
      </nav>
      <div className="inicio-content">
        <form className="inicio-form">
          <input type="text" placeholder="Pesquisar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>

        <section className="cards-list">
          {propriedades
            .filter((p) =>
              p.nomePropriedade.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((p) => (
              <div key={p.id} className="card-wrapper">
                <Cards idPropriedade={p.id} />
              </div>
            ))}
        </section>
      </div>


      <footer className="footer">
        <Image
          src="/home.png"
          alt="home"
          width={50}
          height={50}
          className="clique"
        />
        <Image
          src="/plus.png"
          alt="plus"
          width={50}
          height={50}
          className="clique"
          onClick={handleAdd}
        />
        <Image
          src="/perfil.png"
          alt="perfil"
          width={50}
          height={50}
          className="clique"
        />
      </footer>
    </main>
  );
}


export default withAuth(PaginaPropriedade);