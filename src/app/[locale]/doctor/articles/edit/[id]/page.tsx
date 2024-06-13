'use client'
import React, { useEffect, useState } from 'react'
import useArticleStore from '@/store/useArticleStore'
import { ArticleRequestModel } from '@/entities/Article'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { url } from '@/config'

const Edit = ({ params }: { params: { id: number } }) => {
  const router = useRouter()
  const t = useTranslations('Services')

  const GetCurrentArticle = useArticleStore((state) => state.GetArticle)
  const EditArticle = useArticleStore((state) => state.EditArticle)
  const currentArticle = useArticleStore((state) => state.currentArticle)

  const [title, setTitle] = useState<string>('');
  const [File, setFile] = useState<File | null>(null);
  const [FilePath, setFilePath] = useState<File | null>(null);
  const [authorName, setAuthorName] = useState<string>('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!File) {
      SuccessAlert('File is required.');
    }
    const data: ArticleRequestModel = {
      title,
      File,
      authorName,
    };


    const status = await EditArticle(currentArticle?.id || 0, data)
    console.log("editactionarticle", data)
    if (status == 200) {
      SuccessAlert('Успешно')
      router.push('/admin/articles')
    } else {
      ErrorAlert('Произошла ошибка!')
    }
  }

  async function init() {
    const response = await GetCurrentArticle(params.id)
    setTitle(response.title)
    setFilePath(response.filePath)
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
                      {t('Title')}
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
                    <label className="form-label" htmlFor="author">
                      {t('Author')}
                    </label>
                    <input
                      className="form-control"
                      id="author"
                      type="text"
                      placeholder="title"
                      data-sb-validations="required"
                      value={authorName}
                      onChange={(event) => setAuthorName(event.target.value)}
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="Author is required"
                    >
                      Author is required.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="file">
                      {t('File')}
                    </label>
                    <div style={{margin:20}}>
                      {File ? (
                        <embed src={URL.createObjectURL(File)+ `#toolbar=0`} className="w-100" height={400}  />
                      ) : (
                        FilePath && <embed src={`${url}/TempFileStorage/${FilePath}#toolbar=0`} className="w-100" height={400} />
                      )}
                    </div>
                    <input
                      className="form-control"
                      id="file"
                      type="file"
                      placeholder="file"
                      data-sb-validations="required"
                      accept="application/pdf"
                      onChange={(event) =>
                        setFile(event.target.files && event.target.files[0])
                      }
                    />
                    <div
                      className="invalid-feedback"
                      data-sb-feedback="file:required"
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
function setError(arg0: string) {
  throw new Error('Function not implemented.')
}

