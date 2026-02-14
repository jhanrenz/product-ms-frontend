<script setup lang="ts">
import { productStore } from '@/stores/product';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ProductForm as Product } from '@/types/products';
import { Button } from './ui/button';

const store = productStore();
const router = useRouter();
const route = useRoute();
const product_id = Number(route.params.id) || null;

const isEditMode = computed(() => !!product_id);

const data = ref<Omit<Product, 'id'>>({
  name: '',
  description: '',
  price: 0,
  category_id: 0,
  image: null,
  image_url: null,
});

onMounted(async () => {
  await store.fetchCategories();

  if (product_id) {
    const product = store.products.find(p => p.id === product_id);
    if (product) {
      data.value = {
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category_id,
        image: null,
        image_url: product.image_url,
      };
    }
  }
});

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  data.value.image = target.files?.[0] ?? null;
};

const submitData = async () => {
  if (!confirm('Are you sure to save?')) return;

  const formData = new FormData();
  formData.append('name', data.value.name);
  formData.append('description', data.value.description);
  formData.append('price', data.value.price.toString());
  formData.append('category_id', data.value.category_id.toString());

  if (data.value.image instanceof File) {
    formData.append('image', data.value.image);
  }

  if (isEditMode.value && product_id) {
    await store.updateProduct(product_id, formData);
  } else {
    await store.addProduct(formData);
  }

  router.push('/products');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="w-full max-w-3xl">

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {{ isEditMode 
              ? 'Update your product information below.'
              : 'Fill in the details to create a new product.' }}
          </p>
        </div>

        <form @submit.prevent="submitData" class="space-y-6">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                v-model="data.name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                v-model="data.price"
                type="number"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="data.description"
              rows="3"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              v-model="data.category_id"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="cat in store.categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              @change="onFileChange"
              class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />

            <div v-if="data.image_url" class="mt-4">
              <p class="text-xs text-gray-500 mb-2">Current Image</p>
              <img
                :src="data.image_url"
                alt="Current Image"
                class="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>

          <div class="flex items-center justify-between pt-4">
            <Button
              type="button"
              @click="router.push('/products')"
            >
              Cancel
          </Button>

            <Button
              type="submit"
            >
              {{ isEditMode ? 'Update Product' : 'Save Product' }}
          </Button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
