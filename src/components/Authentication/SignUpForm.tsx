'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { UserRegister } from '@/entities/User'
import { Register } from '@/libs/requests/AuthRequests'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const SignUpForm = () => {
  const router = useRouter()
  const t = useTranslations('Contact');
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')


  const isPasswordValid = () => password === passwordConfirm

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isPasswordValid()) {
      ErrorAlert("Пароли не совпадают")
      return
    }

    const data: UserRegister = {
      userName: username,
      email,
      password,
    }

    const response = await Register(data)
    if (response.status === 200) {
      SuccessAlert('Вы успешно зарегистрировались.')
      router.push('/signin')
    } else if (response.status === 400) {
      ErrorAlert('Неверные данные!')
    } else {
      ErrorAlert('Неизвестная ошибка.')
    }
  }

  return (
    <>
      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="signup-left">
                <img src="/images/signup-bg.jpg" alt="SignUp" />
              </div>
            </div>

            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>{t('Register here')}</h2>
                  <p>
                  {t('Already have an account?')}
                  <Link href="/signin">{t('Login')}</Link>
                  </p>
                </div>

                <div className="signup-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {/*<div className="col-lg-6">*/}
                      {/*  <div className="form-group">*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="First Name"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      {/*<div className="col-lg-6">*/}
                      {/*  <div className="form-group">*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="Last Name"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      {/*<div className="col-lg-6">*/}
                      {/*  <div className="form-group">*/}
                      {/*    <input*/}
                      {/*      type="text"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="Phone Number"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('Name')}
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder={t('Mail')}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

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
                            value={passwordConfirm}
                            onChange={(event) =>
                              setPasswordConfirm(event.target.value)
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
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridCheck"
                            >
                              {t('Yes, I agree')}{' '}
                              <Link href="/terms-condition">
                              {t('Terms of Use')}
                              </Link>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                          {t('Sign Up')} 
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

export default SignUpForm
