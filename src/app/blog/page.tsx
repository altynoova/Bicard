import React from "react";
import BlogGrid from "@/components/Blog/BlogGrid";
import PageBanner from "@/components/Common/PageBanner";

const Blog = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Blog"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog"
        bgImage="page-title-four"
      />

      <BlogGrid />
    </div>
  );
};

export default Blog;
