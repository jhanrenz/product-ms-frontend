<script setup lang="ts">
import { productStore } from '@/stores/product';
import ProductList from '@/components/ProductList.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';

const store = productStore();
const router = useRouter();

onMounted(() => {
    store.fetchProducts();
});

const goToEdit = (id: number) => {
    router.push(`/products/form/${id}`);
};

const handleDelete = (id: number) => {
    if (!confirm("Are you sure to delete this product?")) return;
    store.deleteProduct(id);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">

      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Products</h1>
          <p class="text-sm text-gray-500">
            Manage and organize your product inventory
          </p>
        </div>

        <Button
          @click="router.push('/products/form')"
          variant="default"
        >
          + Add Product
        </Button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <ProductList
          :products="store.products"
          @delete="handleDelete"
          @edit="goToEdit"
        />
      </div>

    </div>
  </div>
</template>
