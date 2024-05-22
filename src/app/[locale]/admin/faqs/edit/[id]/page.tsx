'use client'
import React, { useEffect, useState } from 'react'
import useFAQStore from '@/store/useFAQStore'
import { FAQRequestModel } from '@/entities/FAQ'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const t = useTranslations('Services')

  const GetCurrentFAQ = useFAQStore((state) => state.GetFAQ)
  const EditFAQ = useFAQStore((state) => state.editFAQ)
  const currentFAQ = useFAQStore((state) => state.currentFAQ)

  const [type, setType] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: FAQRequestModel = {
      type,
      question,
      answer
    }
    const status = await EditFAQ(currentFAQ?.id || 0, data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/faqs')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentFAQ(params.id)
    setType(response.type)
    setQuestion(response.question)
    setAnswer(response.answer)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="FAQ-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="FAQ-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      {t('Type')}
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder={t('Type')}
                      data-sb-validations="required"
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Type is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="bio">
                      {t('Question')}
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      placeholder={t('Question')}
                      style={{ height: '10rem' }}
                      data-sb-validations="required"
                      value={question}
                      onChange={(event) => setQuestion(event.target.value)}
                    ></textarea>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="биография:required"
                    >
                      Question is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      {t('Answer')}
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder={t('Answer')}
                      data-sb-validations="required"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="имя:required"
                    >
                      Answer is required.
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
