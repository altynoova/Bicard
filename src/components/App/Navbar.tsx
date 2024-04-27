'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useUserStore from '@/store/useUserStore'
import { GetCookie } from '@/libs/cookie'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState('')
  const router = useRouter()
  const user = useUserStore().user
  const { t } = useTranslation();

  // useEffect(() => {
  //   setCurrentPath(router.asPath);
  // }, [router]);

  const [menu, setMenu] = React.useState(true)

  const toggleNavbar = () => {
    setMenu(!menu)
  }

  React.useEffect(() => {
    let elementId = document.getElementById('navbar')
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        // @ts-ignore
        elementId.classList.add('is-sticky')
      } else {
        // @ts-ignore
        elementId.classList.remove('is-sticky')
      }
    })
  })

  const classOne = menu
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show'
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right'

  return (
    <>
      <div id="navbar" className="navbar-area sticky-top">
        <div className="main-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/" className="navbar-brand">
                <img src="/images/logo3.png" alt="logo" />
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      href="/about/"
                      className={`nav-link ${currentPath == '/about/' && 'active'
                        }`}
                    >
                     {t('Home')}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Pages
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/appointment/"
                          className={`nav-link ${currentPath == '/appointment/' && 'active'
                            }`}
                        >
                          Онлайн запись
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/departments/"
                          className={`nav-link ${currentPath == '/departments/' && 'active'
                            }`}
                        >
                          Отделения
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/testimonials/"
                          className={`nav-link ${currentPath == '/testimonials/' && 'active'
                            }`}
                        >
                          Пациентам
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/signup/"
                          className={`nav-link ${currentPath == '/sign-up/' && 'active'
                            }`}
                        >
                          Регистрация
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/signin/"
                          className={`nav-link ${currentPath == '/sign-in/' && 'active'
                            }`}
                        >
                          Вход
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/faq/"
                          className={`nav-link ${currentPath == '/faq/' && 'active'
                            }`}
                        >
                          FAQ&apos;s
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/coming-soon/"
                          className={`nav-link ${currentPath == '/coming-soon/' && 'active'
                            }`}
                        >
                          Новинки
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/privacy-policy/"
                          className={`nav-link ${currentPath == '/privacy-policy/' && 'active'
                            }`}
                        >
                          Privacy Policy
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/terms-condition/"
                          className={`nav-link ${currentPath == '/terms-condition/' && 'active'
                            }`}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Услуги
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/services/"
                          className={`nav-link ${currentPath == '/services/' && 'active'
                            }`}
                        >
                          Услуги
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/service-details/"
                          className={`nav-link ${currentPath == '/service-details/' && 'active'
                            }`}
                        >
                          Узнать поподробнее
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Докторы
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/doctors/"
                          className={`nav-link ${currentPath == '/doctors/' && 'active'
                            }`}
                        >
                          Докторы
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/doctors/details/"
                          className={`nav-link ${currentPath == '/doctor-details/' && 'active'
                            }`}
                        >
                          Узнать поподробнее
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      Блоги
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/blog/"
                          className={`nav-link ${currentPath == '/blog/' && 'active'
                            }`}
                        >
                          Блоги
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/blog/details/"
                          className={`nav-link ${currentPath == '/blog-details/' && 'active'
                            }`}
                        >
                          Узнать поподробнее
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/contact"
                      className={`nav-link ${currentPath == '/blog/' && 'active'
                        }`}
                    >
                      Контакты
                    </Link>
                  </li>

                  {GetCookie('userRole') === 'Admin' &&
                    <li className="nav-item">
                      <Link
                        href="/admin"
                        className={`nav-link ${currentPath == '/blog/' && 'active'
                          }`}
                      >
                        Admin
                      </Link>
                    </li>
                  }
                </ul>
              </div>

              <div className="nav-srh">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Search..."
                  />

                  <button className="search-icon icon-search">
                    <i className="icofont-search-1"></i>
                  </button>
                </form>
                <div className="WhatsAppButton">
                  <a href="https://wa.me/996501880688" target="_blank">
                    <img src="/images/wa.png" alt="WhatsApp Button"></img> 
                  </a>
                </div>

              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
