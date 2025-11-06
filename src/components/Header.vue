<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <!-- Left side - Mobile menu button & Title -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button
            @click="appStore.toggleSidebar"
            class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <span class="sr-only">Open sidebar</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <!-- Page title -->
          <div class="ml-4 md:ml-0">
            <h1 class="text-lg font-semibold text-gray-900">
              {{ pageTitle }}
            </h1>
          </div>
        </div>

        <!-- Right side - Search, Notifications, Profile -->
        <div class="flex items-center space-x-4">
          <!-- Search bar (hidden on mobile) -->
          <div class="hidden md:block">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <!-- Notifications -->
          <div class="relative">
            <button
              @click="toggleNotifications"
              :class="[
                'p-2 rounded-full transition-all duration-200 relative transform active:scale-95',
                showNotifications 
                  ? 'bg-blue-100 text-blue-600 shadow-md ring-2 ring-blue-200' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 hover:shadow-sm'
              ]"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon :class="[
                'h-6 w-6 transition-transform duration-200',
                showNotifications ? 'scale-110' : ''
              ]" />
              <!-- Notification badge -->
              <span 
                v-if="unreadNotificationsCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse shadow-lg ring-2 ring-white"
              >
                {{ unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount }}
              </span>
            </button>

            <!-- Notifications dropdown -->
            <div
              v-if="showNotifications"
              v-click-outside="closeNotifications"
              class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-200"
            >
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h3 class="text-xl font-semibold text-gray-900">Notifikasi</h3>
                  <button
                    @click="appStore.clearNotifications"
                    class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                  >
                    Hapus Semua
                  </button>
                </div>
              </div>
              
              <div class="max-h-96 overflow-y-auto">
                <div v-if="allNotifications.length === 0" class="p-8 text-center text-gray-500">
                  <BellIcon class="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <p class="text-base font-medium text-gray-400">Tidak ada notifikasi</p>
                  <p class="text-sm text-gray-400 mt-1">Semua notifikasi akan muncul di sini</p>
                </div>
                <div v-else>
                  <div 
                    v-for="notification in allNotifications" 
                    :key="notification.id"
                    :class="[
                      'p-4 border-b border-gray-100 transition-colors duration-200 cursor-pointer',
                      notification.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100',
                      getNotificationBorderClass(notification.type)
                    ]"
                    @click="handleNotificationClick(notification)"
                  >
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0 mt-1">
                        <div :class="[
                          getNotificationIconClass(notification.type),
                          'relative'
                        ]">
                          <component :is="getNotificationIcon(notification.type)" class="h-5 w-5" />
                          <div v-if="!notification.read" class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between">
                          <div class="flex-1">
                            <h4 :class="[
                              'text-sm font-medium truncate',
                              notification.read ? 'text-gray-900' : 'text-blue-900'
                            ]">
                              {{ notification.title || notification.message }}
                            </h4>
                            <p v-if="notification.title" :class="[
                              'text-sm mt-1',
                              notification.read ? 'text-gray-600' : 'text-blue-700'
                            ]">
                              {{ notification.message }}
                            </p>
                            <div class="flex items-center mt-2 space-x-2">
                              <span class="text-xs text-gray-500">
                                {{ formatTime(notification.timestamp) }}
                              </span>
                              <span v-if="notification.actionUrl" class="inline-flex items-center text-xs text-blue-600 font-medium">
                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                                Lihat Detail
                              </span>
                            </div>
                          </div>
                          <button
                            @click.stop="markAsRead(notification)"
                            v-if="!notification.read"
                            class="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                            title="Tandai sudah dibaca"
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Footer Actions -->
                <div v-if="allNotifications.length > 0" class="p-4 border-t border-gray-200 bg-gray-50">
                  <div class="flex justify-between items-center">
                    <button 
                      @click="markAllAsRead"
                      v-if="unreadNotificationsCount > 0"
                      class="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                      Tandai Semua Dibaca ({{ unreadNotificationsCount }})
                    </button>
                    <button 
                      @click="viewAllNotifications"
                      class="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      Lihat Semua →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile dropdown -->
          <div class="relative">
            <button
              @click="toggleProfileMenu"
              :class="[
                'flex items-center p-2 rounded-lg text-sm transition-all duration-200 transform active:scale-95',
                showProfileMenu 
                  ? 'bg-blue-50 ring-2 ring-blue-500 ring-offset-2 shadow-md' 
                  : 'hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              ]"
            >
              <span class="sr-only">Open user menu</span>
              <div :class="[
                'h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200',
                showProfileMenu ? 'bg-blue-500' : 'bg-gray-300'
              ]">
                <span :class="[
                  'font-medium text-sm',
                  showProfileMenu ? 'text-white' : 'text-gray-600'
                ]">
                  {{ userProfile.avatar }}
                </span>
              </div>
              <div class="ml-2 hidden md:block text-left">
                <p :class="[
                  'text-sm font-medium transition-colors duration-200',
                  showProfileMenu ? 'text-blue-900' : 'text-gray-700'
                ]">{{ userDisplayName }}</p>
                <p class="text-xs text-gray-500">{{ userEmail }}</p>
              </div>
              <svg 
                :class="[
                  'ml-2 h-4 w-4 transition-all duration-200',
                  showProfileMenu 
                    ? 'text-blue-600 rotate-180' 
                    : 'text-gray-400'
                ]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile dropdown menu -->
            <div
              v-if="showProfileMenu"
              v-click-outside="closeProfileMenu"
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 transform transition-all duration-200 ease-out scale-100"
            >
              <div class="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <div class="flex items-center space-x-4">
                  <div class="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                    <span class="text-white font-semibold text-lg">
                      {{ userProfile.avatar }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold text-gray-900">{{ userDisplayName }}</h3>
                    <p class="text-sm text-gray-600">{{ userEmail }}</p>
                    <div class="flex items-center mt-2 space-x-4">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ userProfile.role }}
                      </span>
                      <span class="text-xs text-gray-500">
                        Login terakhir: {{ formatTime(userProfile.lastLogin) }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Quick Stats -->
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="text-lg font-semibold text-blue-600">{{ userProfile.totalCourses }}</div>
                    <div class="text-xs text-gray-600">Total Kursus</div>
                  </div>
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="text-lg font-semibold text-green-600">{{ userProfile.totalStudents.toLocaleString() }}</div>
                    <div class="text-xs text-gray-600">Total Siswa</div>
                  </div>
                </div>
              </div>
              
              <div class="py-2">
                <button 
                  @click="navigateToProfile"
                  class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                >
                  <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="font-medium">Profil Saya</span>
                </button>
                <button 
                  @click="navigateToSettings"
                  class="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                >
                  <svg class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-medium">Pengaturan</span>
                </button>
                <button
                  @click="toggleDarkMode"
                  class="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                >
                  <div class="flex items-center">
                    <svg v-if="!appStore.darkMode" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <svg v-else class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="font-medium">{{ appStore.darkMode ? 'Mode Terang' : 'Mode Gelap' }}</span>
                  </div>
                  <div :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                    appStore.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  ]">
                    <span :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200',
                      appStore.darkMode ? 'translate-x-6' : 'translate-x-1'
                    ]" />
                  </div>
                </button>
              </div>
              
              <div class="border-t border-gray-200 py-2">
                <button
                  @click="showLogoutModal = true; closeProfileMenu()"
                  class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                >
                  <svg class="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Logout Confirmation Modal -->
  <LogoutModal 
    :show="showLogoutModal"
    :loading="logoutLoading"
    @confirm="handleLogout"
    @cancel="showLogoutModal = false"
  />
