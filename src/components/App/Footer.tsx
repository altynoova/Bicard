'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import useFeedbackStore from '@/store/useFeedbackStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const methodFeedbackCreate = useFeedbackStore().CreateFeedback
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const feedbackData = {
      phone,
      message
    };

    const responseStatus = await methodFeedbackCreate(feedbackData);
    if (responseStatus === 200) {
      SuccessAlert('Успешно!')
      setPhone('');
      setMessage('');
    }
    else if (responseStatus === 500) {
      ErrorAlert('Ошибка на стороне сервера')
    }
    else {
      ErrorAlert('Ошибка')
    }
  }
  return (
    <>
      <footer className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="footer-item">
                <div className="footer-contact pe-2">
                  <h3>Напишите нам</h3>
                  <ul>
                    <li>
                      <i className="icofont-ui-message"></i>
                      <a href="mailto:info@disin.com">supportbicard@gmail.com</a>
                    </li>
                    <li>
                      <i className="icofont-stock-mobile"></i>
                      <a href="tel:++996559860688">+996 559 860 688</a>
                      <a href="tel:+996776680688">+996 776 680 688</a>
                    </li>
                    <li>
                      <i className="icofont-location-pin"></i>
                      улица Тыныстанова2, г. Бишкек
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-2">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>Быстрые ссылки</h3>
                  <ul>
                    <li>
                      <Link href="/about">О нас </Link>
                    </li>
                    <li>
                      <Link href="/blog">Блоги </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Онлайн запись</Link>
                    </li>
                    <li>
                      <Link href="/faq">Часто задаваемые вопросы</Link>
                    </li>
                    <li>
                      <Link href="/doctors">Докторы</Link>
                    </li>
                    <li>
                      <Link href="/contact">Контакты</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>Услуги</h3>
                  <ul>
                    <li>
                      <Link href="/service-details">Диагностика</Link>
                    </li>
                    <li>
                      <Link href="/service-details">Поликлиника</Link>
                    </li>
                    <li>
                      <Link href="/service-details">Стационарное лечение</Link>
                    </li>
                    <li>
                      <Link href="/service-details">Реанимация</Link>
                    </li>
                    <li>
                      <Link href="/service-details">Операционный блок</Link>
                    </li>
                    <li>
                      <Link href="/service-details">Высокотехнологическая лаборатория</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-feedback">
                  <h3>Отзывы</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Имя"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Номер"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="your_message"
                        rows={3}
                        placeholder="Сообщение"
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="text-left">
                      <button type="submit" className="btn feedback-btn">
                        Отправить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-item">
            <p>
              Copyright &copy; {currentYear} Design & Developed by {'ManasBM'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
