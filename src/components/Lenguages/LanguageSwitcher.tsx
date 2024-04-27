"use client"
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const changeLanguage = (locale: string) => {
    const currentPathWithoutLocale = router.pathname.replace(`/${router.locale}`, '');
    router.push(`${locale}${currentPathWithoutLocale}`, undefined, { locale });
  };

  return (
    <ul className="lang-list">
      <li>
        <button onClick={() => changeLanguage('ru')}>{t('RU')}</button>
      </li>
      <li>
        <button onClick={() => changeLanguage('kg')}>{t('KG')}</button>
      </li>
      <li>
        <button onClick={() => changeLanguage('en')}>{t('EN')}</button>
      </li>
    </ul>
  );
};

export default LanguageSwitcher;