</template>

<script setup>
/**
 * Header Component - Navigation header dengan search, notifications, dan profile menu
 * Menggunakan Pinia untuk state management
 */
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useAppStore } from '../stores/app'
import LogoutModal from './LogoutModal.vue'

// Stores
const authStore = useAuthStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

// Local state
const searchQuery = ref('')
const showNotifications = ref(false)
const showProfileMenu = ref(false)
const showLogoutModal = ref(false)
const logoutLoading = ref(false)

// Sample notifications data
const sampleNotifications = ref([
  {
    id: 1,
    type: 'success',
    title: 'Kursus Berhasil Dipublikasikan',
    message: 'Kursus "Vue.js Fundamentals" telah berhasil dipublikasikan dan dapat diakses oleh siswa.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 menit lalu
    read: false,
    actionUrl: '/courses'
  },
  {
    id: 2,
    type: 'info',
    title: 'Siswa Baru Bergabung',
    message: '25 siswa baru telah mendaftar hari ini. Total siswa aktif sekarang mencapai 1,275 orang.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 menit lalu
    read: false,
    actionUrl: '/users'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Pemeliharaan Server Terjadwal',
    message: 'Sistem akan menjalani pemeliharaan rutin pada Minggu, 10 November 2024 pukul 02:00 - 04:00 WIB.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
    read: true,
    actionUrl: null
  },
  {
    id: 4,
    type: 'success',
    title: 'Laporan Bulanan Siap',
    message: 'Laporan kinerja bulan Oktober telah siap dan dapat diunduh dari halaman Reports.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 jam lalu
    read: true,
    actionUrl: '/reports'
  },
  {
    id: 5,
    type: 'error',
    title: 'Kesalahan Upload Video',
    message: 'Video untuk materi "Advanced JavaScript Concepts" gagal diunggah. Silakan coba lagi.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 jam lalu
    read: false,
    actionUrl: '/courses'
  }
])

