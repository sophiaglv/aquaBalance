'use client';

import Image from "next/image";
import { useCadastro } from "../hooks/useCadastro";

import "./page.css";

export default function Cadastro() {
  const { form, handleChange, handleRegister, isChecked, handleCheckboxChange } = useCadastro();

  return (
    <main className="cadastro">
      <div>
        <Image
          src="/logo.png"
          alt="AquaBalance Logo"
          width={150}
          height={150}
          className="logo"
        />
      </div>
      <div className="cadastro-content">
        <h1>Cadastro</h1>

        <form onSubmit={handleRegister}>
          <div className='cadastro-input'>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Digite aqui..."
              value={form.nome}
              onChange={handleChange}
            />

            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Digite aqui..."
              value={form.email}
              onChange={handleChange}
            />
            <label>CPF/CNPJ</label>
            <input
              type="text"
              name="cpfCnpj"
              placeholder="Digite aqui..."
              value={form.cpfCnpj}
              onChange={handleChange}
            />

            <label>Crie uma senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite aqui..."
              value={form.senha}
              onChange={handleChange}
            />
          </div>

          <div className="cadastro-termos">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              Declaro que li, compreendi e aceito integrantes os
              <a href="/termos">Termos de Uso</a>
              </label>
          </div>

          <div className="cadastro-button">
            <button type="submit" className="button">Cadastre-se</button>
          </div>
        </form>
      </div>
    </main >
  );
}
