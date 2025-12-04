'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { Plantacao } from '@/types/plantacao';
import { Propriedade } from '@/types/propriedade';

interface PlantacaoComPropriedade extends Omit<Plantacao, 'propriedade'> {
  propriedade: Propriedade;
}

export function usePlantacao() {
  const router = useRouter();
  const [plantacoes, setPlantacoes] = useState<PlantacaoComPropriedade[]>([]);
  const [plantacao, setPlantacao] = useState<Plantacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Plantacao[]>('/plantacao/').then(response => {
      setPlantacao(response.data);
    })
      .catch((error) => {
        console.error('Erro ao carregar propriedades:', error);
      });
  }, []);

  useEffect(() => {
    // 1. Buscamos a lista de estoque E a lista de produtos ao mesmo tempo.
    Promise.all([
      api.get<Plantacao[]>('/plantacao/'),
      api.get<Propriedade[]>('/propriedades/')
    ]).then(([plantacaoResponse, propriedadesResponse]) => {

      const listaDePlantacao = plantacaoResponse.data;
      const listaDePropriedades = propriedadesResponse.data;

      // 2. Para cada item do estoque, encontramos o produto correspondente e juntamos as informações.
      const plantacoesComNomes = listaDePlantacao.map(itemDaPlantacao => {
        const propriedadeCompleta = listaDePropriedades.find(p => p.id === itemDaPlantacao.propriedade.id);
        return {
          ...itemDaPlantacao,
          // Agora, o campo 'produto' terá o nome, descrição, etc.
          propriedade: propriedadeCompleta || itemDaPlantacao.propriedade
        };
      });

      setPlantacoes(plantacoesComNomes as PlantacaoComPropriedade[]);

    }).catch(error => {
      console.error("Erro ao carregar dados combinados:", error);
      Swal.fire('Erro', 'Não foi possível carregar os dados da página.', 'error');
    }).finally(() => {
      setLoading(false);
    });
  }, []);



  const handleAdd = () => router.push('/plantacoes/cadastro');
  const handleEdit = (id: number) => router.push(`/plantacoes/editar/${id}`);

  return {
    plantacoes,
    loading,
    setPlantacoes,
    handleAdd,
    handleEdit
  };
}