// User profile data
const userProfile = ref({
  name: 'Bayubys07',
  email: 'bayubys07@gmail.com',
  role: 'Administrator',
  avatar: 'B',
  lastLogin: new Date(Date.now() - 1000 * 60 * 30), // 30 menit lalu
  totalCourses: 24,
  totalStudents: 1275,
  accountCreated: new Date('2023-01-15'),
  preferences: {
    language: 'id',
    timezone: 'Asia/Jakarta',
    notifications: {
      email: true,
      push: true,
      desktop: false
    }
  }
})

/**
 * Computed properties
 */
const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/users': 'Manajemen Pengguna',
    '/courses': 'Manajemen Kursus',
    '/reports': 'Laporan',
    '/docs': 'Dokumentasi',
    '/settings': 'Pengaturan'
  }
  return titles[route.path] || 'SUMU Learning Management System'
})

const unreadNotificationsCount = computed(() => {
  return sampleNotifications.value.filter(n => !n.read).length
})

// Get combined notifications (from store + sample data)
const allNotifications = computed(() => {
  const storeNotifications = appStore.notifications.map(n => ({
    ...n,
    title: 'Notifikasi Sistem',
    read: false,
    actionUrl: null
  }))
  return [...sampleNotifications.value, ...storeNotifications]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10) // Limit to 10 most recent
})

// User display name from profile data
const userDisplayName = computed(() => {
  return userProfile.value.name || authStore.userDisplayName
})

// User email from profile data  
const userEmail = computed(() => {
  return userProfile.value.email || authStore.user?.email
})

/**
 * Notification methods
 */
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showProfileMenu.value = false
}

const closeNotifications = () => {
  showNotifications.value = false
}

/**
 * Profile menu methods
 */
const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
  showNotifications.value = false
}

const closeProfileMenu = () => {
  showProfileMenu.value = false
}

/**
 * Navigation methods
 */
const navigateToProfile = () => {
  closeProfileMenu()
  router.push('/settings')
  appStore.addNotification({
    type: 'info',
    message: 'Navigasi ke halaman profil',
    duration: 2000
  })
}

const navigateToSettings = () => {
  closeProfileMenu()
  router.push('/settings')
  appStore.addNotification({
    type: 'info',
    message: 'Navigasi ke halaman pengaturan',
    duration: 2000
  })
}

const toggleDarkMode = () => {
  appStore.toggleDarkMode()
  appStore.addNotification({
    type: 'success',
    message: `Mode ${appStore.darkMode ? 'gelap' : 'terang'} diaktifkan`,
    duration: 2000
  })
}

/**
 * Notification methods
 */
const handleNotificationClick = (notification) => {
  // Mark as read when clicked
  if (!notification.read) {
    markAsRead(notification)
  }
  
  // Navigate if has action URL
  if (notification.actionUrl) {
    closeNotifications()
    router.push(notification.actionUrl)
    appStore.addNotification({
      type: 'info',
      message: `Navigasi ke ${notification.actionUrl}`,
      duration: 2000
    })
  }
}

