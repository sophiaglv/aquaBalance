'use client';

import { useRouter } from 'next/navigation';

export function usePerfil() {
  const router = useRouter();

  const handleEdit = (id: number) => router.push(`/perfil/${id}`);

  return { handleEdit };
}
