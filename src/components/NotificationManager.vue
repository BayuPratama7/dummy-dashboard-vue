/**
 * NotificationManager Component
 * Komponen untuk menampilkan notifikasi toast di bagian atas layar
 */
<template>
  <div class="fixed top-0 right-0 z-50 p-4 space-y-2">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in appStore.notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          getNotificationClass(notification.type)
        ]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component 
                :is="getNotificationIcon(notification.type)" 
                :class="getNotificationIconClass(notification.type)"
              />
            </div>
            <div class="ml-3 w-0 flex-1">
              <p :class="getNotificationTextClass(notification.type)">
                {{ notification.message }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ formatTime(notification.timestamp) }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="appStore.removeNotification(notification.id)"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()

/**
 * Get notification icon berdasarkan type
 */
const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon
  }
  return icons[type] || InformationCircleIcon
}

/**
 * Get notification class berdasarkan type
 */
const getNotificationClass = (type) => {
  const classes = {
    success: 'border-l-4 border-green-400',
    warning: 'border-l-4 border-yellow-400',
    error: 'border-l-4 border-red-400',
    info: 'border-l-4 border-blue-400'
  }
  return classes[type] || classes.info
}

/**
 * Get icon class berdasarkan type
 */
const getNotificationIconClass = (type) => {
  const classes = {
    success: 'h-6 w-6 text-green-400',
    warning: 'h-6 w-6 text-yellow-400',
    error: 'h-6 w-6 text-red-400',
    info: 'h-6 w-6 text-blue-400'
  }
  return classes[type] || classes.info
}

/**
 * Get text class berdasarkan type
 */
const getNotificationTextClass = (type) => {
  const classes = {
    success: 'text-sm font-medium text-gray-900',
    warning: 'text-sm font-medium text-gray-900',
    error: 'text-sm font-medium text-gray-900',
    info: 'text-sm font-medium text-gray-900'
  }
  return classes[type] || classes.info
}

/**
 * Format timestamp
 */
const formatTime = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = now - time
  
  if (diff < 60000) return 'Baru saja'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit yang lalu`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam yang lalu`
  return `${Math.floor(diff / 86400000)} hari yang lalu`
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>