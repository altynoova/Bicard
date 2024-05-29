'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const ConfirmEmail = () => {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')
  return (
    <div>
      Confirm Email Component:
      <p>userId: {userId}</p>
      <p>token: {token}</p>
    </div>
  )
}

export default ConfirmEmail
