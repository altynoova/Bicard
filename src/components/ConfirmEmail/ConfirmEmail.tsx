'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'
import PageBanner from '../Common/PageBanner'
import SignInForm from '../Authentication/SignInForm'

const ConfirmEmail = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  const router = useRouter();
  const t = useTranslations('Contact');
  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`/appi/Users/ConfirmEmail?userId=${userId}&token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        if (response.ok) {
          SuccessAlert('Вы вошли в свой аккаунт!')
          router.push('/about');
        } else {
          ErrorAlert('Ошибка на стороне сервера, повторите попытку ')
        }
      } catch (error) {
        alert('An error occurred while confirming your email.')
      }
    }

    if (userId && token) {
      confirmEmail()
    }
  }, [userId, token])

  return (
    <div>
      <PageBanner
        pageTitle={t('Login')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Login')}
        bgImage="page-title-one"
      />
      <SignInForm />
    </div>
  )
}

export default ConfirmEmail
