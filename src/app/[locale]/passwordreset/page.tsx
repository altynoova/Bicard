import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import SignUpForm from '@/components/Authentication/SignUpForm'
import { useTranslations } from 'next-intl';
import PasswordReset from '@/components/Authentication/PasswordReset';

const SignUp = () => {
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

      <PasswordReset />
    </div>
  )
}

export default SignUp
