'use client'
import React, { useEffect, useState } from 'react'
import useArticleStore from '@/store/useArticleStore'
import { ArticleRequestModel } from '@/entities/Article'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const GetCurrentArticle = useArticleStore((state) => state.GetArticle)
  const EditArticle = useArticleStore((state) => state.EditArticle)
  const currentArticle = useArticleStore((state) => state.currentArticle)

  const [title, setTitle] = useState<string>('');
  const [File, setFile] = useState<File | null>(null);
  const [authorName, setAuthorName] = useState<string>(''); 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: ArticleRequestModel = {
      title,
      File,
      authorName, 
    };


    const status = await EditArticle(data, currentArticle?.id || 0)
    console.log("editactionarticle",data )
    if (status == 200) {
      SuccessAlert('Данные успешно обновлены.')
      router.push('/admin/articles')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentArticle(params.id)
    setTitle(response.title)
    setFile(response.filePath)
    setAuthorName(response.authorName)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <div className="Article-details-area pb-70">
        <div className="container">
          <div className="row">
            <div className="Article-details-right col-md-8 col-12">
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
                      AuthorName
                    </label>
                    <textarea
                      className="form-control"
                      id="bio"
                      placeholder="Text"
                      style={{ height: '10rem' }}
                      data-sb-validations="required"
                      value={authorName}
                      onChange={(event) => setAuthorName(event.target.value)}
                    ></textarea>
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="биография:required"
                    >
                      AuthorName is required.
                    </div>
                    </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="photo">
                      File
                    </label>
                    <embed src={`https://localhost:7120/TempFileStorage/${currentArticle.filePath}#toolbar=0`} className="w-100" height={400} />
                    <input
                      className="form-control"
                      id="photo"
                      type="file"
                      placeholder="Фото"
                      data-sb-validations="required"
                      accept="application/pdf"
                      onChange={(event) =>
                        setFile(event.target.files && event.target.files[0])
                      }
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="номерТелефона:required"
                    >
                      File is required.
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
