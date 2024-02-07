import React from 'react'
import Sidebar from '@/components/Admin/Sidebar'

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="d-flex justify-content-center row mx-5">
            <div className="col-2">
                <Sidebar/>
            </div>
            <div className="col-10">{children}</div>
        </div>
    )
}

export default Layout
