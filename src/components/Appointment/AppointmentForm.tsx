import React from "react";

const AppointmentFormq = () => {
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
                  <form>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <i className="icofont-business-man-alt-1"></i>
                          <label>Имя</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Введите ваше имя"
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
  );
};

export default AppointmentFormq;
