'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Create = () => {
  const router = useRouter()
  const { CreateDoctor, GetUsersByRole, userReferences } = useDoctorStore()

  const [name, setName] = useState<string>('')
  const [speciality, setSpeciality] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [education, setEducation] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [userId, setUserId] = useState<number>(0)

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
      userId,
    }

    const status = await CreateDoctor(data)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/doctors')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  useEffect(() => {
    GetUsersByRole('Doctor')
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
                    <div className="mb-3">
                      <label className="form-label" htmlFor="users">
                        Пользователь
                      </label>

                      <select
                        id="users"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(event) => setUserId(+event.target.value)}
                      >
                        {userReferences.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.userName}
                          </option>
                        ))}
                      </select>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
