'use client'
import React, { useEffect, useState } from 'react'
import useCertificateStore from '@/store/useCertificateStore'
import { CertificateRequestModel, Certificate } from '@/entities/Certificate'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { url } from '@/config'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentCertificate = useCertificateStore((state) => state.GetCertificateById)
  const EditCertificate = useCertificateStore((state) => state.EditCertificate)
  const currentCertificate = useCertificateStore((state) => state.currentCertificate)

  const [Description, setDescription] = useState<string>('')
  const [Photo, setPhoto] = useState<File | null>(null)
  const [photoPath, setPhotoPath] = useState<string>('')
  const [id, setId] = useState<number>(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: CertificateRequestModel = {
      id,
      Description,
      Photo
    }

    const status = await EditCertificate(data, id)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/certificates')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response: Certificate = await GetCurrentCertificate(params.id)
    setId(response.id)
    setPhotoPath(response.photoPath)
    setDescription(response.description)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Certificate-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Certificate-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Title
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="title"
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
                  <div className="d-grid">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value={'Сохранить'}
                    />
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
