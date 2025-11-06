<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Kursus</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola semua kursus dan materi pembelajaran</p>
          </div>
          <button
            @click="showCreateModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Tambah Kursus
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <AcademicCapIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Kursus</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalCourses }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <UserGroupIcon class="h-6 w-6 text-green-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Siswa</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalStudents }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <BookOpenIcon class="h-6 w-6 text-yellow-600" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Kursus Aktif</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.activeCourses }}</dd>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Tingkat Penyelesaian</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.completionRate }}%</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div class="flex-1 max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari kursus..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div class="flex space-x-3">
              <select
                v-model="selectedCategory"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Semua Kategori</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
              </select>
              <select
                v-model="selectedStatus"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
                <option value="archived">Arsip</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Courses Table -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="min-w-full divide-y divide-gray-200">
          <div class="bg-gray-50 px-6 py-3">
            <div class="flex items-center justify-between">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Daftar Kursus</h3>
              <span class="text-sm text-gray-500">{{ filteredCourses.length }} kursus</span>
            </div>
          </div>
          
          <div class="bg-white divide-y divide-gray-200">
            <div v-if="loading" class="px-6 py-12 text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p class="mt-2 text-sm text-gray-500">Memuat data kursus...</p>
            </div>
            
            <div v-else-if="filteredCourses.length === 0" class="px-6 py-12 text-center">
              <BookOpenIcon class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada kursus</h3>
              <p class="mt-1 text-sm text-gray-500">Mulai dengan membuat kursus pertama Anda.</p>
            </div>
            
            <div v-else>
              <div
                v-for="course in paginatedCourses"
                :key="course.id"
                class="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        :src="course.thumbnail"
                        :alt="course.title"
                        class="h-16 w-16 rounded-lg object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-lg font-medium text-gray-900 truncate">{{ course.title }}</h4>
                      <p class="text-sm text-gray-500 mt-1">{{ course.description }}</p>
                      <div class="flex items-center mt-2 space-x-4">
                        <span :class="getStatusBadgeClass(course.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                          {{ getStatusText(course.status) }}
                        </span>
                        <span class="text-xs text-gray-500">{{ course.category }}</span>
                        <span class="text-xs text-gray-500">{{ course.students }} siswa</span>
                        <span class="text-xs text-gray-500">{{ course.duration }} jam</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      @click="viewCourse(course)"
                      class="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <EyeIcon class="h-4 w-4" />
                    </button>
                    <button
                      @click="editCourse(course)"
                      class="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PencilIcon class="h-4 w-4" />
                    </button>
                    <button
                      @click="deleteCourse(course)"
                      class="inline-flex items-center p-2 border border-red-300 rounded-md shadow-sm bg-white text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Menampilkan {{ ((currentPage - 1) * itemsPerPage) + 1 }} sampai {{ Math.min(currentPage * itemsPerPage, filteredCourses.length) }} dari {{ filteredCourses.length }} kursus
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage <= 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Course Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showCreateModal = false"></div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveCourse">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                {{ editingCourse ? 'Edit Kursus' : 'Tambah Kursus Baru' }}
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Judul Kursus</label>
                  <input
                    v-model="courseForm.title"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <textarea
                    v-model="courseForm.description"
                    rows="3"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Kategori</label>
                    <select
                      v-model="courseForm.category"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Durasi (Jam)</label>
                    <input
                      v-model.number="courseForm.duration"
                      type="number"
                      min="1"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    v-model="courseForm.status"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Aktif</option>
                    <option value="archived">Arsip</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                :disabled="saving"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ saving ? 'Menyimpan...' : (editingCourse ? 'Update' : 'Simpan') }}
              </button>
              <button
                type="button"
                @click="showCreateModal = false"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Courses Management Page
 * Halaman untuk mengelola kursus dengan fitur CRUD lengkap
 */
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()

// State
const loading = ref(false)
const saving = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showCreateModal = ref(false)
const editingCourse = ref(null)

// Stats
const stats = ref({
  totalCourses: 24,
  totalStudents: 1250,
  activeCourses: 18,
  completionRate: 85
})

// Course form
const courseForm = ref({
  title: '',
  description: '',
  category: '',
  duration: '',
  status: 'draft'
})

