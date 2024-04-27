'use client'
import React, { useEffect } from 'react'
import { ErrorAlert, SuccessAlert } from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'
import Link from 'next/link'
import DashboardCard from '@/components/Adminv2/Shared/DashboardCard'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Page = () => {
  const { roles, GetRoles, RemoveRole } = useRoleStore()

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
    <div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="roles/create">Добавить роль</Link>
      </div>
      <DashboardCard title="Roles">
        <Box sx={{ overflow: 'auto' }}>
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
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {role.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => deleteRole(role.name)}>
                        <DeleteOutlineIcon color={'error'} />
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

export default Page
