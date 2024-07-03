import { Locale } from "@/i18n-config"
import LocaleSwitcher from "../LocaleSwitcher"
import { getDictionary } from "@/get-dictionary"

type NavbarProps = {
  lang: Locale,
}

export const Navbar = async ({ lang }: NavbarProps) => {
  const dictionary = await getDictionary(lang)
  
  return (
    <nav className="h-[60px] px-8 flex max-w-screen justify-between items-center bg-[#213226]">
      <ul className="flex gap-8">
        <li>
          <a href={`/${lang}/${dictionary.home.link}`}>{dictionary.home.nome}</a>
        </li>
        <li>
          <a href={`/${lang}/${dictionary.about.link}`}>{dictionary.about.nome}</a>
        </li>
      </ul>
      <LocaleSwitcher/>
    </nav>
  )
}