import React from 'react'
import ComfirmEmailComponent from '@/components/ConfirmEmail/ConfirmEmail'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';

const ConfirmEmail = () => {
  const t = useTranslations('Contact');
  return (
    <div>
       <PageBanner
        pageTitle= {t('Registration')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Registration')}
        bgImage="page-title-one"
      />
      <ComfirmEmailComponent />
    </div>
  )
}

export default ConfirmEmail
