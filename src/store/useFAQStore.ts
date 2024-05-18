import { create } from 'zustand';
import { FAQ, FAQList, FAQRequestModel } from '@/entities/FAQ';
import {
  CreateFAQ,
  DeleteFAQ,
  EditFAQ,
  FetchFAQs
} from '@/libs/requests/FAQRequest';

interface IFAQStore {
  FAQList: FAQList[];
  currentFAQ: FAQ;

  fetchFAQs: () => void;
  createFAQ: (data: FAQRequestModel) => Promise<number>;
  editFAQ: (data: FAQRequestModel, id: number) => Promise<number>;
  DeleteFAQ: (id: number) => Promise<number>;

}

const useFAQStore = create<IFAQStore>((set) => ({
  FAQList: [],
  currentFAQ: {
    id: 0,
    type: '',
    question:'',
    answer:''
  },

  fetchFAQs: async () => {
    const response = await FetchFAQs()
    console.log(response)
    set(() => ({ FAQList: response.data }))
    return response.status
  },

  createFAQ: async (data: FAQRequestModel) => {
    try {
      const response = await CreateFAQ(data);
      set({ currentFAQ: response.data });
      return response.status;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  },

  editFAQ: async (data: FAQRequestModel, id: number) => {
    try {
      const response = await EditFAQ(data, id);
      set({ currentFAQ: response.data });
      return response.status;
    } catch (error) {
      console.error('Error editing FAQ:', error);
      throw error;
    }
  },

  async DeleteFAQ(id: number) {
    const response = await DeleteFAQ(id)
    console.log(response)
    if (response.status == 200) {
      set((state) => ({ FAQList: state.FAQList.filter(d => d.id != id) }))
    }
    return response.status
  },
}))
export default useFAQStore;
