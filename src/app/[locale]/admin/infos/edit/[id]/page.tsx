'use client'
import React, { useEffect, useState } from 'react'
import useInfoStore from '@/store/useInfoStore'
import { InfoRequestModel } from '@/entities/Info'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const t = useTranslations('Services')

  const GetCurrentInfo = useInfoStore((state) => state.GetInfo)
  const EditInfo = useInfoStore((state) => state.EditInfo)
  const currentInfo = useInfoStore((state) => state.currentInfo)

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: InfoRequestModel = {
      title,
      content,
    }
    const status = await EditInfo(currentInfo?.id || 0, data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/infos')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentInfo(params.id)
    setTitle(response.title)
    setContent(response.content)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Info-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Info-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      {t('Title')}
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder={t('Title')}
                      data-sb-validations="required"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Title is required"
                    >
                      Title is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="content">
                      {t('Content')}
                    </label>
                    <ReactQuill
                      value={content}
                      onChange={setContent}
                      style={{ height: '20rem' }}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Content is required"
                    >
                      Content is required.
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
                  <div className="mb-3">
                    <div className="d-grid">
                      <input
                        className="btn btn-primary"
                        type="submit"
                        value={t('Save')}
                      />
                    </div>
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
