<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Daftar Akun Baru
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Nama Lengkap -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div class="mt-1">
              <input
                type="text"
                id="name"
                v-model="name"
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Masukkan email"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Masukkan password"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full rounded-md bg-blue-600 px-4 py-3.5 text-lg font-bold text-white shadow-lg border-2 border-blue-700"
            :class="{ 'opacity-75 cursor-not-allowed': loading }"
            :disabled="loading"
          >
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </button>

          <div v-if="error" class="text-red-600 text-sm text-center">
            {{ error }}
          </div>
        </form>

        <div class="mt-6">
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Sudah punya akun?
              <router-link to="/login" class="font-medium text-primary hover:text-primary-dark">
                Masuk di sini
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '../services/auth.service'

const router = useRouter()

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Handle form submission
const handleSubmit = async () => {
  if (!name.value || !email.value || !password.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    await AuthService.signup(email.value, password.value, name.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message || 'Terjadi kesalahan saat pendaftaran'
  } finally {
    loading.value = false
  }
}
</script>