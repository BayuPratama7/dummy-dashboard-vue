<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="appStore.sidebarOpen" 
      class="fixed inset-0 z-40 md:hidden"
      @click="appStore.closeSidebar"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"></div>
    </div>

    <!-- Mobile sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition duration-300 ease-in-out md:hidden',
        appStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div class="flex items-center">
          <div class="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">S</span>
          </div>
          <span class="ml-2 text-xl font-bold text-gray-900">SUMU</span>
        </div>
        <button
          @click="appStore.closeSidebar"
          class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <router-link 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href"
            @click="appStore.closeSidebar"
            :class="[
              'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isCurrentRoute(item.href) 
                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <component 
              :is="item.icon" 
              :class="[
                'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200',
                isCurrentRoute(item.href) ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
              ]" 
              aria-hidden="true" 
            />
            {{ item.name }}
            <span 
              v-if="item.badge" 
              class="ml-auto inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </nav>

      <!-- Mobile user section -->
      <div class="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50">
        <div class="p-4">
          <div class="flex items-center mb-3">
            <div class="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span class="text-gray-600 text-sm font-medium">
                {{ authStore.userDisplayName.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="ml-3 flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ authStore.userDisplayName }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ authStore.user?.email }}
              </p>
            </div>
          </div>
          
          <!-- Mobile logout button -->
          <button
            @click="handleMobileLogout"
            class="w-full flex items-center justify-center px-3 py-2 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
          >
            <svg class="mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col">
      <div class="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
        <!-- Logo -->
        <div class="flex h-16 items-center px-4 border-b border-gray-200">
          <div class="flex items-center">
            <div class="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">S</span>
            </div>
            <span class="ml-2 text-xl font-bold text-gray-900">SUMU</span>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="mt-6 flex-1 px-3">
          <div class="space-y-1">
            <router-link 
              v-for="item in navigation" 
              :key="item.name" 
              :to="item.href"
              :class="[
                'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isCurrentRoute(item.href) 
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <component 
                :is="item.icon" 
                :class="[
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200',
                  isCurrentRoute(item.href) ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                ]" 
                aria-hidden="true" 
              />
              {{ item.name }}
              <span 
                v-if="item.badge" 
                class="ml-auto inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full"
              >
                {{ item.badge }}
              </span>
            </router-link>
          </div>
        </nav>

        <!-- Desktop user section -->
        <div class="border-t border-gray-200 bg-gray-50">
          <div class="p-4">
            <div class="flex items-center mb-3">
              <div class="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-gray-600 text-sm font-medium">
                  {{ authStore.userDisplayName.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="ml-3 flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ authStore.userDisplayName }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ authStore.user?.email }}
                </p>
              </div>
            </div>
            
            <!-- Desktop logout button -->
            <button
              @click="handleMobileLogout"
              class="w-full flex items-center justify-center px-3 py-2 text-sm text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
            >
              <svg class="mr-2 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="p-4 sm:p-6 lg:p-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
/**
 * Layout Component - Main layout dengan sidebar dan header
 * Menggunakan Pinia untuk state management sidebar dan user info
 */
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useAppStore } from '../stores/app'
import Header from './Header.vue'

// Stores
const authStore = useAuthStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

/**
 * Navigation items untuk sidebar
 */
const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: UserGroupIcon,
    badge: '12' // Example badge
  },
  { 
    name: 'Courses', 
    href: '/courses', 
    icon: AcademicCapIcon 
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: ChartBarIcon 
  },
  { 
    name: 'Documentation', 
    href: '/docs', 
    icon: DocumentTextIcon 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Cog6ToothIcon 
  },
]

/**
 * Check apakah route saat ini aktif
 * @param {string} href - Route path yang akan dicek
 * @returns {boolean}
 */
const isCurrentRoute = (href) => {
  return route.path === href || route.path.startsWith(href + '/')
}

/**
 * Handle logout untuk mobile/sidebar
 */
const handleMobileLogout = async () => {
  try {
    const confirmed = confirm('Apakah Anda yakin ingin keluar dari sistem?')
    
    if (!confirmed) {
      return
    }
    
    // Perform logout
    authStore.logout()
    
    // Close sidebar if open
    appStore.closeSidebar()
    
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
  }
}

/**
 * Initialize component
 */
onMounted(() => {
  // Initialize auth state
  authStore.initializeAuth()
  
  // Initialize app state
  appStore.initializeApp()
})
</script>