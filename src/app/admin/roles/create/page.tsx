'use client'
import React, {useEffect, useState} from 'react';
import useRoleStore from "@/store/useRoleStore";
import {ErrorAlert, SuccessAlert} from "@/libs/helpers/Alert";
import {useRouter} from "next/navigation";

const CreateRole = () => {
    const {GetRoles, CreateRole} = useRoleStore()
    const router = useRouter()
    const [role, setRole] = useState<string>('')

    const handleCreate = async () => {
        const response = await CreateRole(role)

        if (response === 200) {
            SuccessAlert('Роль успешно создана')
            router.push('/admin/roles')
        } else {
            ErrorAlert('Произошла ошибка')
        }
    }

    return (
        <div  className="d-flex justify-content-center align-items-center mt-5">
            <div style={{maxWidth: '700px', minWidth: '400px', minHeight: '300px'}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Введите название роли</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputRole"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleCreate}>Создать</button>
            </div>
        </div>
    );
};

export default CreateRole;