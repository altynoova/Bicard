'use client'
import React, { useEffect, useState } from 'react'
import useFAQsStore from '@/store/useFAQStore'
import { FAQRequestModel } from '@/entities/FAQ'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Create = () => {
  const router = useRouter()
  const { createFAQ} = useFAQsStore()

  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [type, setType] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: FAQRequestModel = {
      question,
      answer,
      type
    }

    const status = await createFAQ(data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/vacancies')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }
  return (
    <div>
      <div className="FAQs-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="FAQs-details-item">
              <div className="FAQs-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Question
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Имя"
                        data-sb-validations="required"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        Question is required.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Question
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Имя"
                        data-sb-validations="required"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="имя:required"
                      >
                        Question is required.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bio">
                        Answer
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        placeholder="Описание"
                        style={{ height: '10rem' }}
                        data-sb-validations="required"
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                      ></textarea>
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="Описание:required"
                      >
                        Requirements are required.
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
          </div>
        </div>
      </div>
    </div>
  )
}
export default Create
