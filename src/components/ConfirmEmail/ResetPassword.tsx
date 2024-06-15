'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { NewPassword, UserRegister } from '@/entities/User'
import { Register, ResetPassword } from '@/libs/requests/AuthRequests'
import Link from 'next/link'

const ConfirmEmail = () => {
  const searchParams = useSearchParams()
  const userEmail = searchParams.get('email') || ''
  const tokenn = searchParams.get('token') || ''
  const router = useRouter()
  const t = useTranslations('Contact');
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')


  const isPasswordValid = () => password === confirmPassword

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isPasswordValid()) {
      ErrorAlert("Пароли не совпадают")
      return
    }

    const data: NewPassword = {
      email: userEmail,
      token: tokenn,
      password,
      confirmPassword
    }
    console.log("data", data)
    const response = await ResetPassword(data)
    console.log("response", response)
    if (response.status === 200) {
      SuccessAlert('Успешно')
      router.push('/signin')
    } else if (response.status === 400) {
      ErrorAlert('Неверные данные!')
    } else {
      ErrorAlert('Неизвестная ошибка.')
    }

  }
  return (
    <div className="signup-area ptb-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 ptb-100">
            <div className="signup-item">
              <div className="signup-head">
                <h2>{t('Create new password')}</h2>
              </div>

              <div className="signup-form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder={t('Password')}
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          style={{
                            borderColor: !isPasswordValid() ? 'red' : 'gray',
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder={t('Confirm the password')}
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          style={{
                            borderColor: !isPasswordValid() ? 'red' : 'gray',
                          }}
                        />
                      </div>
                    </div>

                    {!isPasswordValid() ? (
                      <span style={{ color: 'red', marginBottom: '20px' }}>
                        {t('Password mismatch')}
                      </span>
                    ) : null}

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
  )
}

export default ConfirmEmail
