'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const CreateService = () => {
  const router = useRouter()
  const t = useTranslations('Services')

  const { CreateMedService } = useMedServicesStore()
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async () => {
    if (files.length < 1) {
      ErrorAlert('Добавьте фотографии!')
      return
    }

    const data = new FormData()
    data.append('name', name)
    data.append('shortDescription', shortDescription)
    data.append('longDescription', longDescription)

    files.forEach((file, index) => {
      data.append(`Files`, file)
    })

    const response = await CreateMedService(data)

    if (response === 200) {
      SuccessAlert('Успешно');
      router.push('/admin/services');
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    if (fileList) {
      setFiles(Array.from(fileList))
    }
  }
  return (
    <div className="d-flex justify-content-center mb-6">
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <h3>{t('Create')}</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {t('Name')}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {t('Short Description')}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {t('Detailed  Description')}
          </label>
          <input
            type="text"
            className="form-control"
            style={{ height: '10rem' }}
            id="exampleInputRole"
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputRole" className="form-label">
            {t('IMG')}
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputRole"
            multiple
            onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          {t('Create')}
        </button>
      </div>
    </div>
  )
}

export default CreateService
