import { useTranslation } from 'react-i18next';

interface LanguageItem {
  code: string;
  label: string;
}

const ALL_LANGUAGES: LanguageItem[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const Language = () => {
  const { i18n } = useTranslation();
  const availableLanguages = ALL_LANGUAGES.filter(
    (language: LanguageItem) => language.code !== i18n.language
  );

  return availableLanguages.map((availableLanguage: LanguageItem) => (
    <button
      key={availableLanguage.code}
      className="border-none bg-none uppercase text-red-600 mr-2 p-2 cursor-pointer focus:outline-dotted block w-full mb-2 md:inline-block md:w-auto md:mb-0"
      onClick={() => i18n.changeLanguage(availableLanguage.code)}
    >
      {availableLanguage.label}
    </button>
  ));
};

export default Language;
