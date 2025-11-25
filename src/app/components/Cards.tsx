'use client'

interface CardsProps {
    idPropriedade: number;
}

import Link from 'next/link';
import "./Cards.css";
import { usePropriedade } from '../hooks/usePropriedade';
import { usePlantacao } from '../hooks/usePlantacao';

export default function Cards({ idPropriedade }: CardsProps) {
    const { propriedades } = usePropriedade();
    const { plantacoes } = usePlantacao();

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

                    {/* <Image></Image> */}
                </div>
            </div>


            <div className="card-content">
                <div>Plantações:</div>
                {plantacoesDaPropriedade.length === 0 && (
                    <div>Nenhuma plantação cadastrada.</div>
                )}
                {plantacoesDaPropriedade.map((plantacao) => (
                    <div key={plantacao.id} className="card-content">
                        <Link href={`/plantacoes/${plantacao.id}`}>
                            <div className="plantacao-item">
                                <div className="juncao">
                                    <span className='card-icon'>🌿</span>
                                    <span>{plantacao.cultura}</span>
                                </div>
                                <div className="desc">{plantacao.descricao}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="card-btn">
                <a href="/plantacoes/cadastro">Adicionar Plantação</a>
            </div>
        </div>
    );
}