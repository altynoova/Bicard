'use client'
import React, { useEffect } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';
import useVacancyStore from '@/store/useVacancyStore';

const PrivacyPolicy = () => {
  const t = useTranslations('Blogs');
  const FetchVacancies = useVacancyStore().FetchVacancies
  const { Vacancies } = useVacancyStore()
  useEffect(() => {
    FetchVacancies()
  }, [])
  return (
    <div>
      <PageBanner
        pageTitle="Privacy Policy"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Privacy Policy"
        bgImage="page-title-one"
      />
      <div className="blog-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center"></div>
          <h2>{t('Vacancies')}</h2>
          <p>{t('VacanciesWeNeed')}</p>
          {Vacancies.map((vacancy) => (
            <div className="col-md-6 col-lg-8">
              <div className="vacancy-card">
                <div className="vacancy-card-header">
                  <h4>{vacancy.position} </h4>
                </div>
                <div className="vacancy-card-content">
                  <p><strong>{t('Requirements:')}  </strong> {vacancy.requirements}</p>
                  <p><strong> {t('Description:')}  </strong> {vacancy.description}</p>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', margin:20 }}>
                  <p><strong>{t('Date')} </strong></p>
                  <div>
                    {new Date(vacancy.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
