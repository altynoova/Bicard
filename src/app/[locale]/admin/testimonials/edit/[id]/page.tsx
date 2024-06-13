'use client'
import React, { useEffect, useState } from 'react'
import useTestimonialStore from '@/store/useTestimonialstore'
import { TestimonialRequestModel } from '@/entities/Testimonials'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { url } from '@/config'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const t = useTranslations('Services')

  const GetCurrentTestimonial = useTestimonialStore((state) => state.GetTestimonial)
  const EditTestimonial = useTestimonialStore((state) => state.EditTestimonial)
  const currentTestimonial = useTestimonialStore((state) => state.currentTestimonial)

  const [intro, setIntro] = useState<string>('')
  const [id, setId] = useState<number>(0)
  const [numberOfBeds, setNumberOfBeds] = useState<string>('')
  const [numberOfPatients, setNumberOfPatients] = useState<string>('')
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>('')
  const [Photo, setPhoto] = useState<File | null>(null)
  const [photoPath, setPhotoPath] = useState<string>('')

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
    const status = await EditTestimonial(currentTestimonial?.id || 0, data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/testimonials')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentTestimonial(params.id)
    setIntro(response.intro)
    setNumberOfBeds(response.numberOfBeds)
    setNumberOfPatients(response.numberOfPatients)
    setNumberOfEmployees(response.numberOfEmployees)
    setPhotoPath(response.pathToPhoto)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Testimonial-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Testimonial-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                      data-sb-feedback="Title is required"
                    >
                      NumberOfBeds is required.
                    </div>
                  </div>
                  <div className="mb-3">
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
                      data-sb-feedback="Title is required"
                    >
                      numberOfPatients is required.
                    </div>
                  </div>
                  <div className="mb-3">
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
                      data-sb-feedback="Title is required"
                    >
                      numberOfEmployees is required.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="content">
                      {t('Intro')}
                    </label>
                    <ReactQuill
                      value={intro}
                      onChange={setIntro}
                      style={{ height: '20rem' }}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Content is required"
                    >
                      Intro is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="photo">
                      Фото
                    </label>
                    <div style={{ margin: 20 }}>
                      {Photo ? (
                        <img src={URL.createObjectURL(Photo)} height={400} width={500} alt="New Photo" />
                      ) : (
                        photoPath && <img src={`${url}/TempFileStorage/${photoPath}`} height={400} width={500} alt="Current Photo" />
                      )}
                    </div>
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      placeholder="Фото"
                      data-sb-validations="required"
                      onChange={(event) => setPhoto(event.target.files && event.target.files[0])}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="номерТелефона:required"
                    >
                      Номер телефона is required.
                    </div>
                  </div>
                  <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3">
                      <div className="fw-bolder">
                        Form submission successful!
                      </div>
                      <p>To activate this form, sign up at</p>
                      <a href="https://startbootstrap.com/solution/contact-forms">
                        https://startbootstrap.com/solution/contact-forms
                      </a>
                    </div>
                  </div>
                  <div className="d-none" id="submitErrorMessage">
                    <div className="text-center text-danger mb-3">
                      Error sending message!
                    </div>
                  </div>
                  <div className="mb-3">
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
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}

export default Edit
