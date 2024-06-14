import Image from 'next/image';
import BGIcon from '@/public/static/headerIcon.png';

import SignInForm from '@/interface/components/SignInForm';

export default function Home() {
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
        <SignInForm />
      </div>
    </section>
  );
}
