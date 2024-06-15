'use client'
import React, { useEffect } from 'react'
import PageBanner from '@/components/Common/PageBanner'
import { useTranslations } from 'next-intl';
import useArticleStore from '@/store/useArticleStore';
import useForPatientsStore from '@/store/ForPatients';

const Testimonials = () => {
  const t = useTranslations('Services');
  const Infos = useForPatientsStore().FetchForPatientss
  const { ForPatientss } = useForPatientsStore()
  const filteredInfos = ForPatientss.filter(d => d.title.toLowerCase())
  useEffect(() => {
    Infos()
  }, [])
  return (
    <div>
      <PageBanner
        pageTitle={t('Infos')}
        homePageUrl="/"
        homePageText={t('Home')}
        activePageText={t('Infos')}
        bgImage="page-title-one"
      />

      <div className="privacy-area ptb-100">
        <div className="container">
        {filteredInfos.map((info, index) => (
          <div key={info.id}style={{margin:20}}><h2>{index+1}. {info.title}</h2><div dangerouslySetInnerHTML={{ __html: info.content }}></div></div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
