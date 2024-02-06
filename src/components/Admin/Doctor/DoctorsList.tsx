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
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center gap-2">
      {doctors.map(doctor => (
        <div className="col-sm-6 col-lg-4" key={doctor.id}>
          <div style={{ position: 'relative' }}>
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
              <Image width="48" height="48" src="https://img.icons8.com/color/48/close-window.png" alt="close-window" />
            </button>
            <Link
              onClick={(event) => event.stopPropagation()} key={doctor.id}
              href={`/admin/doctors/edit/${doctor.id}`}
            >
              <div className="doctor-item">
                <div className="doctor-top">
                  <Image width={100} height={300} src={`data:image/png;base64, ${doctor.photoBase64}`} alt="Doctor" />
                </div>
                <div className="doctor-bottom">
                  <h3>{doctor.name}</h3>
                  <span>{doctor.speciality}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DoctorsList
