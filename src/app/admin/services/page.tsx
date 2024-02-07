'use client'
import React, {useEffect} from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import useRoleStore from "@/store/useRoleStore";
import {ErrorAlert, SuccessAlert} from "@/libs/helpers/Alert";
import useMedServicesStore from "@/store/useMedServicesStore";

const Services = () => {
    const {
        medServices,
        currentMedService,
        GetListOfMedServices,
        GetSubMedServiceById,
        CreateMedService,
        CreateSubMedService,
        EditMedService,
        EditSubMedService,
        RemoveMedService,
        RemoveSubMedService
    } = useMedServicesStore()

    const deleteService = async (id: number) => {
        const response = await RemoveMedService(id)

        if (response === 200) {
            SuccessAlert('Роль удалена')
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    useEffect(() => {
        GetListOfMedServices()
    }, [])

    return (
        <div>
            <div className="doctors-area doctors-area-two pt-100 pb-70">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="d-flex justify-content-center mb-5">
                            <Link href="/admin/services/create">Добавить сервис</Link>
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {medServices.map(s => (
                                    <tr data-toggle="collapse" data-target="#demo1" className="accordion-header"
                                        key={s.id}>
                                        <th scope="row">{s.id}</th>
                                        <td>{s.name}</td>
                                        <td>
                                            <Link href={`/admin/services/${s.id}`}>
                                                <button type="button" className="btn btn-warning mx-1">Редакторовать
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger mx-1"
                                                onClick={() => RemoveMedService(s.id)}
                                            >
                                                Удалить сервис
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services