<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dokumentasi</h1>
            <p class="mt-1 text-sm text-gray-600">Panduan lengkap penggunaan SUMU Learning Management System</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="searchMode = !searchMode"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <MagnifyingGlassIcon class="h-5 w-5 mr-2" />
              {{ searchMode ? 'Tutup Pencarian' : 'Cari Dokumentasi' }}
            </button>
            <button
              @click="downloadPDF"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <ArrowDownTrayIcon class="h-5 w-5 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex">
        <!-- Sidebar Navigation -->
        <div class="w-64 flex-shrink-0 mr-8">
          <div class="bg-white shadow rounded-lg sticky top-6">
            <!-- Search Box -->
            <div v-if="searchMode" class="p-4 border-b border-gray-200">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari dalam dokumentasi..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="p-4">
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Daftar Isi</h3>
              <ul class="space-y-2">
                <li v-for="section in documentSections" :key="section.id">
                  <button
                    @click="activeSection = section.id; scrollToSection(section.id)"
                    :class="[
                      'w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200',
                      activeSection === section.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    ]"
                  >
                    <component :is="section.icon" class="h-4 w-4 inline mr-2" />
                    {{ section.title }}
                  </button>
                  <ul v-if="section.subsections && activeSection === section.id" class="ml-6 mt-2 space-y-1">
                    <li v-for="subsection in section.subsections" :key="subsection.id">
                      <button
                        @click="scrollToSection(subsection.id)"
                        class="w-full text-left px-2 py-1 text-xs text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {{ subsection.title }}
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <div class="bg-white shadow rounded-lg">
            <!-- Getting Started -->
            <section :id="'section-' + documentSections[0].id" class="p-8 border-b border-gray-200">
              <div class="flex items-center mb-6">
                <RocketLaunchIcon class="h-6 w-6 text-blue-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Memulai dengan SUMU LMS</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Selamat datang di SUMU Learning Management System. Panduan ini akan membantu Anda memahami fitur-fitur utama dan cara menggunakan platform dengan efektif.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Langkah Pertama</h3>
                <ol class="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Login menggunakan akun yang telah disediakan</li>
                  <li>Lengkapi profil Anda di menu Settings</li>
                  <li>Jelajahi dashboard untuk melihat statistik umum</li>
                  <li>Mulai mengelola kursus melalui menu Courses</li>
                </ol>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div class="flex">
                    <InformationCircleIcon class="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 class="text-sm font-medium text-blue-900">Tips:</h4>
                      <p class="text-sm text-blue-700 mt-1">
                        Gunakan fitur pencarian untuk menemukan informasi yang Anda butuhkan dengan cepat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Dashboard Overview -->
            <section :id="'section-' + documentSections[1].id" class="p-8 border-b border-gray-200">
              <div class="flex items-center mb-6">
                <ChartBarIcon class="h-6 w-6 text-green-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Dashboard memberikan gambaran menyeluruh tentang aktivitas dan kinerja sistem pembelajaran.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Fitur Dashboard</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 mb-2">Statistik Umum</h4>
                    <p class="text-sm text-gray-600">Lihat jumlah siswa aktif, kursus yang tersedia, dan tingkat penyelesaian.</p>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 mb-2">Aktivitas Terbaru</h4>
                    <p class="text-sm text-gray-600">Monitor aktivitas terbaru dari siswa dan instruktur.</p>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 mb-2">Kursus Populer</h4>
                    <p class="text-sm text-gray-600">Daftar kursus dengan tingkat partisipasi tertinggi.</p>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="font-medium text-gray-900 mb-2">Notifikasi</h4>
                    <p class="text-sm text-gray-600">Update penting dan pengumuman sistem.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Course Management -->
            <section :id="'section-' + documentSections[2].id" class="p-8 border-b border-gray-200">
              <div class="flex items-center mb-6">
                <AcademicCapIcon class="h-6 w-6 text-purple-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Manajemen Kursus</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Kelola semua kursus dengan mudah melalui interface yang intuitif.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Fitur Manajemen Kursus</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Tambah kursus baru dengan formulir yang lengkap</li>
                  <li>Edit informasi kursus yang sudah ada</li>
                  <li>Kelola status kursus (Draft, Aktif, Arsip)</li>
                  <li>Monitor jumlah siswa dan tingkat penyelesaian</li>
                  <li>Filter dan pencarian kursus berdasarkan kategori</li>
                </ul>

                <h3 class="text-lg font-semibold text-gray-900 mb-3">Membuat Kursus Baru</h3>
                <ol class="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                  <li>Klik tombol "Tambah Kursus" di halaman Courses</li>
                  <li>Isi informasi dasar: judul, deskripsi, kategori</li>
                  <li>Tentukan durasi estimasi pembelajaran</li>
                  <li>Pilih status kursus (Draft untuk review, Aktif untuk publikasi)</li>
                  <li>Klik "Simpan" untuk membuat kursus</li>
                </ol>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div class="flex">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 class="text-sm font-medium text-yellow-900">Perhatian:</h4>
                      <p class="text-sm text-yellow-700 mt-1">
                        Kursus dengan status "Draft" tidak akan terlihat oleh siswa. Pastikan untuk mengubah status menjadi "Aktif" setelah konten selesai.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Reports & Analytics -->
            <section :id="'section-' + documentSections[3].id" class="p-8 border-b border-gray-200">
              <div class="flex items-center mb-6">
                <DocumentChartBarIcon class="h-6 w-6 text-indigo-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Laporan & Analitik</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Akses laporan mendalam dan analitik untuk memahami kinerja platform pembelajaran.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Jenis Laporan</h3>
                <div class="space-y-4 mb-6">
                  <div class="border-l-4 border-blue-500 pl-4">
                    <h4 class="font-medium text-gray-900">Laporan Pengguna</h4>
                    <p class="text-sm text-gray-600">Statistik pendaftaran, aktivitas, dan engagement pengguna.</p>
                  </div>
                  <div class="border-l-4 border-green-500 pl-4">
                    <h4 class="font-medium text-gray-900">Laporan Kursus</h4>
                    <p class="text-sm text-gray-600">Kinerja kursus, tingkat penyelesaian, dan rating.</p>
                  </div>
                  <div class="border-l-4 border-yellow-500 pl-4">
                    <h4 class="font-medium text-gray-900">Laporan Finansial</h4>
                    <p class="text-sm text-gray-600">Pendapatan dari kursus dan tren penjualan.</p>
                  </div>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-3">Export Laporan</h3>
                <p class="text-gray-600 mb-4">
                  Semua laporan dapat diekspor dalam format PDF untuk keperluan presentasi atau dokumentasi.
                </p>
              </div>
            </section>

            <!-- User Management -->
            <section :id="'section-' + documentSections[4].id" class="p-8 border-b border-gray-200">
              <div class="flex items-center mb-6">
                <UserGroupIcon class="h-6 w-6 text-red-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Manajemen Pengguna</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Kelola semua pengguna sistem termasuk siswa, instruktur, dan administrator.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Fitur Manajemen Pengguna</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-600 mb-6">
                  <li>Lihat daftar semua pengguna dengan informasi lengkap</li>
                  <li>Filter pengguna berdasarkan role dan status</li>
                  <li>Edit profil dan permission pengguna</li>
                  <li>Suspend atau reaktivasi akun pengguna</li>
                  <li>Monitor aktivitas login dan pembelajaran</li>
                </ul>

                <h3 class="text-lg font-semibold text-gray-900 mb-3">Role Pengguna</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="border border-gray-200 rounded-lg p-4 text-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <UserGroupIcon class="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 class="font-medium text-gray-900 mb-2">Admin</h4>
                    <p class="text-sm text-gray-600">Akses penuh ke semua fitur sistem</p>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-4 text-center">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AcademicCapIcon class="h-6 w-6 text-green-600" />
                    </div>
                    <h4 class="font-medium text-gray-900 mb-2">Instruktur</h4>
                    <p class="text-sm text-gray-600">Kelola kursus dan konten pembelajaran</p>
                  </div>
                  <div class="border border-gray-200 rounded-lg p-4 text-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpenIcon class="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 class="font-medium text-gray-900 mb-2">Siswa</h4>
                    <p class="text-sm text-gray-600">Akses kursus dan materi pembelajaran</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Settings -->
            <section :id="'section-' + documentSections[5].id" class="p-8">
              <div class="flex items-center mb-6">
                <CogIcon class="h-6 w-6 text-gray-600 mr-3" />
                <h2 class="text-2xl font-bold text-gray-900">Pengaturan Sistem</h2>
              </div>
              
              <div class="prose max-w-none">
                <p class="text-gray-600 mb-4">
                  Konfigurasi sistem dan preferensi personal untuk pengalaman yang optimal.
                </p>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-3">Pengaturan yang Tersedia</h3>
                <div class="space-y-4 mb-6">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 class="font-medium text-gray-900">Profil Pengguna</h4>
                      <p class="text-sm text-gray-600">Update informasi personal dan foto profil</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 class="font-medium text-gray-900">Notifikasi</h4>
                      <p class="text-sm text-gray-600">Atur preferensi notifikasi email dan push</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 class="font-medium text-gray-900">Keamanan</h4>
                      <p class="text-sm text-gray-600">Ubah password dan atur autentikasi dua faktor</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 class="font-medium text-gray-900">Tema & Tampilan</h4>
                      <p class="text-sm text-gray-600">Pilih tema gelap/terang dan kustomisasi interface</p>
                    </div>
                  </div>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex">
                    <CheckCircleIcon class="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <h4 class="text-sm font-medium text-green-900">Selesai!</h4>
                      <p class="text-sm text-green-700 mt-1">
                        Anda telah menyelesaikan panduan dokumentasi SUMU LMS. Untuk bantuan lebih lanjut, hubungi tim support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Documentation Page
 * Halaman dokumentasi lengkap untuk SUMU LMS
 */
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  AcademicCapIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  CogIcon,
  BookOpenIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()

