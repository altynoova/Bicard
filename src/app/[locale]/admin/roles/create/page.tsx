'use client'
import React, { useState } from 'react'
import useRoleStore from '@/store/useRoleStore'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const CreateRole = () => {
  const { CreateRole } = useRoleStore()
  const t = useTranslations('Services')

  const router = useRouter()
  const [role, setRole] = useState<string>('')

  const handleCreate = async () => {
    const response = await CreateRole(role)

    if (response === 200) {
      SuccessAlert('Успешно')
      router.push('/admin/roles')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            {t('Name')}
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleCreate}
        >
          {t('Save')}
        </button>
      </div>
    </div>
  )
}

export default CreateRole
