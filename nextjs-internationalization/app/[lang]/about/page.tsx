import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function About({params: {lang},} : {params: {lang: Locale}}) {
  const dictionary = await getDictionary(lang);
  
  return (
    <main className="flex h-[calc(100vh-60px)] flex-col items-center justify-start p-24">
      <p>{dictionary.about.apresentacao[0]}</p>
      <h1 className="text-4xl font-bold p-4">{dictionary.about.apresentacao[1]}</h1>
      <p>{dictionary.about.apresentacao[2]}</p>

      <h2>{dictionary.about.redes}</h2>
    </main>
  );
}