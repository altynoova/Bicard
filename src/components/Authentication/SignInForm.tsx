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


const SignInForm = () => {
  const router = useRouter();
  const methodSignIn = useUserStore().SignIn

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rememberMe, setRememeberMe] = useState<boolean>(false)

  const toggleRememberMe = () => {
    setRememeberMe((prev) => !prev)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: UserLogin = {
      userName: username,
      password,
      rememberMe,
    }

    console.log(data)

    const responseStatus = await methodSignIn(data)

    if (responseStatus === 200) {
      SuccessAlert('Вы вошли в свой аккаунт!')
      router.push('/about');
    }
    else if (responseStatus === 500) {
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
                  <h2>Войти</h2>
                  <p>
                   Вы еще не зарегистрировались?{' '}
                    <Link href="/signup">Зарегистрируйтесь здесь</Link>
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
                            placeholder="Ваш логин"
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
                            placeholder="Пароль"
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
                             Запомнить меня
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="forgot-pass">
                            <Link href="#">Забыли пароль?</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                          Войти
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
