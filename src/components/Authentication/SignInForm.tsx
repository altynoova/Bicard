'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserLogin } from '@/entities/User'
import { Login } from '@/libs/requests/AuthRequests'
import { SetCookie } from '@/libs/cookie'
import useUserStore from '@/store/useUserStore'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation';
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useTranslations } from 'next-intl'


const SignInForm = () => {
  const router = useRouter();
  const methodSignIn = useUserStore().SignIn
  const t = useTranslations('Contact');

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: UserLogin = {
      userName: username,
      password,
    }

    console.log(data)

    const response = await methodSignIn(data)

    if (response.status === 200 && response.data.roleName !== 'admin') {
      SuccessAlert('Вы вошли в свой аккаунт!')
      router.push('/about');
    } else if (response.status === 200 && response.data.roleName === 'admin') {
      SuccessAlert('Поздравляем. Вы админ!')
      router.push('/admin/appointments');
    }
    else if (response.status === 500) {
      ErrorAlert('Ошибка на стороне сервера')
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
                  <h2>{t('Login')}</h2>
                  <p>
                    {t('Have you registered yet')}
                    {' '}
                    <Link href="/signup">{t('Register here')}</Link>
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
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t('Your login')}
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={t('Password')}
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                      </div>
                      {/*<div className="col-lg-6">*/}
                      {/*  <div className="form-group">*/}
                      {/*    <input*/}
                      {/*      type="password"*/}
                      {/*      className="form-control"*/}
                      {/*      placeholder="Confirm Password"*/}
                      {/*    />*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                              defaultChecked={false}
                              onChange={toggleRememberMe}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="gridCheck"
                            >
                              {t('Remember me')}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="forgot-pass">
                            <Link href="/passwordreset">{t('Forgot your password?')}</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            {t('Login')}
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

export default SignInForm
