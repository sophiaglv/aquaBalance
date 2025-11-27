'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { PlantacaoForm } from '@/types/plantacaoForm';
import { Propriedade } from '@/types/propriedade';


export function useFormPlantacao(id?: string) {
    const router = useRouter();
    const isEditMode = Boolean(id);
    const [form, setForm] = useState<PlantacaoForm>(
        {
            cultura: '',
            descricao: '',
            tamanho: '',
            umidadeIdeal: '',
            temperaturaIdeal: '',
            idPropriedade: '', // O estado do formulário espera um ID simples
        }
    );
    const [propriedades, setPropriedades] = useState<Propriedade[]>([]);

    useEffect(() => {
        api.get<Propriedade[]>('/propriedades/').then(response => {
            setPropriedades(response.data);
        }).catch(error => {
            console.error("Erro ao buscar a lista de propriedades:", error);
            Swal.fire('Erro!', 'Não foi possível carregar a lista de propriedades.', 'error');
        });

        if (isEditMode) {
            api.get(`/plantacao/${id}`) // Não precisa tipar a resposta aqui
                .then(response => {
                    const dados = response.data;

                    // --- CORREÇÃO AQUI ---
                    // "Achata" os dados recebidos para preencher o estado do formulário
                    setForm({
                        cultura: dados.cultura || '',
                        descricao: dados.descricao || '',
                        tamanho: dados.tamanho || '',
                        umidadeIdeal: dados.umidadeIdeal || '',
                        temperaturaIdeal: dados.temperaturaIdeal || '',
                        // Pega o ID de dentro do objeto 'propriedade'
                        idPropriedade: dados.propriedade?.id || '',
                    });
                })
                .catch(error => {
                    console.error(`Erro ao buscar a plantacao ${id}:`, error);
                    Swal.fire('Erro!', 'Não foi possível carregar os dados para edição.', 'error');
                    router.push('/propriedades');
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
            api.delete(`/plantacao/${id}`).then(() => {
                Swal.fire('Excluído!', 'A plantacao foi removida.', 'success');
                router.push('/propriedades');
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

        const idPropriedadeNumerico = parseInt(String(form.idPropriedade), 10);

        if (!idPropriedadeNumerico) {
            Swal.fire('Atenção!', 'Você precisa selecionar uma propriedade.', 'warning');
            return;
        }

        const dadosParaEnviar = {
            cultura: form.cultura,
            propriedade: {
                id: idPropriedadeNumerico
            },
            tamanho: parseInt(String(form.tamanho), 10) || 0,
            descricao: form.descricao,
            umidadeIdeal: parseInt(String(form.umidadeIdeal), 10) || 0,
            temperaturaIdeal: parseInt(String(form.temperaturaIdeal), 10) || 0,
        };

        const promise = isEditMode
            ? api.put(`/plantacao/${id}`, dadosParaEnviar)
            : api.post('/plantacao/', dadosParaEnviar);

        promise.then(() => {
            Swal.fire({
                title: 'Sucesso!',
                text: `Plantação ${isEditMode ? 'atualizada' : 'salva'} com sucesso.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });
            // Redireciona para a lista
            setTimeout(() => router.push('/propriedades'), 1500); // Ajustei o tempo e a rota
        }).catch(error => {
            console.error("Erro ao salvar o item da plantação:", error);
            const errorMessage = error.response?.data?.message || 'Não foi possível salvar o item.';
            Swal.fire('Erro!', errorMessage, 'error');
        });
    };

    const handleCancel = () => {
        router.push('/propriedades');
    };

    return {
        form,
        isEditMode,
        propriedades,
        handleChange,
        handleSubmit,
        handleCancel,
        handleDelete
    };
}