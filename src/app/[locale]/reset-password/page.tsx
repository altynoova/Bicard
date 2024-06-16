import React from 'react'
import ComfirmEmailComponent from '@/components/ConfirmEmail/ConfirmEmail'
import ResetPassword from '@/components/ConfirmEmail/ResetPassword'
import { useTranslations } from 'next-intl';
import PageBanner from '@/components/Common/PageBanner';

const ConfirmEmail = () => {
  const t = useTranslations('Contact');
  return (
    <div>
        <PageBanner
        pageTitle= {t('Reset')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Reset')}
        bgImage="page-title-one"
      />
      <ResetPassword />
    </div>
  )
}

export default ConfirmEmail
