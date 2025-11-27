'use client';
import Image from "next/image";
import "./FormularioPerfil.css";

import { useFormPerfil } from '../hooks/useFormPerfil';
import { useRouter } from "next/navigation";

export default function FormularioPerfil({ id }: { id?: string }) {
    const { form, isEditMode, handleChange, handleSubmit } = useFormPerfil(id);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('logged');
        localStorage.removeItem('userName');
        router.push('/');
    };


    return (
        <main className='formulario'>
            <form onSubmit={handleSubmit}>
                <nav className="formulario-nav">
                    <Image
                        src="/logo2.png"
                        alt="AquaBalance Logo"
                        width={170}
                        height={170}
                        className="logo"
                    />
                    <h1>
                        Perfil
                    </h1>
                </nav>
                <div className="formulario-content">
                    <div className="formulario-form">
                        <div className="formulario-perfil">

                            <div className="separar">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" name="nome" value={form.nome ?? ''} onChange={handleChange} required />

                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" value={form.email ?? ''} onChange={handleChange} required />

                                <label htmlFor="cpfCnpj">Cpf/Cnpj</label>
                                <input type="text" name="cpfCnpj" value={form.cpfCnpj ?? ''} onChange={handleChange} required />

                                <label htmlFor="senha">Senha</label>
                                <input type="passsword" name="senha" value={form.senha ?? ''} onChange={handleChange} required />
                            </div>

                        </div>

                        <div className="formulario-button">
                            <button type="submit" className="button">
                                {isEditMode ? 'Salvar' : 'Salvar'}
                            </button>
                            <Image
                                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                                className="botao-sair"
                                src="/sair.png"
                                alt="sair"
                                width={50}
                                height={50}
                            />

                        </div>
                    </div>
                </div>
            </form>

            <footer>
                <a href="/propriedades">
                    <Image
                        src="/home.png"
                        alt="home"
                        width={50}
                        height={50}
                        className="clique"
                    />
                </a>
                <a href="/perfil/1">
                    <Image
                        src="/perfil.png"
                        alt="perfil"
                        width={50}
                        height={50}
                        className="clique"
                    />
                </a>

            </footer>
        </main >
    );
}