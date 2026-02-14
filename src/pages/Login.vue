<script setup lang="ts">
import { ref } from 'vue';
import { api } from '@/config/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleLogin = async () => {
  errorMessage.value = '';
  loading.value = true;

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', response.data.token);
    router.push('/dashboard');
  } catch (err: any) {
    errorMessage.value =
      err.response?.data?.message || 'Invalid email or password.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">

    <div class="w-full max-w-md">

      <div class="bg-white shadow-sm border border-gray-200 rounded-xl p-8">

        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        <div
          v-if="errorMessage"
          class="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in...' : 'Login' }}
          </button>

        </form>

      </div>

        <p class="text-center text-sm text-gray-500 mt-6">
        Don't have an account?
        <span
          @click="router.push('/register')"
          class="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>

    </div>
  </div>
</template>
