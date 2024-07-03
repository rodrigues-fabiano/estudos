"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Locale, i18n } from "@/i18n-config";
import Flag from 'react-world-flags'

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments[1];
  };

  const siglaBandeira = {
    'en': 'gbr',
    'pt': 'br',
    'es': 'es'
  }

  return (
    <div>
      <ul className="flex space-x-8">
        {i18n.locales.map((locale) => {
          return (
            <li key={locale} >
              <a
                href={`/${redirectedPathName(locale)}`}>
                <Flag className="p-0 m-0" code={siglaBandeira[locale]} />
                {locale.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}