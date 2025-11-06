/**
 * Pinia store untuk manajemen state autentikasi
 * Mengelola login, logout, dan status pengguna
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import AuthService from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('user-token'))
  const loading = ref(false)
  const error = ref('')

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userDisplayName = computed(() => user.value?.name || user.value?.email || 'User')

  /**
   * Login user dengan email dan password
   * @param {string} email - Email pengguna
   * @param {string} password - Password pengguna
   * @returns {Promise<void>}
   */
  const login = async (email, password) => {
    try {
      loading.value = true
      error.value = ''
      
      // Validasi input
      if (!email || !password) {
        throw new Error('Email dan password harus diisi')
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Format email tidak valid')
      }
      
      if (password.length < 6) {
        throw new Error('Password minimal 6 karakter')
      }

      const userData = await AuthService.login(email, password)
      
      user.value = userData
      token.value = localStorage.getItem('user-token')
      
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat login'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout user dan bersihkan state
   */
  const logout = () => {
    try {
      // Clear server session (dalam real app, ini akan call API logout)
      // await api.post('/auth/logout')
      
      AuthService.logout()
      user.value = null
      token.value = null
      error.value = ''
      
      // Clear all notifications on logout
      // Gunakan setTimeout untuk memastikan redirect selesai dulu
      setTimeout(() => {
        // Jika ada appStore yang tersedia
        if (window.appStore) {
          window.appStore.clearNotifications()
        }
      }, 100)
      
    } catch (err) {
      console.error('Error during logout:', err)
      // Force logout even if there's an error
      user.value = null
      token.value = null
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-data')
    }
  }

  /**
   * Register user baru
   * @param {string} email - Email pengguna
   * @param {string} password - Password pengguna  
   * @param {string} name - Nama pengguna
   * @returns {Promise<void>}
   */
  const register = async (email, password, name) => {
    try {
      loading.value = true
      error.value = ''
      
      // Validasi input
      if (!email || !password || !name) {
        throw new Error('Semua field harus diisi')
      }
      
      if (!isValidEmail(email)) {
        throw new Error('Format email tidak valid')
      }
      
      if (password.length < 6) {
        throw new Error('Password minimal 6 karakter')
      }
      
      if (name.length < 2) {
        throw new Error('Nama minimal 2 karakter')
      }

      const userData = await AuthService.signup(email, password, name)
      
      user.value = userData
      token.value = localStorage.getItem('user-token')
      
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat registrasi'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Initialize user dari localStorage saat app dimuat
   */
  const initializeAuth = () => {
    try {
      const storedUser = localStorage.getItem('user-data')
      const storedToken = localStorage.getItem('user-token')
      
      if (storedUser && storedToken) {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
      }
    } catch (err) {
      console.error('Error initializing auth:', err)
      // Clear corrupted data
      logout()
    }
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = ''
  }

  /**
   * Validasi format email
   * @param {string} email - Email yang akan divalidasi
   * @returns {boolean}
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userDisplayName,
    
    // Actions
    login,
    logout,
    register,
    initializeAuth,
    clearError
  }
})