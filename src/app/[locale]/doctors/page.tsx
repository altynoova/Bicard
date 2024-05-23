'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageBanner from '@/components/Common/PageBanner'
import useDoctorStore from '@/store/useDoctorStore'
import useUserStore from '@/store/useUserStore'
import { useTranslations } from 'next-intl'
import useSpecialityStore from '@/store/useSpecialityStore'
import { url } from '@/config'

const Doctors = () => {
  const FetchDoctors = useDoctorStore().FetchDoctors
  const GetSpecialities = useSpecialityStore().GetSpecialities

  const { doctors } = useDoctorStore()
  const { user } = useUserStore()
  const { Specialities } = useSpecialityStore()

  const [filter, setFilter] = useState('')
  const [selectedSpeciality, setSelectedSpeciality] = useState('') // State to store selected speciality

  const t = useTranslations('Doctors')

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(filter.toLowerCase())
  ).filter((doctor) =>
    // Filter by selected speciality if one is selected
    !selectedSpeciality || doctor.speciality === selectedSpeciality
  )

  useEffect(() => {
    FetchDoctors()
    GetSpecialities()
  }, [])

  const handleSpecialityChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSelectedSpeciality(event.target.value) // Update selected speciality
  }

  return (
    <div>
      <PageBanner
        pageTitle={t('OurDoctors')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Doctors')}
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
                    <label>{t('Search')}</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={t('DoctorsName')}
                      value={filter}
                      onChange={(event) => setFilter(event.target.value)}
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
                    <label>{t('Speciality')}</label>
                    <select
                      className="form-control"
                      value={selectedSpeciality}
                      onChange={handleSpecialityChange} // Handle speciality change
                    >
                      <option value="">{t('AllSpecialities')}</option>
                      {Specialities.map((speciality) => (
                        <option key={speciality} value={speciality}>
                          {speciality}
                        </option>
                      ))}
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
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-sm-6 col-lg-4">
                <div className="doctor-item">
                  <div className="doctor-top">
                  <img width={100} height={300} src={`${url}/TempFileStorage/${doctor.pathToPhoto}`} alt={doctor.name}/>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
