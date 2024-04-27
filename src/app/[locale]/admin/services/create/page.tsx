'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'

const CreateService = () => {
  const router = useRouter()
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
      SuccessAlert('Аватар обновлен')
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
    <div className="d-flex justify-content-center mb-5">
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <h3>Create med service</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
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
            Short Description
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
            Long Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputRole" className="form-label">
            Files
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
          Создать
        </button>
      </div>
    </div>
  )
}

export default CreateService
