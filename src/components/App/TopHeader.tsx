import React from "react";

const TopHeader = () => {
  return (
    <>
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-8 col-lg-9">
              <div className="header-top-item">
                <div className="header-top-left">
                  <ul>
                    <li>
                      <a href="tel:+07554332322">
                        <i className="icofont-ui-call"></i>
                        +996 552 552 552
                      </a>
                    </li>
                    <li>
                      <a href="mailto:hello@disin.com">
                        <i className="icofont-ui-message"></i>
                        supportbicard@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      улица Тыныстанова2, г. Бишкек
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="header-top-item">
                <div className="header-top-right">
                  <ul className="lang-list">
                    <li>
                      <a href="/">RU</a>
                    </li>
                    <li>
                      <a href="/ar">KG</a>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <a href="https://www.facebook.com/" target="_blank">
                        <i className="icofont-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/" target="_blank">
                        <i className="icofont-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/" target="_blank">
                        <i className="icofont-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/" target="_blank">
                        <i className="icofont-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
