<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Left side - Image -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <div class="flex h-full items-center justify-center p-8">
        <div class="text-center text-white max-w-md">
          <div class="mb-8">
            <div class="mx-auto h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 class="text-4xl font-bold leading-tight">Selamat Datang di SUMU</h1>
          <p class="mt-4 text-xl text-blue-100 leading-relaxed">Platform Pembelajaran Digital untuk Masa Depan</p>
          <div class="mt-8 flex justify-center space-x-4">
            <div class="h-2 w-2 bg-white/40 rounded-full"></div>
            <div class="h-2 w-2 bg-white rounded-full"></div>
            <div class="h-2 w-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right side - Login form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-4">
      <div class="w-full max-w-md space-y-8">
        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Masuk ke Akun Anda</h2>
          <p class="mt-2 text-sm text-gray-600">Atau 
            <router-link to="/signup" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              daftar akun baru
            </router-link>
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          <!-- Email Input -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div class="relative">
              <input 
                id="email"
                name="email"
                type="email"
                v-model="email"
                required
                autocomplete="email"
                :class="[
                  'block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
                  emailError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                ]"
                placeholder="Masukkan email Anda"
                @input="clearEmailError"
              />
              <div v-if="emailError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
          </div>

          <!-- Password Input -->
          <div class="space-y-1">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="relative">
              <input 
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                autocomplete="current-password"
                :class="[
                  'block w-full px-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200',
                  passwordError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                ]"
                placeholder="Masukkan password Anda"
                @input="clearPasswordError"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="togglePasswordVisibility"
              >
                <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me"
                name="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Lupa password?
              </a>
            </div>
          </div>

          <!-- Global Error Alert -->
          <div v-if="authStore.error" class="rounded-md bg-red-50 p-4 border border-red-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ authStore.error }}</p>
              </div>
              <div class="ml-auto pl-3">
                <button @click="authStore.clearError" class="text-red-400 hover:text-red-600">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="authStore.loading || !isFormValid"
              :class="[
                'group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                authStore.loading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              ]"
            >
              <span v-if="authStore.loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ authStore.loading ? 'Memproses...' : 'Masuk ke Dashboard' }}
            </button>
          </div>
        </form>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Belum punya akun?
            <router-link to="/signup" class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Daftar sekarang dan mulai belajar
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Komponen Login Page
 * Menggunakan Pinia store untuk state management dan validasi form
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAppStore } from '../stores/app'

// Stores
const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// Validation state
const emailError = ref('')
const passwordError = ref('')

/**
 * Computed property untuk mengecek validitas form
 */
const isFormValid = computed(() => {
  return email.value.length > 0 && 
         password.value.length > 0 && 
         !emailError.value && 
         !passwordError.value
})

/**
 * Handler untuk submit form login
 */
const handleLogin = async () => {
  try {
    // Clear previous errors
    clearAllErrors()
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    // Attempt login
    await authStore.login(email.value, password.value)
    
    // Show success notification
    appStore.addNotification({
      type: 'success',
      message: `Selamat datang kembali, ${authStore.userDisplayName}!`,
      duration: 3000
    })
    
    // Redirect to dashboard
    router.push('/dashboard')
    
  } catch (error) {
    // Error sudah di-handle di store
    console.error('Login error:', error)
  }
}

/**
 * Validasi form secara keseluruhan
 */
const validateForm = () => {
  let isValid = true
  
  // Validate email
  if (!email.value) {
    emailError.value = 'Email harus diisi'
    isValid = false
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'Format email tidak valid'
    isValid = false
  }
  
  // Validate password
  if (!password.value) {
    passwordError.value = 'Password harus diisi'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password minimal 6 karakter'
    isValid = false
  }
  
  return isValid
}

/**
 * Validasi format email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Clear email error
 */
const clearEmailError = () => {
  emailError.value = ''
  authStore.clearError()
}

/**
 * Clear password error
 */
const clearPasswordError = () => {
  passwordError.value = ''
  authStore.clearError()
}

/**
 * Clear semua error
 */
const clearAllErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  authStore.clearError()
}

/**
 * Toggle password visibility
 */
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

/**
 * Initialize component
 */
onMounted(() => {
  // Clear any existing errors
  authStore.clearError()
  
  // Auto-redirect jika sudah login
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>