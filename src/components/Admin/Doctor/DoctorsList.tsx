'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Doctor } from '@/entities/Doctor'
import useDoctorStore from '@/store/useDoctorStore'
import { ErrorAlert } from '@/libs/helpers/Alert'

const DoctorsList = ({ doctors }: { doctors: Doctor[] }) => {
  const DeleteDoctor = useDoctorStore().DeleteDoctor
  const handleDelete = async (id: number) => {
    const status = await DeleteDoctor(id)
    if (status !== 200) {
      ErrorAlert('Произошла ошибка!')
    }
  }

  return (
    <div>
      {doctors.map(doctor => (
        <Link key={doctor.id} href={`/admin/doctors/edit/${doctor.id}`}>
          <div className="col-sm-6 col-lg-4" style={{ position: 'relative' }}>
            <button
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
                background: 'transparent',
                border: 'none',
              }}
              onClick={() => handleDelete(doctor.id)}
            >
              <img width="48" height="48" src="https://img.icons8.com/color/48/close-window.png" alt="close-window" />
            </button>
            <div className="doctor-item">
              <div className="doctor-top">
                <Image width={100} height={300} src={`data:image/png;base64, ${doctor.photoBase64}`} alt="Doctor" />
              </div>
              <div className="doctor-bottom">
                <h3>{doctor.name}</h3>
                <span>{doctor.speciality}</span>
              </div>
            </div>
          </div>
        </Link>

      ))}
    </div>
  )
}

export default DoctorsList
