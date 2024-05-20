'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'
import { TextField } from '@mui/material'
import { useTranslations } from 'next-intl'

const EditService = ({ params }: { params: { id: number } }) => {
  const {
    currentMedService,
    GetMedServiceById,
    EditMedService,
  } = useMedServicesStore()

  const router = useRouter()
  const t = useTranslations('Services')
  
  const [name, setName] = useState(currentMedService.name)
  const [shortDescription, setShortDescription] = useState(
    currentMedService.shortDescription
  )
  const [longDescription, setLongDescription] = useState(
    currentMedService.longDescription
  )
  const [loading, setLoading] = useState(true)

  const handleUpdate = async () => {
    const response = await EditMedService(
      {
        name, shortDescription, longDescription,
        files: null
      },
      currentMedService.id
    )
    if (response === 200) {
      SuccessAlert('Успешно')
      router.push('/admin/services')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const init = async () => {
    await GetMedServiceById(params.id)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setName(currentMedService.name)
    setShortDescription(currentMedService.shortDescription)
    setLongDescription(currentMedService.longDescription)
  }, [loading])

  return loading ? (
    <div>{t('Loading...')}</div>
  ) : (
    <div>
      <div className="doctors-area doctors-area-two pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="d-flex flex-column justify-content-center mb-5">
              <div
                style={{
                  maxWidth: '700px',
                  minWidth: '400px',
                  minHeight: '300px',
                  marginBottom: '20px',
                }}
              >
                <h3>{t('Edit')}</h3>
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
                    onChange={(event) =>
                      setShortDescription(event.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                  {t('Detailed Description')}
                  </label>
                  <TextField
                    type="text"
                    multiline
                    minRows={3}
                    fullWidth
                    value={longDescription}
                    onChange={(event) => setLongDescription(event.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  {t('Save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditService
