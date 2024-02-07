'use client'
import React, {useEffect} from 'react'
import {ErrorAlert, SuccessAlert} from '@/libs/helpers/Alert'
import useRoleStore from '@/store/useRoleStore'
import Link from "next/link";

const Page = () => {
    const {roles, GetRoles, RemoveRole} = useRoleStore()

    const deleteRole = async (roleName: string) => {
        const response = await RemoveRole(roleName)

        if (response === 200) {
            SuccessAlert('Роль удалена')
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    useEffect(() => {
        GetRoles()
    }, [])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <div className="d-flex justify-content-center mb-5">
                <Link href="roles/create">Добавить роль</Link>
            </div>
            <div className="mb-5">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Normalized Name</th>
                        <th scope="col">Concurrency Stamp</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <th scope="row">{role.id}</th>
                            <td>{role.name}</td>
                            <td>{role.normalizedName}</td>
                            <td>{role.concurrencyStamp}</td>
                            <td>
                                <button type="button" className="btn btn-danger mx-1"
                                        onClick={() => deleteRole(role.name)}>
                                    Удалить роль
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page