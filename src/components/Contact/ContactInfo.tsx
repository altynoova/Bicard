import React from 'react'

const ContactInfo = () => {
  return (
    <>
      <div className="location-area pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center location-wrap">
            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-location-pin"></i>
                <h3>Локация</h3>
                <p>
                  Бишкекская Кардиохирургическая Клиника БИКАРД Bicard, 2 улица
                  Тыныстанова, <br /> Bishkek 720020
                </p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-ui-message"></i>
                <h3>Почта</h3>
                <p>hello@disin.com</p>
                <p>emailexample@name.com</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="location-item">
                <i className="icofont-ui-call"></i>
                <h3>Номер </h3>
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
