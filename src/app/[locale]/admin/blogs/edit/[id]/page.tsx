'use client'
import React, { useEffect, useState } from 'react'
import useBlogStore from '@/store/useBlogStore'
import { BlogRequestModel } from '@/entities/Blog'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentBlog = useBlogStore((state) => state.GetBlog)
  const EditBlog = useBlogStore((state) => state.EditBlog)
  const currentBlog = useBlogStore((state) => state.currentBlog)

  const [title, setTitle] = useState<string>(currentBlog?.title || '')
  const [id, setId] = useState<number>(currentBlog?.id || 0)
  const [text, setText] = useState<string>(
    currentBlog?.text || ''
  )
  const [authorId, setAuthorId] = useState<string>(currentBlog?.authorId || '1')
  const [photo, setPhoto] = useState<File | null>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: BlogRequestModel = {
      id,
      title,
      text,
      authorId,
      photo
    }

    const status = await EditBlog(data, currentBlog?.id || 0)
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/blogs')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentBlog(params.id)
    setId(response.id)
    setTitle(response.title)
    setText(response.text)
    setAuthorId(response.authorId)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Blog-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Blog-details-right col-md-8 col-12">
              <div className="container pb-1 mb-5">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="name">
                      Title
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="title"
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
                      Text
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      placeholder="Text"
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
                    <div>
                      <img
                        src={`data:image/png;base64, ${currentBlog.photoPath}`} height={400} width={500}
                        alt=""
                      />
                    </div>
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
