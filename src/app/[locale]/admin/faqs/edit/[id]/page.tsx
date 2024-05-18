'use client'
import React, { useEffect, useState } from 'react'
import useVacancyStore from '@/store/useVacancyStore'
import { VacancyRequestModel } from '@/entities/Vacancy'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentVacancy = useVacancyStore((state) => state.GetVacancy)
  const EditVacancy = useVacancyStore((state) => state.EditVacancy)
  const currentVacancy = useVacancyStore((state) => state.currentVacancy)

  const [position, setPosition] = useState<string>('')
  const [requirements, setRequirements] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: VacancyRequestModel = {
      position,
      requirements,
      description
    }
    const status = await EditVacancy(data, currentVacancy?.id || 0)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/vacancies')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentVacancy(params.id)
    setPosition(response.position)
    setRequirements(response.requirements)
    setDescription(response.description)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Vacancy-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Vacancy-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Position
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="title"
                      data-sb-validations="required"
                      value={position}
                      onChange={(event) => setPosition(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Position is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="bio">
                      Requirements
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      placeholder="Text"
                      style={{ height: '10rem' }}
                      data-sb-validations="required"
                      value={requirements}
                      onChange={(event) => setRequirements(event.target.value)}
                    ></textarea>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="биография:required"
                    >
                      Requirements are required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Description
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="title"
                      data-sb-validations="required"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Description is required.
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
