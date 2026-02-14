<script setup lang="ts">
import { api } from '@/config/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleRegister = async () => {
  errorMessage.value = '';
  loading.value = true;

  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    localStorage.setItem("token", response.data.token);
    router.push('/');
  } catch (err: any) {
    errorMessage.value =
      err.response?.data?.message || 'Registration failed. Please try again.';
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
            Create Account
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Register to access your dashboard
          </p>
        </div>

        <div
          v-if="errorMessage"
          class="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              v-model="name"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="john@example.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
              placeholder="Enter your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>

        </form>

      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <span
          @click="router.push('/')"
          class="text-indigo-600 font-medium cursor-pointer hover:underline"
        >
          Login here
        </span>
      </p>

    </div>
  </div>
</template>
