import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import AppointmentForm from '@/components/Appointment/AppointmentForm'

const DoctorsDetails = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Токтосунов Азимбек Нурбековиич (Кардиолог)"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Докторы"
        bgImage="page-title-five"
      />

      <div className="doctor-details-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="doctor-details-item doctor-details-left">
                <img src="/images/doctors/doctor1.png" alt="Doctor" />

                <div className="doctor-details-contact">
                  <h3>Контакты</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-call"></i>
                      Call: +07 554 332 322
                    </li>
                    <li>
                      <i className="icofont-ui-message"></i>
                      hello@disin.com
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      4th Floor, 408 No Chamber
                    </li>
                  </ul>
                </div>

                <div className="doctor-details-work">
                  <h3>Рабочие часы</h3>
                  <div className="appointment-item-two-right">
                    <div className="appointment-item-content">
                      <ul>
                        <li>
                          Monday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Tuesday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Wednesday <span>9:00 AM - 8:00 PM</span>
                        </li>
                        <li>
                          Sunday <span>9:00 AM - 8:00 PM</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="doctor-details-item">
                <div className="doctor-details-right">
                  <div className="doctor-details-biography">
                    <h3>Токтосунов А.Н Кардиолог </h3>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Биография</h3>

                    <p>
                      Придя к нему на прием вы сможете получить: 🩺 Полную
                      консультацию 🩺 Пройти Тредмил тест 🩺 Получить
                      Расшифровку суточного монитора по Холтеру 🩺 Пройти
                      Коронарографию с последующим стентированием 🩺
                      Стационарное наблюдение А также выявить свой диагноз и
                      получить нужную терапию👌
                    </p>

                    <p></p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Образование</h3>
                    <ul>
                      <li>
                        2018 г. — Диплом, «Лечебное дело», Кыргызско-Российский
                        славянский университет, медицинский факультет, Бишкек
                      </li>
                      <li>
                        2021 г. — Ординатура, «Кардиолог», Кыргызский
                        государственный медицинский институт переподготовки и
                        повышения квалификации (КГМИПиПК)
                      </li>
                    </ul>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Опыт</h3>
                    <p>Бикард — Отделение кардиологии, Кардиолог</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-100">
        <AppointmentForm />
      </div>
    </div>
  )
}

export default DoctorsDetails
