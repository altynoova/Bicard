import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Link from 'next/link'

interface IServiceItem {
  name: string
  price: string
}

export default function ServiceCard({ name, price }: IServiceItem) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: '#0046c0',
        color: 'white',
        padding: '20px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/public/images/service-details-bg.jpg"
          alt="Service"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="white">
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  )
}
