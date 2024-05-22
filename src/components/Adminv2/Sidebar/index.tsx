'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Home from '@mui/icons-material/Home'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const data = [
  { link: '/admin/appointments', label: 'Appointments', icon: '' },
  { link: '/admin/doctors', label: 'Doctors', icon: '' },
  { link: '/admin/services', label: 'Services', icon: '' },
  { link: '/admin/roles', label: 'Roles', icon: '' },
  { link: '/admin/users', label: 'Users', icon: '' },
  { link: '/admin/feedbacks', label: 'Feedbacks', icon: '' },
  { link: '/admin/schedules', label: 'Schedule', icon: '' },
  { link: '/admin/blogs', label: 'Blogs', icon: '' },
  { link: '/admin/articles', label: 'Articles', icon: '' },
  { link: '/admin/vacancies', label: 'Vacancies', icon: '' },
  { link: '/admin/faqs', label: "FAQs", icon: '' },
  { link: '/admin/infos', label: "Info", icon: '' }

]

const Nav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
})

export default function CustomizedList() {
  const t = useTranslations('Navbar')

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
      mx={5}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: '100%',
          borderRadius: '15px',
          padding: '15px',
        }}
      >
        <Nav component="nav" disablePadding>
          <ListItem sx={{}} component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Bicard Admin"
                primaryTypographyProps={{
                  color: 'primary',
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <Box
            sx={{
              bgcolor: 'white',
              pb: 2,
              borderRadius: '15px',
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              sx={{
                px: 3,
                pt: 2.5,
                pb: 0,
                '&:hover, &:focus': { '& svg': { opacity: 1 } },
              }}
            >
              <ListItemText
                primary="Routes"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '2px',
                }}
                secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: '16px',
                  color: 'rgba(0,0,0,0)',
                }}
                sx={{ my: 0 }}
              />
            </ListItemButton>
            {data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{ py: 0, minHeight: 32, color: 'primary' }}
              >
                <Link href={item.link}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={t(item.label)}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 'medium',
                    }}
                  />
                </Link>
              </ListItemButton>
            ))}
          </Box>
        </Nav>
      </Paper>
    </Box>
  )
}
