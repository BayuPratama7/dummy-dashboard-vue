/**
 * Pinia store untuk manajemen state aplikasi global
 * Mengelola notifikasi, sidebar, dan pengaturan UI
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const sidebarOpen = ref(false)
  const notifications = ref([])
  const loading = ref(false)
  const darkMode = ref(false)

  /**
   * Toggle sidebar mobile
   */
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  /**
   * Close sidebar
   */
  const closeSidebar = () => {
    sidebarOpen.value = false
  }

  /**
   * Tambah notifikasi baru
   * @param {Object} notification - Data notifikasi
   * @param {string} notification.type - Tipe notifikasi (success, error, warning, info)
   * @param {string} notification.message - Pesan notifikasi
   * @param {number} notification.duration - Durasi tampil (ms), default 5000
   */
  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: notification.type || 'info',
      message: notification.message,
      duration: notification.duration || 5000,
      timestamp: new Date()
    }
    
    notifications.value.push(newNotification)
    
    // Auto remove setelah duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  /**
   * Remove notifikasi berdasarkan ID
   * @param {number} id - ID notifikasi
   */
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * Clear semua notifikasi
   */
  const clearNotifications = () => {
    notifications.value = []
  }

  /**
   * Set loading state global
   * @param {boolean} state - Loading state
   */
  const setLoading = (state) => {
    loading.value = state
  }

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    localStorage.setItem('darkMode', darkMode.value.toString())
    
    // Apply to document
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Initialize app settings dari localStorage
   */
  const initializeApp = () => {
    try {
      // Initialize dark mode
      const storedDarkMode = localStorage.getItem('darkMode')
      if (storedDarkMode) {
        darkMode.value = storedDarkMode === 'true'
        if (darkMode.value) {
          document.documentElement.classList.add('dark')
        }
      }
      
      // Initialize sidebar state untuk desktop
      if (window.innerWidth >= 1024) {
        sidebarOpen.value = true
      }
      
    } catch (err) {
      console.error('Error initializing app:', err)
    }
  }

  return {
    // State
    sidebarOpen,
    notifications,
    loading,
    darkMode,
    
    // Actions
    toggleSidebar,
    closeSidebar,
    addNotification,
    removeNotification,
    clearNotifications,
    setLoading,
    toggleDarkMode,
    initializeApp
  }
})