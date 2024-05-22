'use client'
import React, { useEffect, useState } from 'react'
import useInfoStore from '@/store/useInfoStore'
import { InfoRequestModel } from '@/entities/Info'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

const Create = () => {
  const router = useRouter()
  const t = useTranslations('Services')

  const { CreateInfo } = useInfoStore()

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: InfoRequestModel = {
      title,
      content
    }
console.log("data", data)
    const status = await CreateInfo(data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/infos')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  return (
    <div>
      <div className="Info-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="Info-details-item">
              <div className="Info-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                        data-sb-feedback="имя:required"
                      >
                        Title is required.
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label" htmlFor="bio">
                        {t('Content')}
                      </label>
                      <ReactQuill
                        value={content}
                        onChange={setContent}
                        style={{ height: '20rem' }}
                      />
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="Описание:required"
                      >
                        Content is required.
                      </div>
                    </div>
                    <div className="mb-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}
export default Create
