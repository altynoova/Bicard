'use client'
import React, { useEffect, useState } from 'react'
import { Config } from 'datatables.net-dt'
import useDoctorStore from '@/store/useDoctorStore'
import DataTable from '@/components/Admin/Users/DataTables'
import useRoleStore from '@/store/useRoleStore'
import { GetRoles } from '@/libs/requests/RoleRequests'

const Users = ({ ...props }: Config) => {
  const { GetUsersByRole } = useDoctorStore()
  const [loading, setLoading] = useState<boolean>(true)
  const [status, setStatus] = useState(0)

  const Init = async () => {
    const response = await GetUsersByRole('Doctor')
    setStatus(response)
    if (status == 200) {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetRoles()
    Init()
  }, [])

  return (
    <div className="m-5">
      {status == 200 || !loading ? <DataTable /> : <span>loading...</span>}
    </div>
  )
}

export default Users
