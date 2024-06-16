'use client'
import React, { useEffect, useState } from 'react'
import useBlogStore from '@/store/useBlogStore'
import { BlogRequestModel } from '@/entities/Blog'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { url } from '@/config'
import { useTranslations } from 'next-intl'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentBlog = useBlogStore((state) => state.GetBlog)
  const EditBlog = useBlogStore((state) => state.EditBlog)
  const currentBlog = useBlogStore((state) => state.currentBlog)
  const t = useTranslations('Services')


  const [title, setTitle] = useState<string>('')
  const [id, setId] = useState<number>(0)
  const [text, setText] = useState<string>('')
  const [authorId, setAuthorId] = useState<string>('1')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPath, setPhotoPath] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: BlogRequestModel = {
      id,
      title,
      text,
      authorId,
      photo
    }

    const status = await EditBlog(data, id)
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
    setPhotoPath(response.photoPath)
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
                    {t('Name')}
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
                    <label className="form-label" htmlFor="photo">
                    {t('IMG')}
                    </label>
                    <div style={{margin:20}}>
                      {photo ? (
                        <img src={URL.createObjectURL(photo)} height={400} width={500} alt="New Photo" />
                      ) : (
                        photoPath && <img src={`${url}/TempFileStorage/${photoPath}`} height={400} width={500} alt="Current Photo" />
                      )}
                    </div>
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      placeholder="Фото"
                      data-sb-validations="required"
                      onChange={(event) => setPhoto(event.target.files && event.target.files[0])}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="номерТелефона:required"
                    >
                      Номер телефона is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="text">
                    {t('Description')}
                    </label>
                    <ReactQuill
                      value={text}
                      onChange={setText}
                      style={{ height: '20rem' }}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Text is required"
                    >
                      Text is required.
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
