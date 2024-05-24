'use client'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState, useTransition } from 'react'
import useUserStore from '@/store/useUserStore'
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { SelectChangeEvent } from '@mui/material';
import { GetCookie, RemoveCookie } from '@/libs/cookie';

const TopHeader = () => {
  const { user } = useUserStore();

  const userName = GetCookie('userName')
  const signed = GetCookie('Bicard-Web-API-Access-Token')

  const t = useTranslations('TopHeader');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextlocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextlocale}`);
    })
  };

  const handleSignOut = () => {
    RemoveCookie('Bicard-Web-API-Access-Token')
    RemoveCookie('userId')
    RemoveCookie('userRole')
    RemoveCookie('userName')
    router.push('/signin')
  }

  // Function to handle language change
  // const changeLanguage = (locale: string) => {
  //   setLocale(locale); // Call setLocale with the desired locale
  // }

  useEffect(() => {
    console.log(signed);
  }, [])

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
                      {!!signed ? (
                        <a href="#" onClick={handleSignOut}>
                          <i className="icofont-user"></i>
                          {userName}
                        </a>
                      ) : (
                        <a href="/signin">
                          <i className="icofont-user"></i>
                          {t('Login')}
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
                        {t('Street')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="header-top-item">
                <div className="header-top-right">
                  <div className="select-container">
                    <select value={locale} onChange={handleChange}>
                      <option value="en">{t('English')}</option>
                      <option value="ru">{t('Russian')}</option>
                      <option value="ky">{t('Kyrgyz')}</option>
                    </select>
                  </div>


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
