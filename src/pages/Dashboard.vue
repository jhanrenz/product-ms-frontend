<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { productStore } from '@/stores/product';
import { categoryStore } from '@/stores/category';

const productStoreInstance = productStore();
const categoryStoreInstance = categoryStore();

onMounted(async () => {
  await productStoreInstance.fetchProducts();
  await categoryStoreInstance.fetchCategory();
});

const totalProducts = computed(() => productStoreInstance.products.length);
const totalCategories = computed(() => categoryStoreInstance.categories.length);

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <main class="p-6 flex-1">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p class="text-sm text-gray-500">Total Products</p>
          <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ totalProducts }}</h3>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p class="text-sm text-gray-500">Total Categories</p>
          <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ totalCategories }}</h3>
        </div>

      </div>

    </main>

  </div>
</template>
