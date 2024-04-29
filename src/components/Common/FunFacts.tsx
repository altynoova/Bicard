import { useTranslations } from 'next-intl';
import React from 'react'

const FunFacts = () => {
  const t = useTranslations('About');
  return (
    <>
      <div className="counter-area counter-bg counter-area-four">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-patient-bed"></i>
                <h3 className="counter">60</h3>
                <p>{t('Beds')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-people"></i>
                <h3>
                  <span className="counter">25000</span>+
                </h3>
                <p>{t('Patients')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-doctor-alt"></i>
                <h3 className="counter">75</h3>
                <p>{t('Employees')}</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="counter-item">
                <i className="icofont-badge"></i>
                <h3 className="counter">7</h3>
                <p>{t('Years of experience')} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FunFacts
