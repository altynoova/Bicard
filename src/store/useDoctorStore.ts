import { create } from 'zustand'
import { Doctor } from '@/entities/Doctor'
import { FetchDoctors, GetDoctor } from '@/libs/requests/DoctorRequests';


interface IDoctorStore {
    doctors: Doctor[];
    currentDoctor: Doctor | undefined;
    FetchDoctors: () => void;
    GetDoctor: (id:number)=> Promise<number>;
}

const useDoctorStore = create<IDoctorStore>()((set) => ({
    doctors: [],
    currentDoctor: undefined,
    async FetchDoctors() {
        const response = await FetchDoctors()
        console.log(response)
        set(() => ({ doctors: response.data }))
        return response.status
    },
    async GetDoctor(id){
        const response = await GetDoctor(id)
        console.log(response)
        set(() => ({ currentDoctor: response.data }))
        return response.status
    }
}))

export default useDoctorStore