// State
const activeSection = ref('getting-started')
const searchMode = ref(false)
const searchQuery = ref('')

// Documentation sections
const documentSections = ref([
  {
    id: 'getting-started',
    title: 'Memulai',
    icon: RocketLaunchIcon,
    subsections: [
      { id: 'first-steps', title: 'Langkah Pertama' },
      { id: 'tips', title: 'Tips & Trik' }
    ]
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: ChartBarIcon,
    subsections: [
      { id: 'statistics', title: 'Statistik' },
      { id: 'recent-activity', title: 'Aktivitas Terbaru' }
    ]
  },
  {
    id: 'courses',
    title: 'Manajemen Kursus',
    icon: AcademicCapIcon,
    subsections: [
      { id: 'create-course', title: 'Membuat Kursus' },
      { id: 'manage-course', title: 'Kelola Kursus' }
    ]
  },
  {
    id: 'reports',
    title: 'Laporan',
    icon: DocumentChartBarIcon,
    subsections: [
      { id: 'user-reports', title: 'Laporan Pengguna' },
      { id: 'course-reports', title: 'Laporan Kursus' }
    ]
  },
  {
    id: 'users',
    title: 'Manajemen Pengguna',
    icon: UserGroupIcon,
    subsections: [
      { id: 'user-roles', title: 'Role Pengguna' },
      { id: 'permissions', title: 'Permission' }
    ]
  },
  {
    id: 'settings',
    title: 'Pengaturan',
    icon: CogIcon,
    subsections: [
      { id: 'profile', title: 'Profil' },
      { id: 'notifications', title: 'Notifikasi' },
      { id: 'security', title: 'Keamanan' }
    ]
  }
])

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const downloadPDF = () => {
  appStore.addNotification({
    type: 'info',
    message: 'Dokumentasi sedang dipersiapkan untuk download...',
    duration: 3000
  })
  
  setTimeout(() => {
    appStore.addNotification({
      type: 'success',
      message: 'Dokumentasi PDF berhasil diunduh!',
      duration: 3000
    })
  }, 2000)
}

// Lifecycle
onMounted(() => {
  appStore.addNotification({
    type: 'info',
    message: 'Selamat datang di halaman dokumentasi SUMU LMS',
    duration: 3000
  })
})
</script>

<style scoped>
.prose {
  color: inherit;
}

.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h4 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul, .prose ol {
  margin-bottom: 1rem;
}
</style>