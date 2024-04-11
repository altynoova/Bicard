import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Link from 'next/link'
import { SubMedService } from '@/entities/Service'

interface IServiceItem {
  id: number
  name: string
  shortDescription: string
  subMedservice : SubMedService[] 
}

export default function ServiceCard({ id, name, shortDescription, subMedservice }: IServiceItem) {
  return (
    <div className='department-item'>
      <Link href={`/services/details/${id}`}>
        <i className="icofont-heart-beat-alt"></i>
        <h3>{name}</h3>
        <p>{shortDescription}</p>
      </Link>
    </div>
  )
}
