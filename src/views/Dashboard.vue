<template>
  <Layout>
    <!-- Welcome Section -->
    <div class="mb-8">
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">
              Selamat datang, {{ authStore.userDisplayName }}! 👋
            </h1>
            <p class="mt-2 text-blue-100">
              Mari kita lihat progress pembelajaran hari ini
            </p>
          </div>
          <div class="hidden md:block">
            <div class="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div class="text-center">
                <div class="text-2xl font-bold">{{ currentDate.day }}</div>
                <div class="text-sm">{{ currentDate.month }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="mb-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.name"
          class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Background Pattern -->
          <div class="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 opacity-10">
            <component :is="stat.icon" class="h-full w-full" />
          </div>
          
          <!-- Content -->
          <div class="relative">
            <div class="flex items-center">
              <div :class="stat.iconBg">
                <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
            </div>
            
            <div class="mt-4">
              <h3 class="text-sm font-medium text-gray-500">{{ stat.name }}</h3>
              <div class="mt-1 flex items-baseline">
                <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                <span 
                  v-if="stat.change"
                  :class="[
                    'ml-2 text-sm font-medium',
                    stat.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ stat.change.type === 'increase' ? '+' : '-' }}{{ stat.change.value }}%
                </span>
              </div>
              <p v-if="stat.description" class="mt-1 text-xs text-gray-500">
                {{ stat.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Quick Actions -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <button 
              v-for="action in quickActions"
              :key="action.name"
              @click="handleQuickAction(action.action)"
              class="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <div :class="action.iconBg">
                <component :is="action.icon" class="h-5 w-5 text-white" />
              </div>
              <div class="ml-3">
                <p class="font-medium text-gray-900">{{ action.name }}</p>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
            <router-link 
              to="/activity" 
              class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Lihat Semua
            </router-link>
          </div>
          
          <div class="flow-root">
            <ul class="-mb-8">
              <li 
                v-for="(activity, activityIdx) in recentActivity" 
                :key="activity.id"
                class="relative pb-8"
              >
                <div v-if="activityIdx !== recentActivity.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></div>
                <div class="relative flex space-x-3">
                  <div>
                    <div :class="activity.iconBg">
                      <component :is="activity.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div>
                      <div class="text-sm">
                        <span class="font-medium text-gray-900">{{ activity.user }}</span>
                        <span class="text-gray-500"> {{ activity.action }}</span>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">{{ activity.date }}</p>
                    </div>
                    <div v-if="activity.details" class="mt-2 text-sm text-gray-700">
                      <p>{{ activity.details }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Progress Section -->
    <div class="mt-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-6">Progress Kursus Terbaru</h3>
        <div class="space-y-4">
          <div 
            v-for="course in courseProgress"
            :key="course.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center space-x-4">
              <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AcademicCapIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ course.title }}</h4>
                <p class="text-sm text-gray-500">{{ course.instructor }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ course.progress }}%</div>
                <div class="text-xs text-gray-500">{{ course.completedLessons }}/{{ course.totalLessons }} lessons</div>
              </div>
              <div class="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${course.progress}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
/**
 * Dashboard View Component
 * Halaman utama dashboard dengan statistik, aktivitas terbaru, dan quick actions
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  UserIcon,
  ChartBarIcon,
  PlusIcon,
  DocumentPlusIcon,
  UserPlusIcon,
  PlayIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '../stores/auth'
import { useAppStore } from '../stores/app'
import Layout from '../components/Layout.vue'

// Stores
const authStore = useAuthStore()
const appStore = useAppStore()
const router = useRouter()

/**
 * Current date untuk display
 */
const currentDate = computed(() => {
  const now = new Date()
  return {
    day: now.getDate(),
    month: now.toLocaleDateString('id-ID', { month: 'short' })
  }
})

/**
 * Dashboard statistics
 */
const stats = ref([
  { 
    name: 'Total Users', 
    value: '1,234', 
    icon: UserGroupIcon,
    iconBg: 'bg-blue-500 rounded-md p-3',
    change: { type: 'increase', value: 12 },
    description: 'Pengguna aktif bulan ini'
  },
  { 
    name: 'Total Courses', 
    value: '45', 
    icon: AcademicCapIcon,
    iconBg: 'bg-green-500 rounded-md p-3',
    change: { type: 'increase', value: 8 },
    description: 'Kursus tersedia'
  },
  { 
    name: 'Active Coaches', 
    value: '12', 
    icon: UserIcon,
    iconBg: 'bg-purple-500 rounded-md p-3',
    change: { type: 'increase', value: 3 },
    description: 'Instruktur aktif'
  },
  { 
    name: 'Completion Rate', 
    value: '87%', 
    icon: ChartBarIcon,
    iconBg: 'bg-orange-500 rounded-md p-3',
    change: { type: 'increase', value: 5 },
    description: 'Tingkat penyelesaian'
  }
])

