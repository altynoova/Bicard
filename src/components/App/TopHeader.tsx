'use client'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import useUserStore from '@/store/useUserStore'
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SelectChangeEvent } from '@mui/material';

const TopHeader = () => {
  const { user } = useUserStore();
  const [signed, setSigned] = useState(false);
  const [username, setUsername] = useState(user.userName);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextlocale = e.target.value;
    router.replace(`/${nextlocale}`);
  };

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

  // Function to handle language change
  // const changeLanguage = (locale: string) => {
  //   setLocale(locale); // Call setLocale with the desired locale
  // }

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
                      <a>
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
                      <a href="https://2gis.kg/bishkek/firm/70000001022019440?m=74.604169%2C42.838768%2F16" target="_blank">
                        <i className="icofont-location-pin"></i>
                        улица Тыныстанова2, г. Бишкек
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="header-top-item">
                <div className="header-top-right">
                  <select value={locale} onChange={handleChange}>
                    <option value="en">English</option>
                    <option value="ru">Russian</option>
                    <option value="ky">Kyrgyz</option>
                  </select>
                  {/* <ul className="lang-list">
                    <li>
                      <button onClick={() => changeLanguage('ru')}>RU</button>
                    </li>
                    <li>
                      <button onClick={() => changeLanguage('kg')}>KG</button>
                    </li>
                    <li>
                      <button onClick={() => changeLanguage('en')}>EN</button>
                    </li>
                  </ul> */}

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

export default TopHeader;
