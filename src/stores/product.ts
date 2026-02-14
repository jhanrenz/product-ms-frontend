import { api } from "@/config/api";
import type { ProductForm as Product } from "@/types/products";
import { defineStore } from "pinia";
export const productStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    categories: [] as { id: number; name: string }[],
    loading: false,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await api.get('/products');
        this.products = response.data.products;
      } catch (err: any) {
        console.error(err.response?.data);
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const response = await api.get('/categories');
        this.categories = response.data.categories;
      } catch (err: any) {
        console.error(err.response?.data);
      }
    },

    // Accept FormData for file uploads
    async addProduct(formData: FormData) {
      try {
        const response = await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.products.push(response.data.product);
      } catch (err: any) {
        console.error(err.response?.data);
      }
    },

   async updateProduct(id: number, formData: FormData) {
  try {
    const response = await api.post(
      `/products/${id}?_method=PUT`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = response.data.product;
    }

  } catch (err: any) {
    console.error(err.response?.data);
  }
},

    async deleteProduct(id: number) {
      try {
        await api.delete(`/products/${id}`);
        this.products = this.products.filter(p => p.id !== id);
      } catch (err: any) {
        console.error(err.response?.data);
      }
    },
  },
});
