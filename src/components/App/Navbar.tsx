'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useUserStore from '@/store/useUserStore'
import { GetCookie } from '@/libs/cookie'
import { useTranslation } from 'react-i18next'
import { useTranslations } from 'next-intl'

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState('')
  const router = useRouter()
  const user = useUserStore().user
  const t = useTranslations('Navbar');


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
                      href="/services"
                      className={`nav-link ${currentPath == '/services/' && 'active'
                        }`}
                    >
                      {t('Services')}

                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/doctors"
                      className={`nav-link ${currentPath == '/doctors/' && 'active'
                        }`}
                    >
                      {t('Doctors')}

                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/appointment/"
                      className={`nav-link ${currentPath == '/appointment/' && 'active'
                        }`}
                    >
                      {t('Online registration')}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/infos/"
                      className={`nav-link ${currentPath == '/testimonials/' && 'active'
                        }`}
                    >
                      {t('Info')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link dropdown-toggle"
                    >
                      {t('Blogs')}

                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/blog/"
                          className={`nav-link ${currentPath == '/blog/' && 'active'
                            }`}
                        >
                          {t('Blogs')}

                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/article/"
                          className={`nav-link ${currentPath == '/blog/' && 'active'
                            }`}
                        >
                          {t('Articles')}

                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          href="/certificates/"
                          className={`nav-link ${currentPath == '/privacy-policy/' && 'active'
                            }`}
                        >
                          {t('Certificates')}
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/faq"
                      className={`nav-link ${currentPath == '/faq/' && 'active'
                        }`}
                    >
                      {t('FAQ')}

                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/vacancies/"
                      className={`nav-link ${currentPath == '/vacancies/' && 'active'
                        }`}
                    >
                      {t('Vacancies')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/contact"
                      className={`nav-link ${currentPath == '/blog/' && 'active'
                        }`}
                    >
                      {t('Contacts')}

                    </Link>
                  </li>

                  {GetCookie('userRole') === 'ADMIN' &&
                    <li className="nav-item">
                      <Link
                        href="/admin/appointments"
                        className={`nav-link ${currentPath == '/admin/appointments/' && 'active'
                          }`}
                      >
                        {t('Admin')}
                      </Link>
                    </li>
                  }
                  {GetCookie('userRole') === 'DOCTOR' &&
                    <li className="nav-item">
                      <Link
                        href="/doctor/appointments"
                        className={`nav-link ${currentPath == '/admin/appointments/' && 'active'
                          }`}
                      >
                        {t('Doctor')}
                      </Link>
                    </li>
                  }
                </ul>
              </div>
              <div className="WhatsAppButton1">
                <a href="/appointment/" className="appointment-button"><i className="icofont-pencil">{t('Online registration')}</i></a>
              </div>
              <div className="WhatsAppButton">
                <a href="https://wa.me/996501880688" target="_blank">
                  <img src="/images/wa.png" alt="WhatsApp Button"></img>
                </a>
              </div>

            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
