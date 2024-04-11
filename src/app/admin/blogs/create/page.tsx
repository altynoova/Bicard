'use client'
import React, { useEffect, useState } from 'react'
import useBlogStore from '@/store/useBlogStore'
import { BlogRequestModel } from '@/entities/Blog'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Create = () => {
  const router = useRouter()
  const { CreateBlog } = useBlogStore()

  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [authorId, setAuthorId] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: BlogRequestModel = {
      title,
      text,
      photo,
      authorId 
    }

    const status = await CreateBlog(data)
    console.log("In view ",data)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/Blogs')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }
  return (
    <div>
      <div className="Blog-details-area pb-70">
        <div className="container" style={{ maxWidth: 500 }}>
          <div className="row">
            <div className="Blog-details-item">
              <div className="Blog-details-right">
                <div className="container pb-1 my-5">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Название
                      </label>
                      <input
                        className="form-control"
                        id="name"
                        type="text"
                        placeholder="Имя"
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
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bio">
                        Текст
                      </label>
                      <textarea
                        className="form-control"
                        id="bio"
                        placeholder="Биография"
                        style={{ height: '10rem' }}
                        data-sb-validations="required"
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                      ></textarea>
                      <div
                        className="invalid-feedback"
                        data-sb-feedback="биография:required"
                      >
                        Text is required.
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
