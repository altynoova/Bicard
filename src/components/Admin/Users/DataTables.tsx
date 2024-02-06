'use client'
import React, { useEffect, useRef, useState } from 'react'
import DataTables, { Config } from 'datatables.net-dt'
import useDoctorStore from '@/store/useDoctorStore'
import { AssignRole, UnassignRole } from '@/libs/requests/RoleRequests'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'

const DataTable = ({ ...props }: Config) => {
  const users = useDoctorStore(state => state.userReferences)
  const roles = useRoleStore(state => state.roles)
  const tableRef = useRef<HTMLTableElement>(null)
  const [roleName, setRoleName] = useState<string>('')

  const handleAssignRole = async (userName: string) => {
    const response = await AssignRole({ roleName, userName })
    if (response.status === 200) {
      SuccessAlert('Роль успешно задана')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  const handleUnassignRole = async (userName: string) => {
    const response = await UnassignRole({ roleName, userName })
    if (response.status === 200) {
      SuccessAlert('Роль успешно удалена')
    } else {
      ErrorAlert('Произошла ошибка')
    }
  }

  useEffect(() => {
    const dt = new DataTables(tableRef.current!, props)
    return () => {
      dt.destroy()
    }
  }, [])

  return (
    <div className="m-5">
      <table ref={tableRef} id="example" className="table display" style={{ width: '100%' }}>
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Роль</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.userName}</td>
            <td>
              <select
                className="form-select"
                onChange={(event) => setRoleName(event.target.value)}
              >
                {roles.map(role => (
                  <option key={role.name} value={role.name}>{role.name}</option>
                ))}
              </select>
            </td>
            <td className="w-100 d-flex justify-content-end">
              <button type="button" className="btn btn-primary" onClick={() => handleAssignRole(user.userName)}>
                Задать роль
              </button>
              <button type="button" className="btn btn-danger mx-1" onClick={() => handleUnassignRole(user.userName)}>
                Удалить роль
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable