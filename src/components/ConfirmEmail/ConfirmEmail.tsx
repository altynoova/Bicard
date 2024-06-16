'use client'
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'
import PageBanner from '../Common/PageBanner'
import SignInForm from '../Authentication/SignInForm'
import ComingSoon from '@/app/[locale]/coming-soon/page'
import { $http } from '@/libs/axios'

const ConfirmEmail = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  const router = useRouter();
  const t = useTranslations('Contact');
  useEffect(() => {

    const confirmEmail = async () => {
      console.log("id",userId )
      console.log("token",token )
      try {
        const response = await $http.get(`/Users/ConfirmEmail?userId=${userId}&token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        if (response.status ==200) {
          router.push('/signin');
        } else {
          ErrorAlert('Ошибка на стороне сервера, повторите попытку ')
        }
      } catch (error) {
        ErrorAlert('An error occurred while confirming your email.')
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
      <ComingSoon/>
    </div>
  )
}

export default ConfirmEmail
