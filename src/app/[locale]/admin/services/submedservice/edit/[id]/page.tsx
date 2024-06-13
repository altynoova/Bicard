'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useMedServicesStore from '@/store/useMedServicesStore'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const EditService = ({ params }: { params: { id: number } }) => {
  const {
    currentSubMedService,
    currentMedService,
    GetSubMedServiceById,
    EditSubMedService,
  } = useMedServicesStore()

  const router = useRouter()
  const t = useTranslations('Services')

  const [name, setName] = useState(currentMedService.name)
  const [price, setPrice] = useState(currentMedService.shortDescription)

  const [loading, setLoading] = useState(true)

  const handleUpdate = async () => {
    const response = await EditSubMedService(
      { name, price, medServiceId: currentSubMedService.medServiceId },
      params.id
    )
    if (response === 200) {
      SuccessAlert('Успешно')
      router.push('/admin/services');
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const init = async () => {
    await GetSubMedServiceById(params.id)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setName(currentSubMedService.name)
    setPrice(currentSubMedService.price)
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
                    {t('Price')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputRole"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
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
