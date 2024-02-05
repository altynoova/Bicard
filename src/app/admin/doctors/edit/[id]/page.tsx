'use client'
import React, { useEffect, useState } from 'react'
import useDoctorStore from '@/store/useDoctorStore'
import PageBanner from '@/components/Common/PageBanner'
import { DoctorRequestModel } from '@/entities/Doctor'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'

const Edit = ({ params }: { params: { id: number } }) => {
  const GetCurrentDoctor = useDoctorStore(state => state.GetDoctor)
  const EditDoctor = useDoctorStore((state) => state.EditDoctor)
  const GetUsersByRole = useDoctorStore((state) => state.GetUsersByRole)
  const currentDoctor = useDoctorStore(state => (state.currentDoctor))
  const userReferences = useDoctorStore(state => state.userReferences)

  const [name, setName] = useState<string>(currentDoctor?.name || '')
  const [speciality, setSpeciality] = useState<string>(currentDoctor?.speciality || '')
  const [bio, setBio] = useState<string>(currentDoctor?.bio || '')
  const [education, setEducation] = useState<string>(currentDoctor?.education || '')
  const [experience, setExperience] = useState<string>(currentDoctor?.experience || '')
  const [photo, setPhoto] = useState<File>()
  const [phoneNumber, setPhoneNumber] = useState<string>(currentDoctor?.phoneNumber || '')
  const [email, setEmail] = useState<string>(currentDoctor?.email || '')
  const [address, setAddress] = useState<string>(currentDoctor?.address || '')
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

    const status = await EditDoctor(data, currentDoctor?.id || 0)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
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
      <PageBanner
        pageTitle={currentDoctor?.name || ''}
        homePageUrl="/"
        homePageText="Главная"
        activePageText="Докторы"
        bgImage="page-title-five"
      />
      <div className="doctor-details-area pt-100 pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="doctor-details-item">
              <div className="doctor-details-right">
                <form id="edit-doctor-form" onSubmit={handleSubmit}>
                  <div className="doctor-details-biography">
                    <h3>Имя</h3>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Специальность</h3>

                    <input
                      type="text"
                      name="speciality"
                      className="form-control"
                      placeholder="Speciality"
                      value={speciality}
                      onChange={(event) => setSpeciality(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Биография</h3>

                    <input
                      type="text"
                      name="bio"
                      className="form-control"
                      placeholder="Bio"
                      value={bio}
                      onChange={(event) => setBio(event.target.value)}
                    />

                    <p></p>
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Образование</h3>

                    <input
                      type="text"
                      name="education"
                      className="form-control"
                      placeholder="Education"
                      value={education}
                      onChange={(event) => setEducation(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Опыт</h3>

                    <input
                      type="text"
                      name="experience"
                      className="form-control"
                      placeholder="Experience"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Фото</h3>

                    <input
                      type="file"
                      multiple={false}
                      name="experience"
                      className="form-control"
                      placeholder="Experience"
                      onChange={(event) => setPhoto(event.target.files[0])}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Номер телефона</h3>

                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Email</h3>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>Адрес</h3>

                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>

                  <div className="doctor-details-biography">
                    <h3>User</h3>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(event) => setUserId(+event.target.value)}
                    >
                      {userReferences.map(user => (
                        <option key={user.id} value={user.id}>{user.userName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="doctor-details-biography">
                    <input className="btn btn-primary" type="submit" value={'Сохранить'} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit