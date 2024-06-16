'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
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
import useRoleStore from '@/store/useRoleStore'
import { useTranslations } from 'next-intl'

const Users = () => {
  const { GetUsersByRole, userReferences } = useDoctorStore()
  const { roles, GetRoles } = useRoleStore()
  const [filter, setFilter] = useState('Patient')
  const t = useTranslations('Services')


  useEffect(() => {
    GetUsersByRole(filter)
    GetRoles()
  }, [])

  useEffect(() => {
    GetUsersByRole(filter)
  }, [filter])

  return (
    <div className="m-5">
      <DashboardCard title={t('Users')}>
        <Box sx={{ overflow: 'auto' }}>
          <InputLabel id="demo-simple-select-label">{t('Role')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Role"
            sx={{ width: '150px' }}
            onChange={(event) => setFilter(event.target.value)}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.normalizedName}>
                {t(role.normalizedName)}
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
                      {t('UserName')}
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
