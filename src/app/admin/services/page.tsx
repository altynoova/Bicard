import React from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'

const Services = () => {
  return (
    <div>
      <PageBanner
        pageTitle="Познакомьтесь с нашими квалифицированными врачами"
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Докторы"
        bgImage="page-title-five"
      />

      <div className="doctors-area doctors-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="d-flex justify-content-center mb-5">
              <Link href="/admin/services/create">Добавить сервис</Link>
            </div>
            {/*<DoctorsList doctors={filteredDoctors} />*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services