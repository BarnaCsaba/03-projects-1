import {ref} from 'vue';
import {useToast} from 'vue-toastification';

const guitars = ref([]);
const toast = useToast();

export function useGuitarStore(){
    async function fetchGuitars() {
        try{
             const response = await fetch('http://localhost:3001/guitars');
             if(!response.ok){
                throw new Error('Failed to fetch guitars');
             }
             guitars.value = await response.json();
             toast.success('Guitars fetched successfully');
        }
        catch(error){
            toast.error(error.message);
        }
    }
    return {guitars, fetchGuitars};
}  