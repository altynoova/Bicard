'use client'
import React, { useEffect, useState } from 'react'
import { Config } from 'datatables.net-dt'
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import useDoctorStore from '@/store/useDoctorStore'
import { AssignRole, UnassignRole } from '@/libs/requests/RoleRequests'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'

const Users = ({ ...props }: Config) => {
  const { GetUsersByRole, userReferences } = useDoctorStore()
  const { roles, GetRoles } = useRoleStore()
  const [roleName, setRoleName] = useState<string>('')
  const [filter, setFilter] = useState('Patient')

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
    GetUsersByRole(filter)
    GetRoles()
  }, [])

  useEffect(() => {
    GetUsersByRole(filter)
  }, [filter])

  return (
    <div className="m-5">
      {/*{status == 200 || !loading ? <DataTable/> : <span>loading...</span>*/}
      {/*}*/}
      <DashboardCard title="Users">
        <Box sx={{ overflow: 'auto' }}>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={(event) => setFilter(event.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <Table
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      №
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Role
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                    ></Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                    ></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userReferences.map((user,index) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {index+1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {user.userName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        onChange={(event) =>
                          setRoleName(event.target.value as string)
                        }
                      >
                        {roles.map((role) => (
                          <MenuItem key={role.name} value={role.name}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAssignRole(user.userName)}
                      >
                        Assign role
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleUnassignRole(user.userName)}
                      >
                        Unassign role
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </DashboardCard>
    </div>
  )
}

export default Users