/**
 * Quick actions untuk dashboard
 */
const quickActions = ref([
  {
    name: 'Tambah Kursus Baru',
    description: 'Buat kursus pembelajaran baru',
    icon: DocumentPlusIcon,
    iconBg: 'bg-blue-500 rounded-md p-2',
    action: 'create-course'
  },
  {
    name: 'Tambah Pengguna',
    description: 'Undang pengguna baru',
    icon: UserPlusIcon,
    iconBg: 'bg-green-500 rounded-md p-2',
    action: 'add-user'
  },
  {
    name: 'Lihat Laporan',
    description: 'Analisis dan statistik',
    icon: ChartBarIcon,
    iconBg: 'bg-purple-500 rounded-md p-2',
    action: 'view-reports'
  }
])

/**
 * Recent activity dengan timeline format
 */
const recentActivity = ref([
  { 
    id: 1, 
    user: 'John Doe', 
    action: 'menyelesaikan kursus',
    details: 'Vue.js Fundamentals',
    date: '2 jam yang lalu',
    icon: AcademicCapIcon,
    iconBg: 'bg-green-500 rounded-full p-1.5'
  },
  { 
    id: 2, 
    user: 'Jane Smith', 
    action: 'memulai kursus baru',
    details: 'Advanced JavaScript Patterns', 
    date: '4 jam yang lalu',
    icon: PlayIcon,
    iconBg: 'bg-blue-500 rounded-full p-1.5'
  },
  { 
    id: 3, 
    user: 'Mike Johnson', 
    action: 'bergabung sebagai coach',
    details: 'Spesialisasi Frontend Development',
    date: '1 hari yang lalu',
    icon: UserIcon,
    iconBg: 'bg-purple-500 rounded-full p-1.5'
  },
  { 
    id: 4, 
    user: 'Sarah Wilson', 
    action: 'mengirim tugas',
    details: 'Project: Todo App with Vue.js',
    date: '2 hari yang lalu',
    icon: DocumentPlusIcon,
    iconBg: 'bg-orange-500 rounded-full p-1.5'
  }
])

/**
 * Course progress data
 */
const courseProgress = ref([
  {
    id: 1,
    title: 'Vue.js Fundamentals',
    instructor: 'Ahmad Fadli',
    progress: 75,
    completedLessons: 12,
    totalLessons: 16
  },
  {
    id: 2,
    title: 'JavaScript ES6+',
    instructor: 'Siti Nurhaliza',
    progress: 60,
    completedLessons: 9,
    totalLessons: 15
  },
  {
    id: 3,
    title: 'React Basics',
    instructor: 'Budi Santoso',
    progress: 30,
    completedLessons: 4,
    totalLessons: 12
  }
])

/**
 * Handle quick actions
 * @param {string} action - Action type yang akan dieksekusi
 */
const handleQuickAction = (action) => {
  try {
    switch (action) {
      case 'create-course':
        appStore.addNotification({
          type: 'info',
          message: 'Mengarahkan ke halaman pembuatan kursus...',
          duration: 2000
        })
        // router.push('/courses/create')
        break
        
      case 'add-user':
        appStore.addNotification({
          type: 'info',
          message: 'Mengarahkan ke halaman penambahan pengguna...',
          duration: 2000
        })
        // router.push('/users/add')
        break
        
      case 'view-reports':
        appStore.addNotification({
          type: 'info',
          message: 'Mengarahkan ke halaman laporan...',
          duration: 2000
        })
        // router.push('/reports')
        break
        
      default:
        appStore.addNotification({
          type: 'warning',
          message: 'Aksi belum tersedia',
          duration: 2000
        })
    }
  } catch (error) {
    console.error('Error handling quick action:', error)
    appStore.addNotification({
      type: 'error',
      message: 'Terjadi kesalahan saat memproses aksi',
      duration: 3000
    })
  }
}

/**
 * Load dashboard data
 */
const loadDashboardData = async () => {
  try {
    appStore.setLoading(true)
    
    // Simulate API calls untuk load data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update stats dengan data terbaru (mock)
    // Dalam aplikasi nyata, ini akan fetch dari API
    
    appStore.addNotification({
      type: 'success',
      message: 'Dashboard berhasil dimuat',
      duration: 2000
    })
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    appStore.addNotification({
      type: 'error',
      message: 'Gagal memuat data dashboard',
      duration: 5000
    })
  } finally {
    appStore.setLoading(false)
  }
}

/**
 * Initialize dashboard
 */
onMounted(async () => {
  // Check authentication
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  
  // Load dashboard data
  await loadDashboardData()
})
</script>