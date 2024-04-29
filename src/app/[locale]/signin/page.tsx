import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import SignInForm from "@/components/Authentication/SignInForm";
import { useTranslations } from "next-intl";

const SignIn = () => {
  const t = useTranslations('Contact');

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
  );
};

export default SignIn;
