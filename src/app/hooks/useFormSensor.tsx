import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { SensorForm } from '@/types/sensorForm';
import { Plantacao } from '@/types/plantacao';

export function useFormSensor(id?: string) {
  const router = useRouter();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState<SensorForm>({
    tipoSensor: '',
    codigo: '',
    localizacao: '', // Este campo vai manter o ID da plantação
  });
  const [plantacoes, setPlantacoes] = useState<Plantacao[]>([]);
  const [plantacaoId, setPlantacaoId] = useState<string>('');

  // Carrega as plantações
  useEffect(() => {
    api.get<Plantacao[]>('/plantacao/').then(response => {
      setPlantacoes(response.data);
    }).catch(error => {
      console.error("Erro ao buscar a lista de plantacoes:", error);
      Swal.fire('Erro!', 'Não foi possível carregar a lista de plantacoes.', 'error');
    });

    // Se for um modo de edição, carrega o sensor e sua plantação
    if (isEditMode) {
      api.get(`/sensor/${id}`).then(response => {
        const dados = response.data;
        const idPlantacao = dados.localizacao?.id || '';
        setPlantacaoId(String(idPlantacao));
        setForm({
          tipoSensor: dados.tipoSensor || '',
          codigo: dados.codigo || '',
          localizacao: idPlantacao, // Associar a plantação correta
        });
      }).catch(error => {
        console.error(`Erro ao buscar o item do sensor ${id}:`, error);
        Swal.fire('Erro!', 'Não foi possível carregar os dados para edição.', 'error');
        router.push('/plantacoes/');
      });
    }
  }, [id, isEditMode, router]);

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter esta ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            api.delete(`/sensor/${id}`).then(() => {
                Swal.fire('Excluído!', 'O sensor foi removido.', 'success');
                router.push(`/plantacoes/${plantacaoId}`);
            }).catch(error => {
                console.error("Erro ao excluir o item:", error);
                Swal.fire('Erro!', 'Não foi possível excluir o item.', 'error');
            });
        }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idPlantacaoNumerico = parseInt(String(form.localizacao), 10);

    if (!idPlantacaoNumerico) {
      Swal.fire('Atenção!', 'Você precisa selecionar uma plantação.', 'warning');
      return;
    }

    const dadosParaEnviar = {
      tipoSensor: form.tipoSensor,
      codigo: parseInt(String(form.codigo), 10) || 0,
      localizacao: {
        id: idPlantacaoNumerico
      }
    };

    const promise = isEditMode
      ? api.put(`/sensor/${id}`, dadosParaEnviar)
      : api.post('/sensor/', dadosParaEnviar);

    promise.then(() => {
      Swal.fire({
        title: 'Sucesso!',
        text: `Item do sensor ${isEditMode ? 'atualizado' : 'salvo'} com sucesso.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => router.push(`/plantacoes/${idPlantacaoNumerico}`), 1500);
    }).catch(error => {
      console.error("Erro ao salvar o item do sensor:", error);
      const errorMessage = error.response?.data?.message || 'Não foi possível salvar o item.';
      Swal.fire('Erro!', errorMessage, 'error');
    });
  };

  const handleCancel = () => {
    router.push(`/plantacoes/${plantacaoId || form.localizacao}`);
  };

  return {
    form,
    isEditMode,
    plantacoes,
    handleChange,
    handleSubmit,
    handleDelete,
    handleCancel,
  };
}
