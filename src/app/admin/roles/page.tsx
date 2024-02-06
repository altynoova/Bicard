'use client'
import React, { useEffect, useState } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'

const Page = () => {
  const { roles, GetRoles, CreateRole, RemoveRole } = useRoleStore()
  const [role, setRole] = useState<string>('')

  const handleCreate = async () => {
    const response = await CreateRole(role)

    if (response === 200) {
      SuccessAlert('Роль успешно создана')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const deleteRole = async (roleName: string) => {
    const response = await RemoveRole(roleName)

    if (response === 200) {
      SuccessAlert('Роль удалена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    GetRoles()
  }, [])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <div style={{ maxWidth: '700px', minWidth: '400px', minHeight: '300px' }}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Введите название роли</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputRole"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleCreate}>Создать</button>
      </div>
      <div className="mb-5">
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Normalized Name</th>
            <th scope="col">Concurrency Stamp</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <th scope="row">{role.id}</th>
              <td>{role.name}</td>
              <td>{role.normalizedName}</td>
              <td>{role.concurrencyStamp}</td>
              <td>
                <button type="button" className="btn btn-danger mx-1" onClick={() => deleteRole(role.name)}>
                  Удалить роль
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page