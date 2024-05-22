'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useFeedbackStore from '@/store/useFeedbackStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'
import { GetCookie } from '@/libs/cookie'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const methodFeedbackCreate = useFeedbackStore().CreateFeedback
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const t = useTranslations('Contact');
  const zzz = useMedServicesStore().GetAllSubMedServices
  const { allSubMedServices } = useMedServicesStore()
  const router = useRouter()

  const signed = GetCookie('Bicard-Web-API-Access-Token')


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const feedbackData = {
      phone,
      message
    };
    if (!signed) {
      router.push('/signin');
    }
    const responseStatus = await methodFeedbackCreate(feedbackData);

    console.log("responseStatus", responseStatus)
    if (responseStatus === 200) {
      SuccessAlert('Успешно!')
      setPhone('');
      setMessage('');
    }
    else {
      router.push('/signin');
    }
    useEffect(() => {
      zzz()
    }, [])
  }
  return (
    <>
      <footer className="pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="footer-item">
                <div className="footer-contact pe-2">
                  <h3>{t('Write to us')}</h3>
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
                  <h3>{t('Quick links')}</h3>
                  <ul>
                    <li>
                      <Link href="/about">{t('AboutUs')}</Link>
                    </li>
                    <li>
                      <Link href="/blog">{t('Blogs')}</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">{t('Online registration')}</Link>
                    </li>
                    <li>
                      <Link href="/faq">{t('FAQ')}</Link>
                    </li>
                    <li>
                      <Link href="/doctors">{t('Doctors')}</Link>
                    </li>
                    <li>
                      <Link href="/contact">{t('Contacts')}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-quick">
                  <h3>{t('Services')}</h3>
                  <ul>
                    {allSubMedServices.map((subservice) => (
                      <li>
                        <Link href="/service-details">{subservice.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="footer-item">
                <div className="footer-feedback">
                  <h3>{t('Feedbacks')}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('Name')}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={t('Number')}
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
                        placeholder={t('Message')}
                        value={message}
                        onChange={(event) =>
                          setMessage(event.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="text-left">
                      <button type="submit" className="btn feedback-btn">
                        {t('Send')}
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
