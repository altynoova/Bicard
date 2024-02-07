'use client'
import React, { useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'

const CreateService = () => {
  const { CreateMedService } = useMedServicesStore()
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')

  const handleCreate = async () => {
    const response = await CreateMedService({ name, shortDescription, longDescription })

    if (response === 200) {
      SuccessAlert('Роль успешно создана')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  return (
    <div className="d-flex justify-content-center mb-5">
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <h3>Create med service</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Short Description</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Long Description</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={longDescription}
            onChange={(event) => setLongDescription(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleCreate}>Создать</button>
      </div>
    </div>
  )
}

export default CreateService