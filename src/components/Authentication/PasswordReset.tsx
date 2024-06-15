'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import useUserStore from '@/store/useUserStore'
import { useRouter } from 'next/navigation';
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'


const PasswordReset = () => {
  const methodReset = useUserStore().Reset
  const router = useRouter()
  const t = useTranslations('Contact');

  const [email, setEmail] = useState<string>('')


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await methodReset(email)
    console.log("response", response)
    if (response.toString() === "200") {
      SuccessAlert('Проверьте свою почту')
      router.push('/reset-password')
    }
    else {
      ErrorAlert('Проверьте корректность ваших данных')
    }
  }
  return (
    <>
      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="login-left">
                <Image
                  width={100}
                  height={100}
                  src="/images/login-bg.jpg"
                  alt="Login"
                />
              </div>
            </div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>{t('Reset')}</h2>
                </div>
                <div className="signup-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('Email')}
                            value={email}
                            onChange={(event) =>
                              setEmail(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            {t('Send')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordReset
