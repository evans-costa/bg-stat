'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/zod';
import { authenticate } from '@/lib/actions.js';

import LoadingSpin from '@/interface/components/LoadingSpin';
import ErrorMessage from '@/interface/components/ErrorMessage';
import BGIcon from '@/public/static/headerIcon.png';

export default function Home() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  return (
    <section className="w-full h-screen flex flex-row ">
      <div className="bg-blue-700 basis-7/12 text-slate-50 flex flex-col items-center py-10">
        <Image
          src={BGIcon}
          width={100}
          height={100}
          alt="Meeple icon"
          className="self-start mx-10 w-auto h-auto"
        />
        <div className="w-3/4 mt-32 flex flex-col gap-6">
          <h1 className="text-5xl font-semibold">
            Mantenha em dia sua coleção de Jogos de Tabuleiro
          </h1>
          <p className="w-1/2 font-light text-2xl text-pretty text-slate-300">
            Veja toda sua coleção com informações de data e preço de aquisição e
            venda.
          </p>
        </div>
      </div>
      <div className="basis-1/2 flex flex-col justify-center items-center">
        <div className="mx-auto w-3/5">
          <h2 className="text-slate-50 text-5xl font-medium self-start mb-14">
            Entrar
          </h2>
          {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
          <form className="space-y-7" action={handleSubmit(dispatch)}>
            <div>
              <label
                htmlFor="email"
                className="block text-slate-50 mb-2 text-base"
              >
                Seu email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-transparent rounded-xl p-3.5 block border border-zinc-800 text-slate-200"
                placeholder="nome@email.com"
                autoComplete="on"
                {...register('email')}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-slate-50 mb-2 text-base"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-transparent rounded-xl p-3.5 block border border-zinc-800 text-slate-200"
                placeholder="••••••••"
                autoComplete="on"
                {...register('password')}
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <SubmitButton />
            <p className="text-base self-start text-slate-400">
              Não tem uma conta ainda?{' '}
              <Link className="text-blue-500 font-semibold" href="/signup">
                Cadastrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col items-center justify-between">
      <button
        type="submit"
        disabled={pending}
        className="w-full my-4 rounded-xl p-4 bg-blue-700 text-base font-medium text-slate-50"
      >
        {pending ? <LoadingSpin /> : 'Entrar'}
      </button>
    </div>
  );
}
