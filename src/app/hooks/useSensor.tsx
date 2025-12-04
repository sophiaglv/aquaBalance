'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { Sensor } from '@/types/sensor';
import { Plantacao } from '@/types/plantacao'; 

interface SensorComPlantacao extends Omit<Sensor, 'localizacao'> {
  localizacao: Plantacao;
}

export function useSensor() {
  const router = useRouter();
  const [sensores, setSensores] = useState<SensorComPlantacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("chegou aqui");
    Promise.all([
      api.get<Sensor[]>('/sensor/'),
      api.get<Plantacao[]>('/plantacao/')
    ]).then(([sensoresResponse, plantacoesResponse]) => {
      
      const listaDeSensor = sensoresResponse.data;
      const listaDePlantacoes = plantacoesResponse.data;

      console.log(listaDeSensor);

      const sensoresComNomes = listaDeSensor.map(itemDoSensor => {
        const plantacaoCompleto = listaDePlantacoes.find(p => p.id === itemDoSensor.localizacao.id);
        return {
          ...itemDoSensor,
          localizacao: plantacaoCompleto || itemDoSensor.localizacao 
        };
      });
      

      setSensores(sensoresComNomes as SensorComPlantacao[]);
      
    }).catch(error => {
      console.error("Erro ao carregar dados combinados:", error);
      Swal.fire('Erro', 'Não foi possível carregar os dados da página.', 'error');
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Tem certeza?', text: 'Você não poderá reverter esta ação!', icon: 'warning',
      showCancelButton: true, confirmButtonText: 'Sim, excluir!', cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      api.delete(`/sensor/${id}`).then(() => {
        setSensores(sensoresAtuais => sensoresAtuais.filter(e => e.id !== id));
        Swal.fire('Excluído!', 'O item do sensor foi removido.', 'success');
      });
    }
  };

  const handleAdd = () => router.push('/sensores/cadastro'); 
  const handleEdit = (id: number) => router.push(`/sensores/editar/${id}`);
  
  return {
    sensores,
    loading,
    handleDelete,
    setSensores,
    handleAdd,
    handleEdit
  };
}