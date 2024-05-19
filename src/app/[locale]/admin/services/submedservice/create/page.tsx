'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'
import { MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

const CreateService = () => {
  const router = useRouter()
  const {
    GetListOfMedServices,
    CreateSubMedService,
    medServices,
  } = useMedServicesStore()

  const [medServiceId, setMedServiceId] = useState<number>(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0')

  const handleCreate = async () => {
    if (medServiceId == null) {
      return
    }

    const response = await CreateSubMedService({
      name,
      price,
      medServiceId: medServiceId,
    })

    if (response === 200) {
      SuccessAlert('Сервис успешно создана')
      router.push('/admin/services')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const handleChangeSelect = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    setMedServiceId(value);
  };

  useEffect(() => {
    GetListOfMedServices()
  }, [medServiceId])

  return (
    <div>
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <h3>Add sub med service</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Select medService
          </label>
          <div>
            <Select
              size="small"
              value={medServiceId}
              onChange={handleChangeSelect}
              style={{ width: '200px' }}
            >
              {medServices.map((service) => (
                <MenuItem key={service.name} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
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
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleCreate}>
          Add
        </button>
      </div>
    </div>
  )
}

export default CreateService
