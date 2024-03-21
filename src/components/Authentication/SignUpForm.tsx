'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { UserRegister } from '@/entities/User'
import { Register } from '@/libs/requests/AuthRequests'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const router = useRouter()
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
                  <h2>Зарегистрируйтесь здесь</h2>
                  <p>
                  Уже есть аккаунт? <Link href="/signin">Войти</Link>
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
                            placeholder="Имя пользователя"
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
                            placeholder="Ваш адрес электронной почты"
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
                            placeholder="Пароль"
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
                            placeholder="Подтвердите пароль"
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
                          Пароли не совпадают
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
                              Да, я согласен{' '}
                              <Link href="/terms-condition">
                              Условия использования
                              </Link>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            Sign Up
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
