'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PageBanner from '@/components/Common/PageBanner'
import useDoctorStore from '@/store/useDoctorStore'
import DoctorSearchPanel from '@/components/Admin/Doctor/DoctorSearchPanel'
import DoctorsList from '@/components/Admin/Doctor/DoctorsList'

const Doctors = () => {
  const FetchDoctors = useDoctorStore().FetchDoctors
  const doctors = useDoctorStore().doctors

  const [search, setSearch] = useState<string>('')

  const filteredDoctors = doctors.filter(doctor => doctor?.name?.includes(search) || doctor.name == null)

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

      <DoctorSearchPanel search={search} setSearch={setSearch} />

      <div className="doctors-area doctors-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="d-flex justify-content-center mb-5">
              <Link href="doctors/create">Добавить доктора</Link>
            </div>
            <DoctorsList doctors={filteredDoctors} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors