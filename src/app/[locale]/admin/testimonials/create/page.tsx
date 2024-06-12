'use client'
import React, { useEffect, useState } from 'react'
import useTestimonialStore from '@/store/useTestimonialstore'
import { TestimonialRequestModel } from '@/entities/Testimonials'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const Create = () => {
  const router = useRouter()
  const t = useTranslations('Services')

  const { CreateTestimonial } = useTestimonialStore()

  const [intro, setIntro] = useState<string>('')
  const [id, setId] = useState<number>(0)
  const [numberOfBeds, setNumberOfBeds] = useState<string>('')
  const [numberOfPatients, setNumberOfPatients] = useState<string>('')
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>('')
  const [Photo, setPhoto] = useState<File | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: TestimonialRequestModel = {
      id,
      intro,
      numberOfBeds,
      numberOfPatients,
      numberOfEmployees,
      Photo
    }
    console.log("data", data)
    const status = await CreateTestimonial(data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/testimonials')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  return (
    <div>
      <div className="Testimonial-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="Testimonial-details-item">
              <div className="Testimonial-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>

                    <div className="mb-4">
                      <label className="form-label" htmlFor="name">
                        {t('numberOfBeds')}
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder={t('numberOfBeds')}
                        data-sb-validations="required"
                        value={numberOfBeds}
                        onChange={(event) => setNumberOfBeds(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        numberOfBeds is required.
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="name">
                        {t('numberOfPatients')}
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder={t('numberOfPatients')}
                        data-sb-validations="required"
                        value={numberOfPatients}
                        onChange={(event) => setNumberOfPatients(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        numberOfPatients is required.
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="name">
                        {t('numberOfEmployees')}
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder={t('numberOfEmployees')}
                        data-sb-validations="required"
                        value={numberOfEmployees}
                        onChange={(event) => setNumberOfEmployees(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        numberOfEmployees is required.
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="bio">
                        {t('Intro')}
                      </label>
                      <ReactQuill
                        value={intro}
                        onChange={setIntro}
                        style={{ height: '20rem', paddingBottom: 20 }}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="Описание:required"
                      >
                        Intro is required.
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="name">
                        {t('IMG')}
                      </label>
                      <input
                        className="form-control"
                        id="photo"
                        type="file"
                        placeholder={t('IMG')}
                        data-sb-validations="required"
                        onChange={(event) =>
                          setPhoto(event.target.files && event.target.files[0])
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-grid">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value={t('Save')}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Create
