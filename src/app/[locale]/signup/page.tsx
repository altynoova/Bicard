import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import SignUpForm from '@/components/Authentication/SignUpForm'

const SignUp = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Регистрация"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Зарегистрироваться"
        bgImage="page-title-one"
      />

      <SignUpForm />
    </div>
  )
}

export default SignUp
