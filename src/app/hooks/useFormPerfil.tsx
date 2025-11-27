'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { PerfilForm } from '@/types/PerfilForm';

export function useFormPerfil(id?: string) {
    const router = useRouter();
    const [form, setForm,] = useState<PerfilForm>({ nome: '', email: '', cpfCnpj: '', senha: ''});
    const isEditMode = Boolean(id);

    useEffect(() => {
        if (isEditMode) {
            api.get<PerfilForm>(`/usuario/${id}`)
                .then(response => {
                    const data = response.data;
                    const safeForm: PerfilForm = {
                        nome: data.nome ?? '',
                        email: data.email ?? '',
                        cpfCnpj: data.cpfCnpj ?? '',
                        senha: data.senha ?? '',
                    };
                    setForm(safeForm);
                })
                .catch(() => {
                    Swal.fire('Erro', 'Perfil não encontrado', 'error').then(() => router.push('/erro'));
                });
        }
    }, [id, isEditMode, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(currentForm => ({ ...currentForm, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEditMode || !id) {
            Swal.fire('Erro', 'Operação inválida: apenas edição é suportada.', 'error')
                .then(() => router.push('/erro'));
            return;
        }

        const perfilParaEnviar = { ...form, id: Number(id) };
        const url = `/usuario/${id}`;
        const successMessage = 'Perfil atualizado com sucesso!';

        api.put(url, perfilParaEnviar)
            .then(() => {
                Swal.fire('Sucesso', successMessage, 'success').then(() => {
                    router.push(`/perfil/${id}`);
                });
            })
            .catch((error) => {
                console.error("Falha ao salvar o perfil:", error);
                Swal.fire('Erro', 'Não foi possível salvar o perfil.', 'error');
            });
    };


    return { form, isEditMode, handleChange, handleSubmit };
}