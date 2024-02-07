import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <Link href="/admin/appointments">Appointments</Link>
        </li>
        <li className="list-group-item">
          <Link href="/admin/doctors">Doctors</Link>
        </li>
        <li className="list-group-item">
          <Link href="/admin/services">Med Services</Link>
        </li>
        <li className="list-group-item">
          <Link href="/admin/roles">Roles</Link>
        </li>
        <li className="list-group-item">
          <Link href="/admin/feedbacks">Feedbacks</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
