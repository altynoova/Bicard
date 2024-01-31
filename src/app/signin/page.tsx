import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import SignInForm from "@/components/Authentication/SignInForm";

const SignIn = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Sign In"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Sign In"
        bgImage="page-title-one"
      />

      <SignInForm />
    </div>
  );
};

export default SignIn;
