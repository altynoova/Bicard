'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import PageBanner from '@/components/Common/PageBanner'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentDoctor = useDoctorStore((state) => state.GetDoctor)
  const EditDoctor = useDoctorStore((state) => state.EditDoctor)
  const GetUsersByRole = useDoctorStore((state) => state.GetUsersByRole)
  const currentDoctor = useDoctorStore((state) => state.currentDoctor)

  const [name, setName] = useState<string>(currentDoctor?.name || '')
  const [speciality, setSpeciality] = useState<string>(
    currentDoctor?.speciality || ''
  )
  const [bio, setBio] = useState<string>(currentDoctor?.bio || '')
  const [education, setEducation] = useState<string>(
    currentDoctor?.education || ''
  )
  const [experience, setExperience] = useState<string>(
    currentDoctor?.experience || ''
  )
  const [photo, setPhoto] = useState<File | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentDoctor?.phoneNumber || ''
  )
  const [email, setEmail] = useState<string>(currentDoctor?.email || '')
  const [address, setAddress] = useState<string>(currentDoctor?.address || '')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: DoctorRequestModel = {
      name,
      speciality,
      bio,
      education,
      experience,
      photo,
      phoneNumber,
      email,
      address,
      userId: currentDoctor.userId,
    }

    const status = await EditDoctor(data, currentDoctor?.id || 0)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
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
    setBio(response.bio)
    setEducation(response.education)
    setExperience(response.experience)
    setPhoneNumber(response.phoneNumber)
    setEmail(response.email)
    setAddress(response.address)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="doctor-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 d-flex justify-content-center mb-3">
              <div className="image">
                <img
                  src={`data:image/png;base64, ${currentDoctor.photoBase64}`}
                  alt=""
                />
              </div>
            </div>
            <div className="doctor-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Имя
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Имя"
                      data-sb-validations="required"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Имя is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="speciality">
                      Специальность
                    </label>
                    <input
                      className="form-control"
                      id="speciality"
                      type="text"
                      placeholder="Специальность"
                      data-sb-validations="required"
                      value={speciality}
                      onChange={(event) => setSpeciality(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="специальность:required"
                    >
                      Специальность is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="bio">
                      Биография
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      placeholder="Биография"
                      style={{ height: '10rem' }}
                      data-sb-validations="required"
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                    ></textarea>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="биография:required"
                    >
                      Биография is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="education">
                      Образование
                    </label>
                    <input
                      className="form-control"
                      id="education"
                      type="text"
                      placeholder="Образование"
                      data-sb-validations="required"
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="образование:required"
                    >
                      Образование is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="experience">
                      Опыт
                    </label>
                    <input
                      className="form-control"
                      id="experience"
                      type="text"
                      placeholder="Опыт"
                      data-sb-validations="required"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="опыт:required"
                    >
                      Опыт is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="photo">
                      Фото
                    </label>
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      placeholder="Фото"
                      data-sb-validations="required"
                      onChange={(event) =>
                        setPhoto(event.target.files && event.target.files[0])
                      }
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="номерТелефона:required"
                    >
                      Номер телефона is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="phoneNumber">
                      Номер телефона
                    </label>
                    <input
                      className="form-control"
                      id="phoneNumber"
                      type="text"
                      placeholder="Номер телефона"
                      data-sb-validations="required"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="номерТелефона:required"
                    >
                      Номер телефона is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Email"
                      data-sb-validations="required,email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="email:required"
                    >
                      Email is required.
                    </div>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="email:email"
                    >
                      Email Email is not valid.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="address">
                      Адрес
                    </label>
                    <input
                      className="form-control"
                      id="address"
                      type="text"
                      placeholder="Адрес"
                      data-sb-validations="required"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="адрес:required"
                    >
                      Адрес is required.
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
