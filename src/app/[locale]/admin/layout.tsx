import { Box, Grid, ThemeProvider } from '@mui/material'
import { baselightTheme } from '@/libs/theme/DefaultColor'
import Sidebar from '@/components/Adminv2/Sidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Box sx={{ margin: '20px 40px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default AdminLayout
