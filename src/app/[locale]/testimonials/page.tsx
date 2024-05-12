'use client'
import React, { useEffect } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';
import useArticleStore from '@/store/useArticleStore';
import useForPatientsStore from '@/store/ForPatients';

const testimonials = () => {
  const t = useTranslations('Blogs');
  const Infos = useForPatientsStore().FetchForPatientss
  const { ForPatientss } = useForPatientsStore()
  const filteredInfos = ForPatientss.filter(d => d.title.toLowerCase())
  useEffect(() => {
    Infos()
  }, [])
  return (
    <div>
      <PageBanner
        pageTitle="Privacy Policy"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Privacy Policy"
        bgImage="page-title-one"
      />

      <div className="privacy-area ptb-100">
        <div className="container">
        {filteredInfos.map((info) => (
          <><h2>{info.id} {info.title}</h2><div dangerouslySetInnerHTML={{ __html: info.content }}></div></>
        ))}
        </div>
      </div>
    </div>
  )
}

export default testimonials
