'use client';

import "./page.css";
import Image from "next/image";
import { withAuth } from '../../components/withAuth';
import './ToggleSwitch.css';
import api from "../../lib/api";

import { useState, useEffect, JSX } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { usePlantacao } from "@/app/hooks/usePlantacao";
import CardsSensor from "../../components/CardsSensor";
  import { useParams } from "next/navigation"


interface ChartDataPoint {
    tempo: string;
    valor: number;
}

function PaginaPlantacao(): JSX.Element {
    const { id } = useParams();
  
    const [temperatura, setTemperatura] = useState<number>(0);
    const [umidade, setUmidade] = useState<number>(0);

    const { plantacoes, handleAdd } = usePlantacao();

    const [dadosTemperatura, setDadosTemperatura] = useState<ChartDataPoint[]>([]);
    const [dadosUmidade, setDadosUmidade] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const gerarNovoPonto = (valor: number): ChartDataPoint => ({
            tempo: new Date().toLocaleDateString(),
            valor: valor,
        });

        const atualizarDados = (
            setDados: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>,
            novoValor: number
        ) => {
            setDados((prev) => {
                const novoPonto = gerarNovoPonto(novoValor);
                const novo = [...prev, novoPonto];
                return novo.slice(-8);
            });
        };

        const intervaloTemp = setInterval(() => {
            const novoValor = Math.floor(Math.random() * (32 - 20 + 1)) + 20;

            setTemperatura(novoValor);
            atualizarDados(setDadosTemperatura, novoValor);
        }, 15000); // 15 segundos

        const intervaloUmid = setInterval(() => {
            const novoValor = Math.floor(Math.random() * (80 - 20 + 1)) + 20;

            setUmidade(novoValor);
            atualizarDados(setDadosUmidade, novoValor);
        }, 15000); // 15 segundos

        return () => {
            clearInterval(intervaloTemp);
            clearInterval(intervaloUmid);
        };
    }, []);


    const [isChecked, setIsChecked] = useState<boolean>(false);

    const toggleSwitch = () => {
        setIsChecked((prev) => !prev);
    };

    const [plantacao, setPlantacao] = useState<any>(null);

    useEffect(() => {
        api.get(`/plantacao/${id}`)
            .then(response => setPlantacao(response.data))
            .catch(err => console.error("Erro ao carregar plantação:", err));
    }, [id]);

    if (!plantacao) return <p>Carregando...</p>;

    return (
        <section className="todo">

            <section className="ladoDados">

                <section className="informacoesTopo">

                    <section className="tituloEIcones">

                        <section className="ptE">
                            <a href="/propriedades">
                                <Image src="/voltaPreto.png" alt="Voltar" width={20} height={20} className="clique" />
                            </a>
                            <h1>{plantacao.cultura}</h1>
                        </section>

                        <section className="ptD">
                            <a href={`/plantacoes/editar/${id}`}>
                                <Image src="/editar.png" alt="Editar" width={30} height={30} className="clique" />
                            </a>
                        </section>

                    </section>


                    <section className="tipoEProp">

                        <section>
                            <p>Tamanho: <b>{plantacao.tamanho}ha</b></p>
                        </section>

                        <section className="propriedade">
                            <p>Propriedade: <b>{plantacao.propriedade?.nomePropriedade}</b></p>
                        </section>

                    </section>

                    <section className="desc">
                        <section className="descricao">
                            <p>Descrição: <b>{plantacao.descricao}</b></p>
                        </section>
                    </section>


                </section>

                <section className="informacoesTempoReal">

                    <section className="caixasEIrriga">

                        <section className="caixaTemperatura">
                            <h2>Temperatura</h2>
                            <p>
                                {temperatura}°C
                            </p>
                        </section>

                        <section className="caixaUmidade">
                            <h2>Umidade</h2>
                            <p>
                                {umidade}%
                            </p>
                        </section>

                        <section className="irrigador">
                            <h2>IRRIGAÇÃO</h2>
                            <label className="switch">
                                <input type="checkbox" checked={isChecked} onChange={toggleSwitch} />
                                <span className="slider round"></span>
                            </label>
                        </section>

                    </section>

                    <section className="graficos">


                        <section className="graficoTemperatura">

                            <h3>Média de temperatura diária</h3>

                            <div style={{ width: "97%", height: "260px" }}>
                                {/* O ResponsiveContainer não exige tipagem específica aqui */}
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={dadosTemperatura}>
                                        <CartesianGrid strokeDasharray="4 3" />
                                        <XAxis dataKey="tempo" />
                                        <YAxis domain={[20, 32]} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="valor"
                                            stroke="#ff2622ff"
                                            strokeWidth={3}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>


                        </section>

                        <section className="graficoUmidade">

                            <h3>Média de umidade diária</h3>

                            <div style={{ width: "97%", height: "260px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={dadosUmidade}>
                                        <CartesianGrid strokeDasharray="4 3" />
                                        <XAxis dataKey="tempo" />
                                        <YAxis domain={[20, 80]} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="valor"
                                            stroke="#2196F3"
                                            strokeWidth={3}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                        </section>


                    </section>

                </section>

            </section>

            <section className="ladoSensor">
                <section className="tituloSensor">
                    <h1>Sensores</h1>
                </section>
                <section className="caixasSensor">
                    <CardsSensor localizacao={Number(id)} />
                </section>
                <section className="botaoAdicionar">

                    <a href="/sensores/cadastro">Adicionar Sensor</a>

                </section>

            </section>

        </section >
    );
}
export default withAuth(PaginaPlantacao);