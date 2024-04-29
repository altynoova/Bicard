import { useTranslations } from 'next-intl';
import React from 'react'

const ContactInfo = () => {
  const t = useTranslations('Contact');
  return (
    <>
      <div className="location-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center location-wrap">
            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-location-pin"></i>
                <h3>{t('Location')}</h3>
                <p>
                  <a href='https://2gis.kg/bishkek/firm/70000001022019440?m=74.604169%2C42.838768%2F16'>
                  Бишкекская Кардиохирургическая Клиника БИКАРД Bicard, 2 улица
                  Тыныстанова, <br /> Bishkek 720020
                  </a>
                </p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-ui-message"></i>
                <h3>{t('Mail')}</h3>
                <p>hello@disin.com</p>
                <p>emailexample@name.com</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-ui-call"></i>
                <h3>{t('Number')} </h3>
                <p>0501 880 688</p>
                <p>0312 880 688</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactInfo
