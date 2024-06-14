'use client';

import Link from 'next/link';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/zod';
import { authenticate } from '@/lib/actions.js';

import LoadingSpin from '@/interface/components/LoadingSpin';
import ErrorMessage from '@/interface/components/ErrorMessage';
import { InformationCircleIcon } from '@heroicons/react/24/solid';

export default function SignInForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!isValid || isSubmitSuccessful) {
      reset({ email: '', password: '' }, { keepErrors: true });
    }
  }, [isSubmitSuccessful, isValid]);

  return (
    <div className="mx-auto w-3/5">
      <h2 className="text-slate-50 text-5xl font-medium self-start mb-14">
        Entrar
      </h2>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      <form className="space-y-7" action={handleSubmit(dispatch)}>
        <div>
          <label htmlFor="email" className="block text-slate-50 mb-2 text-base">
            Seu email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-transparent rounded-xl p-3.5 block border border-zinc-800 text-slate-200"
            autoComplete="on"
            {...register('email')}
          />
          {errors.email && (
            <p className="flex gap-1 text-red-500 text-sm font-medium mt-1">
              <InformationCircleIcon className="h-5 w-5" />
              {errors.email?.message}
            </p>
          )}
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
            autoComplete="on"
            {...register('password')}
          />
          {errors.password && (
            <p className="flex gap-1 text-red-500 text-sm font-medium mt-1">
              <InformationCircleIcon className="h-5 w-5" />
              {errors.password?.message}
            </p>
          )}
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
