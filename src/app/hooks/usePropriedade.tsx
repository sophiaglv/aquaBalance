'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import api from '../lib/api';
import { Propriedade } from '@/types/propriedade';

export function usePropriedade() {
  const router = useRouter();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);

  useEffect(() => {
    api.get<Propriedade[]>('/propriedades/').then(response => {
      setPropriedades(response.data);
    })
      .catch((error) => {
        console.error('Erro ao carregar propriedades:', error);
      });
  }, []);

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
            api.delete(`/propriedades/${id}`).then(() => {
                setPropriedades(propriedadesAtuais => propriedadesAtuais.filter(p => p.id !== id));
                Swal.fire('Excluído!', 'A propriedade foi removida.', 'success').then(() => router.push('/propriedades'));
            });
        }
    };


  const handleAdd = () => router.push('/propriedades/cadastro');
  const handleEdit = (id: number) => router.push(`/propriedades/editar/${id}`);

  return { propriedades, handleAdd, handleEdit, handleDelete };
}
