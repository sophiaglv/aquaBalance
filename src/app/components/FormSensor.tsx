'use client'

import { useFormSensor } from '../hooks/useFormSensor';
import Image from "next/image";
import "./FormularioSensor.css";

export default function FormularioSensor({ id, propriedadeId }: { id?: string, propriedadeId?: string }) {
    const { form, isEditMode, plantacoes, handleChange, handleSubmit, handleDelete } = useFormSensor(id);

    // Filtra as plantações pela propriedadeId, se fornecido
    const plantacoesFiltradas = propriedadeId
        ? plantacoes.filter(localizacao => String(localizacao.propriedade.id) === String(propriedadeId))
        : plantacoes;


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
                        {isEditMode ? 'Editar Sensor' : 'Adicionar Sensor'}
                    </h1>
                </nav>
                <div className="formulario-content">
                    <div className="formulario-form">
                        <div className="formulario-perfil">
                            <div className="separar">
                                <label htmlFor="tipoSensor">Tipo Sensor</label>
                                <input
                                    type="text"
                                    name="tipoSensor"
                                    value={form.tipoSensor}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="codigo">Código</label>
                                <input
                                    type="number"
                                    name="codigo"
                                    value={form.codigo}
                                    onChange={handleChange}
                                    required
                                />

                                <label htmlFor="localizacao">Localização</label>
                                <select
                                    name="localizacao"
                                    value={form.localizacao}
                                    onChange={handleChange}
                                    required
                                >
                                    {isEditMode ? (

                                        <option value={form.localizacao}>
                                            {plantacoes.find(localizacao => localizacao.id === form.localizacao)?.cultura || 'Localização não encontrada'}
                                        </option>
                                    ) : (
                                        <>
                                            <option value="">Selecione uma localização</option>
                                            {plantacoesFiltradas.map(localizacao => (
                                                <option key={localizacao.id} value={localizacao.id}>
                                                    {localizacao.cultura}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
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
        </main>
    );
}
