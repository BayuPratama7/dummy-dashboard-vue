<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
            <p class="mt-1 text-sm text-gray-600">Dashboard dan laporan kinerja sistem pembelajaran</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="exportReport"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
              Export PDF
            </button>
            <select
              v-model="selectedPeriod"
              @change="updateReports"
              class="block pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="week">7 Hari Terakhir</option>
              <option value="month">30 Hari Terakhir</option>
              <option value="quarter">3 Bulan Terakhir</option>
              <option value="year">1 Tahun Terakhir</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <UserGroupIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Pengguna Aktif</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ metrics.activeUsers }}</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowUpIcon class="h-4 w-4 flex-shrink-0" />
                      <span>12%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <AcademicCapIcon class="h-6 w-6 text-green-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Kursus Diselesaikan</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ metrics.completedCourses }}</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowUpIcon class="h-4 w-4 flex-shrink-0" />
                      <span>8%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-yellow-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Rata-rata Waktu Belajar</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ metrics.avgLearningTime }}</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <ArrowDownIcon class="h-4 w-4 flex-shrink-0" />
                      <span>3%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ChartBarIcon class="h-6 w-6 text-purple-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Tingkat Kepuasan</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ metrics.satisfactionRate }}%</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowUpIcon class="h-4 w-4 flex-shrink-0" />
                      <span>5%</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- User Registration Chart -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Pendaftaran Pengguna</h3>
            <div class="text-sm text-gray-500">{{ selectedPeriod === 'week' ? '7 hari' : selectedPeriod === 'month' ? '30 hari' : selectedPeriod === 'quarter' ? '3 bulan' : '1 tahun' }} terakhir</div>
          </div>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <ChartBarIcon class="mx-auto h-12 w-12 text-gray-400" />
              <p class="mt-2 text-sm text-gray-500">Chart Pendaftaran Pengguna</p>
              <div class="mt-4 space-y-2">
                <div v-for="(value, date) in userRegistrationData" :key="date" class="flex justify-between items-center">
                  <span class="text-xs text-gray-600">{{ formatDate(date) }}</span>
                  <div class="flex items-center">
                    <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${(value / Math.max(...Object.values(userRegistrationData))) * 100}%` }"></div>
                    </div>
                    <span class="text-xs font-medium text-gray-900 w-8">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Course Completion Chart -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Penyelesaian Kursus</h3>
            <div class="text-sm text-gray-500">Per kategori</div>
          </div>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center w-full">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(data, category) in courseCompletionData" :key="category" class="text-center">
                  <div class="relative">
                    <div class="w-16 h-16 mx-auto">
                      <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          class="text-gray-200"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                        />
                        <path
                          :class="`text-${data.color}-600`"
                          :stroke-dasharray="`${data.percentage}, 100`"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                        />
                      </svg>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-xs font-medium">{{ data.percentage }}%</span>
                      </div>
                    </div>
                    <p class="mt-2 text-xs text-gray-600 capitalize">{{ category }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Kinerja Kursus Terpopuler</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kursus</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tingkat Penyelesaian</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pendapatan</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="course in topCourses" :key="course.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-8 w-8">
                      <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-xs font-medium text-gray-600">{{ course.title.charAt(0) }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ course.title }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {{ course.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ course.students }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div class="bg-green-600 h-2 rounded-full" :style="{ width: `${course.completionRate}%` }"></div>
                    </div>
                    <span class="text-sm text-gray-900">{{ course.completionRate }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400">
                      <StarIcon v-for="i in 5" :key="i" :class="i <= course.rating ? 'text-yellow-400' : 'text-gray-300'" class="h-4 w-4" />
                    </div>
                    <span class="ml-1 text-sm text-gray-600">({{ course.rating }})</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ formatCurrency(course.revenue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Aktivitas Terbaru</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div v-for="activity in recentActivities" :key="activity.id" class="px-6 py-4">
            <div class="flex items-center space-x-3">
              <div :class="getActivityIconClass(activity.type)" class="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center">
                <component :is="getActivityIcon(activity.type)" class="h-4 w-4" />
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900">{{ activity.message }}</p>
                <p class="text-xs text-gray-500">{{ formatTime(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Reports & Analytics Page
 * Halaman untuk menampilkan laporan dan analitik sistem
 */
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import {
  ArrowDownTrayIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import {
  CheckCircleIcon,
  UserPlusIcon,
  BookOpenIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/solid'

const appStore = useAppStore()

// State
const selectedPeriod = ref('month')
const loading = ref(false)

// Metrics
const metrics = ref({
  activeUsers: 1247,
  completedCourses: 348,
  avgLearningTime: '2.5h',
  satisfactionRate: 92
})

// Sample data for charts
const userRegistrationData = ref({
  '2024-11-01': 25,
  '2024-11-02': 32,
  '2024-11-03': 18,
  '2024-11-04': 41,
  '2024-11-05': 28,
  '2024-11-06': 35,
  '2024-11-07': 22
})

const courseCompletionData = ref({
  programming: { percentage: 85, color: 'blue' },
  design: { percentage: 72, color: 'green' },
  business: { percentage: 68, color: 'yellow' },
  marketing: { percentage: 91, color: 'purple' }
})

const topCourses = ref([
  {
    id: 1,
    title: 'Vue.js Fundamentals',
    category: 'programming',
    students: 245,
    completionRate: 89,
    rating: 4.8,
    revenue: 125000
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    category: 'design',
    students: 189,
    completionRate: 76,
    rating: 4.6,
    revenue: 98000
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy',
    category: 'marketing',
    students: 156,
    completionRate: 82,
    rating: 4.7,
    revenue: 87500
  },
  {
    id: 4,
    title: 'Business Analytics',
    category: 'business',
    students: 134,
    completionRate: 73,
    rating: 4.5,
    revenue: 76000
  },
  {
    id: 5,
    title: 'React Development',
    category: 'programming',
    students: 198,
    completionRate: 91,
    rating: 4.9,
    revenue: 145000
  }
])

const recentActivities = ref([
  {
    id: 1,
    type: 'user_registered',
    message: '15 pengguna baru mendaftar hari ini',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: 2,
    type: 'course_completed',
    message: 'Sarah M. menyelesaikan kursus "Vue.js Fundamentals"',
    timestamp: new Date(Date.now() - 1000 * 60 * 45)
  },
  {
    id: 3,
    type: 'course_published',
    message: 'Kursus baru "Advanced JavaScript" telah dipublikasikan',
    timestamp: new Date(Date.now() - 1000 * 60 * 90)
  },
  {
    id: 4,
    type: 'warning',
    message: 'Server mengalami beban tinggi pada jam 14:00',
    timestamp: new Date(Date.now() - 1000 * 60 * 120)
  }
])

// Methods
const updateReports = () => {
  loading.value = true
  
  // Simulate API call
  setTimeout(() => {
    // Update data based on selected period
    if (selectedPeriod.value === 'week') {
      metrics.value.activeUsers = 856
      metrics.value.completedCourses = 142
    } else if (selectedPeriod.value === 'month') {
      metrics.value.activeUsers = 1247
      metrics.value.completedCourses = 348
    } else if (selectedPeriod.value === 'quarter') {
      metrics.value.activeUsers = 2156
      metrics.value.completedCourses = 789
    } else {
      metrics.value.activeUsers = 4523
      metrics.value.completedCourses = 2156
    }
    
    loading.value = false
    
    appStore.addNotification({
      type: 'info',
      message: `Laporan berhasil diperbarui untuk periode ${selectedPeriod.value}`,
      duration: 3000
    })
  }, 1000)
}

const exportReport = () => {
  appStore.addNotification({
    type: 'info',
    message: 'Laporan sedang diekspor ke PDF...',
    duration: 3000
  })
  
  // Simulate export process
  setTimeout(() => {
    appStore.addNotification({
      type: 'success',
      message: 'Laporan berhasil diekspor! File akan diunduh.',
      duration: 3000
    })
  }, 2000)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { 
    day: '2-digit', 
    month: 'short' 
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatTime = (timestamp) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = now - time
  
  if (diff < 60000) return 'Baru saja'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit yang lalu`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam yang lalu`
  return `${Math.floor(diff / 86400000)} hari yang lalu`
}

const getActivityIcon = (type) => {
  const icons = {
    user_registered: UserPlusIcon,
    course_completed: CheckCircleIcon,
    course_published: BookOpenIcon,
    warning: ExclamationTriangleIcon
  }
  return icons[type] || CheckCircleIcon
}

const getActivityIconClass = (type) => {
  const classes = {
    user_registered: 'bg-blue-100 text-blue-600',
    course_completed: 'bg-green-100 text-green-600',
    course_published: 'bg-purple-100 text-purple-600',
    warning: 'bg-yellow-100 text-yellow-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

// Lifecycle
onMounted(() => {
  appStore.addNotification({
    type: 'info',
    message: 'Dashboard laporan telah dimuat',
    duration: 3000
  })
})
</script>