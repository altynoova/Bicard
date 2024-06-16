'use client'
import React, { useEffect, useState } from 'react'
import useCertificateStore from '@/store/useCertificateStore'
import { CertificateRequestModel } from '@/entities/Certificate'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Create = () => {
  const router = useRouter()
  const t = useTranslations('Services')

  const { CreateCertificate } = useCertificateStore()

  const [Description, setDescription] = useState<string>('')
  const [Photo, setPhoto] = useState<File | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: CertificateRequestModel = {
      Description,
      Photo,
      id: 0
    }

    const status = await CreateCertificate(data)
    if (status === 200) {
      SuccessAlert('Успешно')
      router.push('/admin/certificates')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }
  return (
    <div>
      <div className="Certificate-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="Certificate-details-item">
              <div className="Certificate-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        {t('Description')}
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder={t('Description')}
                        data-sb-validations="required"
                        value={Description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        Description is required.
                      </div>
                    </div>
                    <div className="mb-3">
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
                    <div className="d-grid">
                      <input
                        className="btn btn-primary"
                        type="submit"
                        value={t('Save')}
                      />
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
