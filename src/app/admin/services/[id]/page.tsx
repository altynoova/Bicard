'use client'
import React, {useEffect, useState} from 'react'
import PageBanner from '@/components/Common/PageBanner'
import Link from 'next/link'
import useRoleStore from "@/store/useRoleStore";
import {ErrorAlert, SuccessAlert} from "@/libs/helpers/Alert";
import useMedServicesStore from "@/store/useMedServicesStore";
import {useRouter} from "next/navigation";

const ServiceDetails = ({params}: { params: { id: number } }) => {
    const {
        medServices,
        currentSubMedService,
        currentMedService,
        currentSubMedServices,
        GetListOfMedServices,
        GetSubMedServiceById,
        GetMedServiceById,
        GetListOfSubMedServices,
        CreateMedService,
        CreateSubMedService,
        EditMedService,
        EditSubMedService,
        RemoveMedService,
        RemoveSubMedService
    } = useMedServicesStore()

    const router = useRouter()
    const [name, setName] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [longDescription, setLongDescription] = useState('')
    const [subServiceName, setSubServiceName] = useState('')
    const [subServicePrice, setSubServicePrice] = useState('0')

    const deleteSubService = async (id: number) => {
        const response = await RemoveMedService(id)

        if (response === 200) {
            SuccessAlert('Роль удалена')
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    const handleUpdate = async () => {
        const response = await EditMedService({name, shortDescription, longDescription}, currentMedService.id)
        if (response === 200) {
            SuccessAlert('Сервис успешно обновлен')
            router.push("/admin/services")
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    const handleCreateSubService = async () => {
        const response = await CreateSubMedService({
            name: subServiceName,
            price: subServicePrice,
            medServiceId: currentMedService.id
        })
        if (response === 200) {
            SuccessAlert('Сервис успешно обновлен')
            router.push("/admin/services")
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    const handleRemoveSubMedService = async (id: number) => {
        const response = await RemoveSubMedService(id)
        if (response === 200) {
            SuccessAlert('Сервис успешно обновлен')
            router.push("/admin/services")
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    useEffect(() => {
        GetMedServiceById(params.id)
    }, [])

    useEffect(() => {
        GetListOfSubMedServices(currentMedService?.id || 0)
    }, [currentMedService]);

    return (
        <div>
            <div className="doctors-area doctors-area-two pt-100 pb-70">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="d-flex flex-column justify-content-center mb-5">
                            <div style={{
                                maxWidth: '700px',
                                minWidth: '400px',
                                minHeight: '300px',
                                marginBottom: '20px'
                            }}>
                                <h3>Update med service</h3>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputRole"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Short Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputRole"
                                        value={shortDescription}
                                        onChange={(event) => setShortDescription(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Long Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputRole"
                                        value={longDescription}
                                        onChange={(event) => setLongDescription(event.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update
                                </button>
                            </div>
                            <div style={{maxWidth: '700px', minWidth: '400px', minHeight: '300px'}}>
                                <h3>Add sub med service</h3>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputRole"
                                        value={subServiceName}
                                        onChange={(event) => setSubServiceName(event.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputRole"
                                        value={subServicePrice}
                                        onChange={(event) => setSubServicePrice(event.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleCreateSubService}>Add
                                </button>
                            </div>
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
                                {currentSubMedServices.map(s => (
                                    <tr data-toggle="collapse" data-target="#demo1" className="accordion-header"
                                        key={s.id}>
                                        <th scope="row">{s.id}</th>
                                        <td>{s.name}</td>
                                        <td>
                                            <Link href={`admin/services/${s.id}`}>
                                                <button type="button" className="btn btn-warning mx-1">Редакторовать
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger mx-1"
                                                onClick={() => handleRemoveSubMedService(s.id)}
                                            >
                                                Удалить sub сервис
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

export default ServiceDetails