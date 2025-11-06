<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main App Content -->
    <router-view />
    
    <!-- Global Notification Manager -->
    <NotificationManager />
  </div>
</template>

<script setup>
/**
 * Root App Component
 * Menginisialisasi aplikasi dan state management
 */
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useAppStore } from './stores/app'
import NotificationManager from './components/NotificationManager.vue'

// Stores
const authStore = useAuthStore()
const appStore = useAppStore()

/**
 * Initialize application
 */
onMounted(() => {
  // Initialize authentication state
  authStore.initializeAuth()
  
  // Initialize app settings
  appStore.initializeApp()
})
</script>