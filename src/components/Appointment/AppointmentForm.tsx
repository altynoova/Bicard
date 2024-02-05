'use client'
import React, { useState } from 'react'
import { MakeAppointment } from '@/libs/requests/AppointmentRequests'
import { Appointment } from '@/entities/Appoinment'

const AppointmentForm = () => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [serviceType, setServiceType] = useState<string>('')
  const [doctorName, setDoctorName] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: Appointment = {
      id: 0,
      name,
      email,
      phoneNumber,
      serviceType,
      doctorName,
      age,
      timeStamp: new Date(Date.now()).toISOString(),
    }

    const result = await MakeAppointment(data)
    console.log(result)
  }

  return (
    <>
      <div className="appointment-area-two ptb-100">
        <div className="container">
          <div className="row align-items-center appointment-wrap-two">
            <div className="col-lg-7">
              <div className="appointment-item appointment-item-two">
                <div className="appointment-shape">
                  <img src="/images/hart-img1.png" alt="Shape" />
                </div>

                <h2>Запишитесь онлайн</h2>
                <span>Мы подтвердим вашу запись в течение 2 часов.</span>

                <div className="appointment-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man-alt-1"></i>
                          <label>Имя</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Введите ваше имя"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-ui-message"></i>
                          <label>Почта</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Введите адрес электронной почты"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-ui-call"></i>
                          <label>Номер</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Введите свой номер"
                            value={phoneNumber}
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-hospital"></i>
                          <label>Услуги</label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            // value={name}
                            onChange={(event) =>
                              setServiceType(event.target.value)
                            }
                          >
                            <option>Выберите услугу</option>
                            <option>Кардиология</option>
                            <option>Микрохирургия</option>
                            <option>Хирургия</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-doctor"></i>
                          <label>Доктор</label>
                          <select
                            className="form-control"
                            id="exampleFormControlSelect2"
                            // value={name}
                            onChange={(event) =>
                              setDoctorName(event.target.value)
                            }
                          >
                            <option>Выберите своего врача</option>
                            <option>Назаров Асан Кубанычбекович</option>
                            <option>Ташмаматов Адиашим Жаныбаевич</option>
                            <option>Токтогулова Аида Сабыржанова</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man"></i>
                          <label>Возраст</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ваш возраст"
                            value={age}
                            onChange={(event) => setAge(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn appointment-btn">
                        Отправить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="appointment-item-two-right">
                <div className="appointment-item-content">
                  <h2>Часы работы</h2>
                  <ul>
                    <li>
                      Понедельник <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li>
                      Вторние <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li>
                      Среда <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li>
                      Четверг <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li>
                      Пятница <span>9:00 AM - 8:00 PM</span>
                    </li>
                    <li>
                      Суббота <span>9:00 AM - 5:00 PM</span>
                    </li>
                    <li>
                      Воскресенье <span>9:00 AM - 5:00 PM</span>
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

export default AppointmentForm