// Sample courses data
const courses = ref([
  {
    id: 1,
    title: 'Vue.js Fundamentals',
    description: 'Pelajari dasar-dasar Vue.js dari nol hingga mahir',
    category: 'programming',
    status: 'active',
    students: 156,
    duration: 8,
    thumbnail: 'https://via.placeholder.com/64x64?text=Vue'
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    description: 'Panduan lengkap desain antarmuka yang user-friendly',
    category: 'design',
    status: 'active',
    students: 89,
    duration: 12,
    thumbnail: 'https://via.placeholder.com/64x64?text=UI'
  },
  {
    id: 3,
    title: 'Digital Marketing Strategy',
    description: 'Strategi pemasaran digital untuk era modern',
    category: 'marketing',
    status: 'draft',
    students: 45,
    duration: 6,
    thumbnail: 'https://via.placeholder.com/64x64?text=DM'
  },
  {
    id: 4,
    title: 'Business Analytics',
    description: 'Analisis data untuk pengambilan keputusan bisnis',
    category: 'business',
    status: 'active',
    students: 78,
    duration: 10,
    thumbnail: 'https://via.placeholder.com/64x64?text=BA'
  },
  {
    id: 5,
    title: 'React Development',
    description: 'Membangun aplikasi web modern dengan React',
    category: 'programming',
    status: 'active',
    students: 134,
    duration: 15,
    thumbnail: 'https://via.placeholder.com/64x64?text=React'
  }
])

// Computed
const filteredCourses = computed(() => {
  let filtered = courses.value

  if (searchQuery.value) {
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(course => course.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(course => course.status === selectedStatus.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage.value))

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCourses.value.slice(start, end)
})

// Methods
const getStatusBadgeClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || classes.draft
}

const getStatusText = (status) => {
  const texts = {
    active: 'Aktif',
    draft: 'Draft',
    archived: 'Arsip'
  }
  return texts[status] || 'Draft'
}

const viewCourse = (course) => {
  appStore.addNotification({
    type: 'info',
    message: `Melihat detail kursus: ${course.title}`,
    duration: 3000
  })
}

const editCourse = (course) => {
  editingCourse.value = course
  courseForm.value = { ...course }
  showCreateModal.value = true
}

const deleteCourse = (course) => {
  if (confirm(`Apakah Anda yakin ingin menghapus kursus "${course.title}"?`)) {
    const index = courses.value.findIndex(c => c.id === course.id)
    if (index > -1) {
      courses.value.splice(index, 1)
      appStore.addNotification({
        type: 'success',
        message: `Kursus "${course.title}" berhasil dihapus`,
        duration: 3000
      })
    }
  }
}

const saveCourse = async () => {
  try {
    saving.value = true

    if (editingCourse.value) {
      // Update existing course
      const index = courses.value.findIndex(c => c.id === editingCourse.value.id)
      if (index > -1) {
        courses.value[index] = { ...courses.value[index], ...courseForm.value }
        appStore.addNotification({
          type: 'success',
          message: 'Kursus berhasil diperbarui',
          duration: 3000
        })
      }
    } else {
      // Create new course
      const newCourse = {
        id: Date.now(),
        ...courseForm.value,
        students: 0,
        thumbnail: `https://via.placeholder.com/64x64?text=${courseForm.value.title.charAt(0)}`
      }
      courses.value.unshift(newCourse)
      appStore.addNotification({
        type: 'success',
        message: 'Kursus baru berhasil ditambahkan',
        duration: 3000
      })
    }

    // Reset form
    showCreateModal.value = false
    editingCourse.value = null
    courseForm.value = {
      title: '',
      description: '',
      category: '',
      duration: '',
      status: 'draft'
    }

  } catch (error) {
    console.error('Error saving course:', error)
    appStore.addNotification({
      type: 'error',
      message: 'Terjadi kesalahan saat menyimpan kursus',
      duration: 3000
    })
  } finally {
    saving.value = false
  }
}

// Lifecycle
onMounted(() => {
  appStore.addNotification({
    type: 'info',
    message: 'Selamat datang di halaman Manajemen Kursus',
    duration: 3000
  })
})
</script>