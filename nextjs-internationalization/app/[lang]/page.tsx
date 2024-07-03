import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Image from "next/image";

import imagem from '@/app/assets/idiomas.svg'

export default async function Home({ params: { lang }, }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="h-[calc(100vh-60px)] grid grid-cols-2 justify-center p-4 px-16">
      <Image
        src={imagem}
        width={500}
        height={500}
        alt={""}
        className="relative right-[-100px]"
      />
      <div className="relative left-[-100px] flex flex-col justify-center text-right">
        <h1 className="text-6xl font-extrabold p-4 text-[#E3C191]">{dictionary.home.saldacao}</h1>
        <p className="text-2xl">{dictionary.home.mensagem}</p>
      </div>
    </main>
  );
}
