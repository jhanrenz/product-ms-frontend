<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const handleLogout = () => {
  if (!confirm('Are you sure to logout?')) return;
  localStorage.removeItem('token');
  router.push('/');
};
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-between items-center h-16">

        <div
          class="text-lg font-bold text-gray-800 cursor-pointer"
          @click="router.push('/dashboard')"
        >
          Simple Product Management
        </div>

        <div class="hidden md:flex space-x-6">

          <button
            @click="router.push('/dashboard')"
            :class="[
              'text-sm font-medium transition',
              isActive('/dashboard')
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            Dashboard
          </button>

          <button
            @click="router.push('/products')"
            :class="[
              'text-sm font-medium transition',
              isActive('/products')
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            Products
          </button>

          <button
            @click="router.push('/categories')"
            :class="[
              'text-sm font-medium transition',
              isActive('/categories')
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            Categories
          </button>

        </div>

        <div>
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  </nav>
</template>
