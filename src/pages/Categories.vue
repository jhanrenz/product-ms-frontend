<script setup lang="ts">
import { categoryStore } from '@/stores/category';
import CategoryList from '@/components/CategoryList.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';

const store = categoryStore();
const router = useRouter();

onMounted(() => {
    store.fetchCategory();
});

const goToEdit = (id: number) => {
    router.push(`/categories/form/${id}`);
};

const deleteData = (id: number) => {
    if (!confirm("Are you sure to delete?")) return;
    store.deleteCategory(id);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    
    <div class="max-w-6xl mx-auto">

      <div class="mb-6 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Categories</h1>
        </div>

        <Button
          @click="router.push('/categories/form')"
        >
          + Add Category
        </Button>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <CategoryList
          :categories="store.categories"
          @edit="goToEdit"
          @delete="deleteData"
        />
      </div>

    </div>
  </div>
</template>
