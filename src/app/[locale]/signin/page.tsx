import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import SignInForm from "@/components/Authentication/SignInForm";

const SignIn = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Вход"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Вход"
        bgImage="page-title-one"
      />

      <SignInForm />
    </div>
  );
};

export default SignIn;
