import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import SignUpForm from '@/components/Authentication/SignUpForm'
import { useTranslations } from 'next-intl';

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

      <SignUpForm />
    </div>
  )
}

export default SignUp
