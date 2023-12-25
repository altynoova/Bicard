import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import TopHeader from "@/components/App/TopHeader";
import Navbar from "@/components/App/Navbar";
import SignUpForm from "@/components/authentication/SignUpForm";
import Footer from "@/components/App/Footer";

const SignUp = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Sign Up"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Sign Up"
        bgImage="page-title-one"
      />

      <SignUpForm />
    </div>
  );
};

export default SignUp;
