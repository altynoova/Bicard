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
      router.push('/');
    }
    else if (responseStatus === 500) {
      Swal.fire({
        title: 'Error!',
        text: 'Ошибка на стороне сервера',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Проверьте корректность ваших данных',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }
    console.log(responseStatus)
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
                  <h2>Login Here</h2>
                  <p>
                    Didn&apos;t you account yet?{' '}
                    <Link href="/signup">Sign Up Here</Link>
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
                            placeholder="Your Username"
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
                            placeholder="Password"
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
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="forgot-pass">
                            <Link href="#">Forgot Password?</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            Login
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
