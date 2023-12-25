import React from "react";
import TopHeader from "@/components/App/TopHeader";
import Navbar from "@/components/App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/App/Footer";
import SignInForm from "@/components/authentication/SignInForm";

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
