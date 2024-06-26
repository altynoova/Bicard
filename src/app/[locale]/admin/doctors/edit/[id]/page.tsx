'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useTranslations } from 'next-intl'
import { url } from '@/config'


const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const t = useTranslations('Doctors')

  const GetCurrentDoctor = useDoctorStore((state) => state.GetDoctor)
  const EditDoctor = useDoctorStore((state) => state.EditDoctor)
  const GetUsersByRole = useDoctorStore((state) => state.GetUsersByRole)
  const currentDoctor = useDoctorStore((state) => state.currentDoctor)

  const [name, setName] = useState<string>(currentDoctor?.name || '')
  const [speciality, setSpeciality] = useState<string>(
    currentDoctor?.speciality || ''
  )
  const [education, setEducation] = useState<string>(
    currentDoctor?.education || ''
  )
  const [experience, setExperience] = useState<string>(
    currentDoctor?.experience || ''
  )
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPath, setPhotoPath] = useState<string>('')
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: DoctorRequestModel = {
      name,
      speciality,
      education,
      experience,
      photo,
      userId: currentDoctor.userId,
    }

    const status = await EditDoctor(data, currentDoctor?.id || 0)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/doctors')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentDoctor(params.id)
    GetUsersByRole('Doctor')
    setName(response.name)
    setSpeciality(response.speciality)
    setPhotoPath(response.pathToPhoto)
    setEducation(response.education)
    setExperience(response.experience)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="doctor-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="doctor-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      {t('DoctorsName')}
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder={t('DoctorsName')}
                      data-sb-validations="required"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Name is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="speciality">
                      {t('Speciality')}
                    </label>
                    <input
                      className="form-control"
                      id="speciality"
                      type="text"
                      placeholder={t('Speciality')}
                      data-sb-validations="required"
                      value={speciality}
                      onChange={(event) => setSpeciality(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="специальность:required"
                    >
                      Speciality is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="education">
                      {t('Education')}
                    </label>
                    <input
                      className="form-control"
                      id="education"
                      type="text"
                      placeholder={t('Education')}
                      data-sb-validations="required"
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="образование:required"
                    >
                      Education is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="experience">
                      {t('Experience')}
                    </label>
                    <input
                      className="form-control"
                      id="experience"
                      type="text"
                      placeholder={t('Experience')}
                      data-sb-validations="required"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="опыт:required"
                    >
                      Experience is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="photo">
                      {t('IMG')}
                    </label>
                    <div style={{ margin: 20 }}>
                      {photo ? (
                        <img src={URL.createObjectURL(photo)} height={400} width={500} alt="New Photo" />
                      ) : (
                        photoPath && <img src={`${url}/TempFileStorage/${photoPath}`} height={400} width={500} alt="Current Photo" />
                      )}
                    </div>
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      placeholder={t('IMG')}
                      data-sb-validations="required"
                      onChange={(event) => setPhoto(event.target.files && event.target.files[0])}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Photo is required"
                    >
                      Photo is required.
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
                      value={t('Save')}
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
