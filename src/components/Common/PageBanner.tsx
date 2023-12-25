import React from "react";
import Link from "next/link";

interface PageBannerProps {
    pageTitle: string
    homePageUrl: string
    homePageText: string
    activePageText: string
    bgImage: string
}

const PageBanner = ({
  pageTitle,
  homePageUrl,
  homePageText,
  activePageText,
  bgImage,
}: PageBannerProps) => {
  return (
    <>
      <div className={`page-title-area ${bgImage}`}>
        <div className="d-table">
          <div className="d-table-cell">
            <div className="page-title-item">
              <h2>{pageTitle}</h2>
              <ul>
                <li>
                  <Link href={homePageUrl}>{homePageText}</Link>
                </li>
                <li className="active">{activePageText}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
