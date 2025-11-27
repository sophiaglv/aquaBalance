'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { PropriedadeForm } from '@/types/PropriedadeForm';
import { Propriedade } from '@/types/propriedade';

export function useFormPropriedade(id?: string) {
    const router = useRouter();
    const [form, setForm, ] = useState<PropriedadeForm>({ nomePropriedade: '', estado: '', cidade: '', bairro: '', rua: '', numero: '' });
    const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            api.get<PropriedadeForm>(`/propriedades/${id}`)
                .then(response => setForm(response.data))
                .catch(() => {
                    Swal.fire('Erro', 'propriedade não encontrada', 'error').then(() => router.push('/propriedades'));
                });
        }
    }, [id, isEditMode, router]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(currentForm => ({ ...currentForm, [name]: value }));
    };

    const handleCancel = () => {
        router.push('/propriedades');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const propriedadeParaEnviar = { ...form, numero: Number(form.numero) };
        const method = isEditMode ? 'put' : 'post';
        const url = isEditMode ? `/propriedades/${id}` : '/propriedades/';
        const successMessage = `Propriedade ${isEditMode ? 'atualizada' : 'cadastrada'} com sucesso!`;

        api[method](url, propriedadeParaEnviar)
            .then(() => Swal.fire('Sucesso', successMessage, 'success'))
            .then(() => router.push('/propriedades'))
            .catch((error) => {
                console.error("Falha ao salvar a propriedade:", error);
                Swal.fire('Erro', 'Não foi possível salvar a propriedade.', 'error');
            });
    };

    return { form, isEditMode, handleChange, handleSubmit, handleCancel };
}