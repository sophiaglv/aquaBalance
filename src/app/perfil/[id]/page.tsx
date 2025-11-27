'use client'
import FormularioPerfil from '@/app/components/FormPerfil';
import { withAuth } from '@/app/components/withAuth';

function PaginaEdicao({ params }: { params: { id: string } }) {
  const perfilProps = { id: params.id } as any;

  return (
    <section>
      <FormularioPerfil {...perfilProps} />
    </section>
  );
}

export default withAuth(PaginaEdicao);
