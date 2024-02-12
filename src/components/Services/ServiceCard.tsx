import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Link from 'next/link'

interface IServiceItem {
  id: number
  shortDescription: string
}

export default function ServiceCard({ id, shortDescription }: IServiceItem) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: '#0046c0',
        color: 'white',
        padding: '20px',
      }}
    >
      <Link href={`/services/details/${id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/public/images/service-details-bg.jpg"
            alt="Service"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="white">
              {shortDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions></CardActions>
    </Card>
  )
}