const markAsRead = (notification) => {
  const index = sampleNotifications.value.findIndex(n => n.id === notification.id)
  if (index > -1) {
    sampleNotifications.value[index].read = true
  }
}

const markAllAsRead = () => {
  sampleNotifications.value.forEach(n => n.read = true)
  appStore.addNotification({
    type: 'success',
    message: 'Semua notifikasi telah ditandai dibaca',
    duration: 2000
  })
}

const viewAllNotifications = () => {
  closeNotifications()
  router.push('/dashboard') // Atau halaman khusus notifikasi
  appStore.addNotification({
    type: 'info',
    message: 'Melihat semua notifikasi',
    duration: 2000
  })
}

/**
 * Profile methods
 */
const viewProfileDetails = () => {
  closeProfileMenu()
  router.push('/settings')
  appStore.addNotification({
    type: 'info',
    message: 'Membuka halaman profil',
    duration: 2000
  })
}

const editProfile = () => {
  closeProfileMenu()
  router.push('/settings')
  appStore.addNotification({
    type: 'info',
    message: 'Edit profil pengguna',
    duration: 2000
  })
}

/**
 * Notification icon helpers
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

const getNotificationIconClass = (type) => {
  const classes = {
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    error: 'bg-red-100 text-red-600',
    info: 'bg-blue-100 text-blue-600'
  }
  return `flex h-8 w-8 items-center justify-center rounded-full ${classes[type] || classes.info}`
}

const getNotificationBorderClass = (type) => {
  const classes = {
    success: 'border-l-4 border-green-500',
    warning: 'border-l-4 border-yellow-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-blue-500'
  }
  return classes[type] || classes.info
}

/**
 * Logout handler
 */
const handleLogout = async () => {
  try {
    // Set loading state
    logoutLoading.value = true
    
    // Perform logout
    authStore.logout()
    
    // Close modals
    showLogoutModal.value = false
    closeProfileMenu()
    
    // Show success notification
    appStore.addNotification({
      type: 'success',
      message: 'Anda telah berhasil keluar dari sistem',
      duration: 3000
    })
    
    // Redirect to login page
    router.push('/login')
    
  } catch (error) {
    console.error('Logout error:', error)
    
    appStore.addNotification({
      type: 'error',
      message: 'Terjadi kesalahan saat logout',
      duration: 3000
    })
  } finally {
    logoutLoading.value = false
  }
}

/**
 * Format timestamp untuk notifikasi
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

/**
 * Click outside directive
 */
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

/**
 * Initialize component
 */
onMounted(() => {
  // Welcome notification
  setTimeout(() => {
    appStore.addNotification({
      type: 'info',
      message: 'Selamat datang kembali, ' + userDisplayName.value + '!',
      duration: 5000
    })
  }, 1000)

  // Simulate real-time notifications
  const notificationTypes = ['success', 'info', 'warning']
  const messages = [
    { type: 'success', title: 'Kursus Baru Dipublikasikan', message: 'Kursus "Advanced React Patterns" telah dipublikasikan.' },
    { type: 'info', title: 'Pembaruan Sistem', message: 'Fitur baru telah ditambahkan ke dashboard.' },
    { type: 'warning', title: 'Peringatan Kapasitas', message: 'Server mencapai 85% kapasitas.' },
    { type: 'success', title: 'Siswa Menyelesaikan Kursus', message: '12 siswa menyelesaikan kursus hari ini.' },
    { type: 'info', title: 'Laporan Tersedia', message: 'Laporan mingguan siap diunduh.' }
  ]

  // Add new notification every 30 seconds for demo
  setInterval(() => {
    if (sampleNotifications.value.length < 15) { // Limit notifications
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      sampleNotifications.value.unshift({
        id: Date.now(),
        ...randomMessage,
        timestamp: new Date(),
        read: false,
        actionUrl: randomMessage.type === 'success' ? '/courses' : '/dashboard'
      })
    }
  }, 30000) // Every 30 seconds

  // Update last login time
  userProfile.value.lastLogin = new Date()
})
</script>