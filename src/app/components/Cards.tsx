'use client'

interface CardsProps {
    idPropriedade: number;
}

import Image from "next/image";
import "./Cards.css";
import { useState, useEffect, useRef } from "react";
import { usePropriedade } from '../hooks/usePropriedade';
import { usePlantacao } from '../hooks/usePlantacao';

export default function Cards({ idPropriedade }: CardsProps) {
    const { propriedades, handleDelete } = usePropriedade();
    const { plantacoes } = usePlantacao();
    const popupRef = useRef<HTMLDivElement>(null);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        }

        if (openMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenu]);


    if (!propriedades) return null;

    const propriedadeAtual = propriedades.find(p => p.id === idPropriedade);
    if (!propriedadeAtual) return null;

    const plantacoesDaPropriedade = plantacoes.filter((pl) => {
        const prop = pl.propriedade as any;
        let propId: number | string = '';

        if (typeof prop === 'string') {
            propId = prop;
        } else {
            propId = prop.idPropriedade ?? prop.id ?? prop._id ?? '';
        }

        return String(propId) === String(idPropriedade);
    });
    return (
        <div className='cards'>

            <div className="card">
                <div className="card-header">
                    <span>{propriedadeAtual.nomePropriedade}</span>

                    <a onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu(!openMenu);
                    }}>
                        <Image
                            src="/menu.png"
                            alt="icone menu"
                            width={3}
                            height={3}
                            className="clique"
                        />
                    </a>
                    {openMenu && (
                        <div className="mini-popup" ref={popupRef}>
                            <a href="/plantacoes/cadastro">
                                <Image
                                    src="/mais.png"
                                    alt="mais"
                                    width={25}
                                    height={25}
                                />
                                Adicionar Plantação
                            </a>
                            <a href={`/propriedades/editar/${idPropriedade}`}>
                                <Image
                                    src="/edit.png"
                                    alt="edit"
                                    width={25}
                                    height={25}
                                />
                                Editar Propriedade
                            </a>
                            <a onClick={() => handleDelete(idPropriedade)}>
                                <Image
                                    src="/lixo.png"
                                    alt="lixo"
                                    width={25}
                                    height={25}

                                />
                                Excluir Propriedade
                            </a>
                        </div>
                    )}

                </div>
            </div>


            <div className="card-content">
                <div>Plantações:</div>
                {plantacoesDaPropriedade.length === 0 && (
                    <div>Nenhuma plantação cadastrada.</div>
                )}
                {plantacoesDaPropriedade.map((plantacao) => (
                    <div key={plantacao.id} className="card-content">
                        <a href={`/plantacoes/${plantacao.id}`}>
                            <div className="plantacao-item">
                                <div className="juncao">
                                    <span className='card-icon'>🌿</span>
                                    <span>{plantacao.cultura}</span>
                                </div>
                                <div className="desc">{plantacao.descricao}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
            <div className="card-btn">
                <a href="/plantacoes/cadastro">Adicionar Plantação</a>
            </div>
        </div>
    );
}