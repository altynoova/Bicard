'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Create = () => {
  const router = useRouter()
  const t = useTranslations('Doctors')
  
  const { CreateDoctor, GetUsersByRole, userReferences } = useDoctorStore()

  const [name, setName] = useState<string>('')
  const [speciality, setSpeciality] = useState<string>('')
  const [education, setEducation] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [userId, setUserId] = useState<number>(0)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors: { [key: string]: string } = {}

    if (!name) validationErrors.name = 'Name is required.'
    if (!speciality) validationErrors.speciality = 'Speciality is required.'
    if (!education) validationErrors.education = 'Education is required.'
    if (!experience) validationErrors.experience = 'Experience is required.'
    if (!photo) validationErrors.photo = 'Photo is required.'

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const data: DoctorRequestModel = {
      name,
      speciality,
      education,
      experience,
      photo,
      userId,
    }

    const status = await CreateDoctor(data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/doctors')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    GetUsersByRole('patient')
  }, [])

  return (
    <div>
      <div className="doctor-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="doctor-details-item">
              <div className="doctor-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                      {t('DoctorsName')}
                      </label>
                      <input
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        type="text"
                        placeholder={t('DoctorsName')}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      {errors.name && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="speciality">
                      {t('Speciality')}
                      </label>
                      <input
                        className={`form-control ${errors.speciality ? 'is-invalid' : ''}`}
                        id="speciality"
                        type="text"
                        placeholder={t('Speciality')}
                        value={speciality}
                        onChange={(event) => setSpeciality(event.target.value)}
                      />
                      {errors.speciality && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.speciality}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="education">
                      {t('Education')}
                      </label>
                      <input
                        className={`form-control ${errors.education ? 'is-invalid' : ''}`}
                        id="education"
                        type="text"
                        placeholder={t('Education')}
                        value={education}
                        onChange={(event) => setEducation(event.target.value)}
                      />
                      {errors.education && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.education}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="experience">
                      {t('Experience')}
                      </label>
                      <input
                        className={`form-control ${errors.experience ? 'is-invalid' : ''}`}
                        id="experience"
                        type="text"
                        placeholder={t('Experience')}
                        value={experience}
                        onChange={(event) => setExperience(event.target.value)}
                      />
                      {errors.experience && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.experience}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="photo">
                      {t('IMG')}
                      </label>
                      <input
                        className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                        id="photo"
                        type="file"
                        placeholder={t('IMG')}
                        onChange={(event) =>
                          setPhoto(event.target.files && event.target.files[0])
                        }
                      />
                      {errors.photo && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.photo}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="users">
                      {t('User')}
                      </label>
                      <select
                        className={`form-select ${errors.userId ? 'is-invalid' : ''}`}
                        id="users"
                        aria-label="Default select example"
                        onChange={(event) => setUserId(+event.target.value)}
                      >
                        <option value={0}>{t('Select user')}</option>
                        {userReferences.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.userName}
                          </option>
                        ))}
                      </select>
                      {errors.userId && (
                        <div className="invalid-feedback" style={{ display: 'block' }}>
                          {errors.userId}
                        </div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                    {t('Save')}
                    </button>
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
