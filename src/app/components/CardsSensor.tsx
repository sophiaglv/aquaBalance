'use client'

interface CardsSensorProps {
    localizacao: number;
}

import Image from "next/image";
import "./CardsSensor.css";
import { useState, useEffect, useRef } from "react";
import { usePlantacao } from '../hooks/usePlantacao';
import { useSensor } from '../hooks/useSensor';

export default function Cards({ localizacao }: CardsSensorProps) {

    const { sensores, handleDelete } = useSensor();
    const { plantacoes } = usePlantacao();
    const popupRef = useRef<HTMLDivElement>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        }

        if (openMenuId !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenuId]);


    if (!sensores) return null;

    const sensoresDaPlantacao = sensores.filter(
        (s) => s.localizacao?.id === localizacao
    );

    return (
        <div className='cards'>
            {sensoresDaPlantacao.map((sensor) => (
                <div key={sensor.id}>
                    <div className="ladoEsquerdoSensor">
                        <h1>
                            {sensor.tipoSensor}
                        </h1>
                        <div>Código: {sensor.codigo}</div>

                    </div>
                    <div className="ladoDireitoSensor">
                        <a onClick={(e) => {
                            e.preventDefault();
                            setOpenMenuId(openMenuId === sensor.id ? null : sensor.id);
                        }}>
                            <Image
                                src="/voltar2.png"
                                alt="voltar"
                                width={15}
                                height={15}
                                className="clique"
                            />
                        </a>
                        {openMenuId === sensor.id && (
                            <div className="mini-popup" ref={popupRef}>
                                <a href={`/sensores/editar/${sensor.id}`} className="clique">
                                    Editar Sensor
                                </a>

                                <a onClick={() => handleDelete(sensor.id)} className="clique">
                                    Excluir Sensor
                                </a>
                            </div>
                        )}

                    </div>

                </div>
            ))}
        </div>
    );
}