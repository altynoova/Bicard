import React from "react";
import PageBanner from "@/components/Common/PageBanner";
import DepartmentsCard from "@/components/Departments/DepartmentsCard";

const Departments = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Departments"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Departments"
        bgImage="page-title-one"
      />

      <DepartmentsCard />
    </div>
  );
};

export default Departments;
