'use client'
import { Grid, Box } from '@mui/material'
import PageContainer from '@/components/Adminv2/PageContainer'

import ProfitExpenses from '@/components/Adminv2/Dashboard/ProfitExpenses'
import TrafficDistribution from '@/components/Adminv2/Dashboard/TrafficDistribution'
import UpcomingSchedules from '@/components/Adminv2/Dashboard/UpcomingSchedules'
import TopPayingClients from '@/components/Adminv2/Dashboard/TopPayingClients'
import Blog from '@/components/Adminv2/Dashboard/Blog'
import ProductSales from '@/components/Adminv2/Dashboard/ProductSales'

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ProfitExpenses />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TrafficDistribution />
              </Grid>
              <Grid item xs={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <UpcomingSchedules />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TopPayingClients />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
