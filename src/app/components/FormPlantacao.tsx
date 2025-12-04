'use client';
import Image from "next/image";
import "./Formulario.css";

import { useFormPlantacao } from "../hooks/useFormPlantacao";

export default function FormularioPlantacao({ id }: { id?: string }) {
    const {
        form,
        isEditMode,
        propriedades,
        handleChange,
        handleSubmit,
        handleDelete,
        handleCancel
    } = useFormPlantacao(id);

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
                        {isEditMode ? 'Editar Plantação' : 'Adicionar Plantação'}
                    </h1>
                </nav>
                <div className="formulario-content">
                    <div className="formulario-form">
                        <div className="formulario-input">

                            <div className="separar">
                                <label htmlFor="cultura">Cultura</label>
                                <input type="text" name="cultura" value={form.cultura} onChange={handleChange} required />

                                <label htmlFor="idPropriedade">Propriedade</label>
                                <select
                                    name="idPropriedade"
                                    value={form.idPropriedade}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Selecione uma propriedade</option>
                                    {propriedades.map(propriedade => (
                                        <option key={propriedade.id} value={propriedade.id}>
                                            {propriedade.nomePropriedade}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="descricao">Descrição</label>
                                <input type="text" name="descricao" value={form.descricao} onChange={handleChange} required />
                            </div>
                            <div className="separar">
                                <label htmlFor="tamanho">Tamanho (ha)</label>
                                <input type="number" name="tamanho" value={form.tamanho} onChange={handleChange} required />

                                <label htmlFor="umidadeIdeal">Umidade Ideal (%)</label>
                                <input type="number" name="umidadeIdeal" value={form.umidadeIdeal} onChange={handleChange} required />

                                <label htmlFor="temperaturaIdeal">Temperatura Ideal (°C)</label>
                                <input type="number" name="temperaturaIdeal" value={form.temperaturaIdeal} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="formulario-button">
                            <button type="submit" className="button">
                                {isEditMode ? 'Salvar' : '+ Adicionar Plantação'}
                            </button>
                            {isEditMode && (
                                <button
                                    type="button"
                                    className="button delete"
                                    onClick={() => { if (id) handleDelete(Number(id)); }}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>

            <footer>
                <Image
                    src="/home.png"
                    alt="home"
                    width={50}
                    height={50}
                    className="clique"
                    onClick={handleCancel}
                />
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
        </main>
    );
}