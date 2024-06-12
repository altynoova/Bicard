'use client'
import React, { useEffect, useState } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';
import useVacancyStore from '@/store/useVacancyStore';
import { Button } from '@mui/material';
import { Vacancy } from '@/entities/Vacancy';
import ApplicationModal from '@/components/Appointment/ApplicationModal';

const PrivacyPolicy = () => {
  const t = useTranslations('Blogs');
  const FetchVacancies = useVacancyStore().FetchVacancies
  const { Vacancies } = useVacancyStore()
  const [showModal, setShowModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  useEffect(() => {
    FetchVacancies()
  }, [])

  const handleShowModal = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVacancy(null);
  }

  return (
    <div>
      <PageBanner
        pageTitle={t('Vacancies')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Vacancies')}
        bgImage="page-title-one"
      />
      <div className="blog-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center"></div>
          <h2>{t('Vacancies')}</h2>
          <p>{t('VacanciesWeNeed')}</p>
          {Vacancies.map((vacancy) => (
            <div className="col-md-6 col-lg-8" key={vacancy.id}>
              <div className="vacancy-card">
                <div className="vacancy-card-header">
                  <h4>{vacancy.position}</h4>
                </div>
                <div className="vacancy-card-content">
                  <p><strong>{t('Requirements:')}  </strong> {vacancy.requirements}</p>
                  <p><strong>{t('Description:')}  </strong> {vacancy.description}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
                  <p><strong>{t('Date')}</strong></p>
                  <div>
                    {new Date(vacancy.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </div>
                  <Button variant="contained" color="primary" onClick={() => handleShowModal(vacancy)}>
                    {t('Apply')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedVacancy && (
          <ApplicationModal show={showModal} handleClose={handleCloseModal} vacancy={selectedVacancy} />
        )}
      </div>
    </div>
  )
}

export default PrivacyPolicy;
