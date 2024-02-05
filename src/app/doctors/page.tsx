'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageBanner from '@/components/Common/PageBanner'
import { FetchDoctors } from '@/libs/requests/DoctorRequests'
import useDoctorStore from '@/store/useDoctorStore'
import useUserStore from '@/store/useUserStore'
import SignIn from '../signin/page'


const Doctors = () => {
  const FetchDoctors = useDoctorStore().FetchDoctors
  const doctors = useDoctorStore().doctors
  const currentUser = useUserStore().user

  console.log('current user', currentUser)
  console.log(doctors)

  useEffect(() => {
    FetchDoctors()
  }, [])

  return (
    <div>
      <PageBanner
        pageTitle="Познакомьтесь с нашими квалифицированными врачами"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Докторы"
        bgImage="page-title-five"
      />

      <div className="doctor-search-area">
        <div className="container">
          <form>
            <div className="row doctor-search-wrap">
              <div className="col-sm-6 col-lg-6">
                <div className="doctor-search-item">
                  <div className="form-group">
                    <i className="icofont-doctor-alt"></i>
                    <label>Поиск</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Имя доктора"
                    />
                  </div>
                  <button type="submit" className="btn doctor-search-btn">
                    <i className="icofont-search-1"></i>
                  </button>
                </div>
              </div>

              <div className="col-sm-6 col-lg-6">
                <div className="doctor-search-item">
                  <div className="form-group">
                    <i className="icofont-hospital"></i>
                    <label>Специальность</label>
                    <select className="form-control">
                      <option>Кардиохирург</option>
                      <option>Кардиолог</option>
                      <option>Сосудистый хирург (ангиолог)</option>
                      <option>Кардиолог-аритмолог</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="doctors-area doctors-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-sm-6 col-lg-4">
                <div className="doctor-item">
                  <div className="doctor-top">
                    <Image width={100} height={300} src={`data:image/png;base64, ${doctor.photoBase64}`} alt="Doctor" />

                    <Link href="/appointment">Записаться</Link>
                  </div>
                  <div className="doctor-bottom">
                    <h3>
                      <Link href={`/doctors/details/${doctor.id}`}>{doctor.name}</Link>
                    </h3>
                    <span>{doctor.speciality}</span>
                  </div>
                </div>
              </div>
            ))}
            {currentUser?.roleName === 'admin' ?
              <div className="common-btn"><Link href="/createdoctor">Добавить доктора</Link>
              </div> : <div className="common-btn"><Link href="/createdoctor">Удалить доктора</Link>
              </div>
            }
            {/* <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor2.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Мамбетказиев Н. К</Link>
                  </h3>
                  <span>Кардиохирург</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor3.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Мустафа Унал</Link>
                  </h3>
                  <span>PhD Сердечно-сосудистый хирург</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor4.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Ташмаматов А.Ж</Link>
                  </h3>
                  <span>Кардиохирург</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor5.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Токтогулова А.С</Link>
                  </h3>
                  <span>Врач-кардиолог</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor6.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Юлдашев Г.А</Link>
                  </h3>
                  <span>Врач-кардиологn</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor7.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Касымова Д.У</Link>
                  </h3>
                  <span>Врач-анестезиолог</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor8.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details">Назаров А.К</Link>
                  </h3>
                  <span>Врач-кардиолог</span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <div className="doctor-item">
                <div className="doctor-top">
                  <img src="/images/doctors/doctor9.png" alt="Doctor" />
                  <Link href="/appointment">Записаться</Link>
                </div>
                <div className="doctor-bottom">
                  <h3>
                    <Link href="/doctors/details"> Токтосунова Ж.М</Link>
                  </h3>
                  <span>врач клинической лабораторной диагностики</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
