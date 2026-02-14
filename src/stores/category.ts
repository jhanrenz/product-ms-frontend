import { api } from "@/config/api";
import { defineStore } from "pinia";
import type { Category } from "@/types/categories";

export const categoryStore = defineStore('categories',{
    state: () => ({
        categories : [] as Category[],
        loading: false,
    }),

    actions : {
        async fetchCategory(){
            this.loading = true;
            try{
                const response = await api.get('/categories');
                this.categories = response.data.categories;
            }catch(err: any){
                console.error(err.response.data);
            }finally{
                this.loading = false;
            }
        },

        async addCategory(category: Omit<Category, 'id'>){
            try{
                const response = await api.post('/categories', category);
                this.categories.push(response.data.category);
            }catch(err: any){
                console.error(err.response.data);
            }
        },

        async updateCategory(category : Category){
            try{
                const response = await api.put(`/categories/${category.id}`, category);
                const index = this.categories.findIndex(c => c.id === category.id);
                if(index !== -1){
                    this.categories[index] = response.data.category;
                }
            }catch(err:any){
                console.error(err.response.data);
            }
        },

        async deleteCategory(id : number){
            try{
                await api.delete(`/categories/${id}`);
                this.categories = this.categories.filter(c => c.id !== id);
            }catch(err: any){
                console.error(err.response.data);
            }
        }
    }
})
