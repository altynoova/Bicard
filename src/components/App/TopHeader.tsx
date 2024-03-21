'use client'
import React, { use, useEffect, useState } from 'react'
import useUserStore from '@/store/useUserStore'
const TopHeader = () => {
  const { user } = useUserStore(); 
  const [signed, setSigned] = useState(false);
  const [username, setUsername] = useState(user.userName);

  useEffect(() => {
    setSigned(!!user.accessToken);
  }, [user.accessToken]);

  useEffect(() => {
    setUsername(user.userName);
  }, [user.userName]);

  const handleAuthentication = () => {
    if (!signed) {
      setUsername("");
    }
  }
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
                      {signed ? (
                        <a href="/signout" onClick={handleAuthentication}>
                          <i className="icofont-user"></i>
                          {username}
                        </a>
                      ) : (
                        <a href="/signin" onClick={handleAuthentication}> 
                          <i className="icofont-user"></i>
                          Войти
                        </a>
                      )}
                      
                    </li>
                   
                    <li>
                      <a >
                        <i className="icofont-ui-call"></i>
                        +996 559 860 688
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
                    <li>
                      <a href="/ar">EN</a>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <a href="https://www.facebook.com/Bicardclinic/" target="_blank">
                        <i className="icofont-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/bicard_official/" target="_blank">
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
  )
}

export default TopHeader
