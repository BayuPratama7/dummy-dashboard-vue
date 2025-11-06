<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Pengaturan</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola preferensi akun dan sistem</p>
          </div>
          <button
            @click="saveAllSettings"
            :disabled="saving"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
          >
            <CloudArrowUpIcon v-if="!saving" class="h-5 w-5 mr-2" />
            <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ saving ? 'Menyimpan...' : 'Simpan Semua' }}
          </button>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="max-w-4xl mx-auto">
        <!-- Settings Navigation -->
        <div class="bg-white shadow rounded-lg mb-6">
          <nav class="flex space-x-8 px-6 py-3" aria-label="Tabs">
            <button
              v-for="tab in settingsTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <component :is="tab.icon" class="h-5 w-5 mr-2 inline" />
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Profile Settings -->
        <div v-show="activeTab === 'profile'" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Profil</h3>
            <p class="mt-1 text-sm text-gray-500">Update informasi personal dan foto profil Anda</p>
          </div>
          
          <form @submit.prevent="saveProfile" class="px-6 py-4 space-y-6">
            <!-- Profile Photo -->
            <div class="flex items-center space-x-6">
              <div class="flex-shrink-0">
                <div class="h-20 w-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <span class="text-2xl font-medium text-gray-600">
                    {{ profileForm.name ? profileForm.name.charAt(0).toUpperCase() : 'U' }}
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  @click="$refs.photoInput.click()"
                  class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Ganti Foto
                </button>
                <input ref="photoInput" type="file" accept="image/*" class="hidden" @change="handlePhotoUpload" />
                <p class="mt-1 text-xs text-gray-500">JPG, GIF atau PNG. Maksimal 1MB.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  v-model="profileForm.name"
                  type="text"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Jabatan</label>
                <input
                  v-model="profileForm.position"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                v-model="profileForm.bio"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ceritakan sedikit tentang diri Anda..."
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        </div>

        <!-- Notification Settings -->
        <div v-show="activeTab === 'notifications'" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Preferensi Notifikasi</h3>
            <p class="mt-1 text-sm text-gray-500">Atur bagaimana Anda ingin menerima notifikasi</p>
          </div>
          
          <div class="px-6 py-4 space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Notifikasi Email</h4>
                  <p class="text-sm text-gray-500">Terima notifikasi melalui email</p>
                </div>
                <button
                  @click="notificationSettings.email = !notificationSettings.email"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    notificationSettings.email ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      notificationSettings.email ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Notifikasi Push</h4>
                  <p class="text-sm text-gray-500">Terima notifikasi push di browser</p>
                </div>
                <button
                  @click="notificationSettings.push = !notificationSettings.push"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    notificationSettings.push ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      notificationSettings.push ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Notifikasi Kursus Baru</h4>
                  <p class="text-sm text-gray-500">Informasi tentang kursus baru yang tersedia</p>
                </div>
                <button
                  @click="notificationSettings.newCourses = !notificationSettings.newCourses"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    notificationSettings.newCourses ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      notificationSettings.newCourses ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Laporan Mingguan</h4>
                  <p class="text-sm text-gray-500">Ringkasan aktivitas dan progress mingguan</p>
                </div>
                <button
                  @click="notificationSettings.weeklyReport = !notificationSettings.weeklyReport"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    notificationSettings.weeklyReport ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      notificationSettings.weeklyReport ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-show="activeTab === 'security'" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Keamanan Akun</h3>
            <p class="mt-1 text-sm text-gray-500">Kelola password dan pengaturan keamanan</p>
          </div>
          
          <div class="px-6 py-4 space-y-6">
            <!-- Change Password -->
            <form @submit.prevent="changePassword" class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Ubah Password</h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Password Saat Ini</label>
                <input
                  v-model="passwordForm.current"
                  type="password"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Password Baru</label>
                <input
                  v-model="passwordForm.new"
                  type="password"
                  required
                  minlength="8"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
                <input
                  v-model="passwordForm.confirm"
                  type="password"
                  required
                  minlength="8"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                type="submit"
                class="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </button>
            </form>

            <hr class="border-gray-200">

            <!-- Two Factor Authentication -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Autentikasi Dua Faktor</h4>
                  <p class="text-sm text-gray-500">Tambahkan lapisan keamanan ekstra untuk akun Anda</p>
                </div>
                <button
                  @click="securitySettings.twoFactor = !securitySettings.twoFactor"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    securitySettings.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                  ]"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      securitySettings.twoFactor ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  ></span>
                </button>
              </div>

              <div v-if="securitySettings.twoFactor" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex">
                  <InformationCircleIcon class="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h5 class="text-sm font-medium text-blue-900">Autentikasi Dua Faktor Aktif</h5>
                    <p class="text-sm text-blue-700 mt-1">
                      Akun Anda dilindungi dengan autentikasi dua faktor. Anda akan diminta kode verifikasi saat login.
                    </p>
                    <button class="mt-2 text-sm text-blue-600 hover:text-blue-800 underline">
                      Lihat Kode Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- Login Sessions -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 mb-4">Sesi Login Aktif</h4>
              <div class="space-y-3">
                <div v-for="session in loginSessions" :key="session.id" class="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <ComputerDesktopIcon v-if="session.device === 'desktop'" class="h-5 w-5 text-gray-400" />
                      <DevicePhoneMobileIcon v-else class="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ session.location }}</p>
                      <p class="text-xs text-gray-500">{{ session.device }} • {{ formatDate(session.lastActive) }}</p>
                    </div>
                  </div>
                  <button
                    v-if="!session.current"
                    @click="revokeSession(session.id)"
                    class="text-sm text-red-600 hover:text-red-800"
                  >
                    Putuskan
                  </button>
                  <span v-else class="text-xs text-green-600 font-medium">Sesi Ini</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Settings -->
        <div v-show="activeTab === 'system'" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Pengaturan Sistem</h3>
            <p class="mt-1 text-sm text-gray-500">Konfigurasi tampilan dan perilaku sistem</p>
          </div>
          
          <div class="px-6 py-4 space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Mode Gelap</h4>
                <p class="text-sm text-gray-500">Aktifkan tema gelap untuk mengurangi ketegangan mata</p>
              </div>
              <button
                @click="appStore.toggleDarkMode"
                :class="[
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                  appStore.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                ]"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                    appStore.darkMode ? 'translate-x-5' : 'translate-x-0'
                  ]"
                ></span>
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bahasa Interface</label>
              <select
                v-model="systemSettings.language"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
                <option value="ms">Bahasa Melayu</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Zona Waktu</label>
              <select
                v-model="systemSettings.timezone"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Asia/Jakarta">WIB (GMT+7)</option>
                <option value="Asia/Makassar">WITA (GMT+8)</option>
                <option value="Asia/Jayapura">WIT (GMT+9)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Format Tanggal</label>
              <select
                v-model="systemSettings.dateFormat"
                class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Settings Page
 * Halaman pengaturan sistem dan preferensi pengguna
 */
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { useAuthStore } from '../stores/auth'
import {
  CloudArrowUpIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CogIcon,
  InformationCircleIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()
const authStore = useAuthStore()

// State
const activeTab = ref('profile')
const saving = ref(false)

// Settings tabs
const settingsTabs = ref([
  { id: 'profile', name: 'Profil', icon: UserIcon },
  { id: 'notifications', name: 'Notifikasi', icon: BellIcon },
  { id: 'security', name: 'Keamanan', icon: ShieldCheckIcon },
  { id: 'system', name: 'Sistem', icon: CogIcon }
])

// Profile form
const profileForm = ref({
  name: 'Administrator SUMU',
  email: 'admin@sumu.edu',
  phone: '+62 812-3456-7890',
  position: 'System Administrator',
  bio: 'Mengelola sistem pembelajaran SUMU LMS dengan fokus pada user experience dan efisiensi operasional.'
})

// Password form
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

// Notification settings
const notificationSettings = ref({
  email: true,
  push: true,
  newCourses: true,
  weeklyReport: false
})

// Security settings
const securitySettings = ref({
  twoFactor: false
})

// System settings
const systemSettings = ref({
  language: 'id',
  timezone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY'
})

// Login sessions
const loginSessions = ref([
  {
    id: 1,
    device: 'desktop',
    location: 'Jakarta, Indonesia',
    lastActive: new Date(),
    current: true
  },
  {
    id: 2,
    device: 'mobile',
    location: 'Bandung, Indonesia',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
    current: false
  },
  {
    id: 3,
    device: 'desktop',
    location: 'Surabaya, Indonesia',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    current: false
  }
])

// Methods
const saveProfile = () => {
  appStore.addNotification({
    type: 'success',
    message: 'Profil berhasil disimpan',
    duration: 3000
  })
}

const changePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    appStore.addNotification({
      type: 'error',
      message: 'Konfirmasi password tidak cocok',
      duration: 3000
    })
    return
  }

  // Reset form
  passwordForm.value = {
    current: '',
    new: '',
    confirm: ''
  }

  appStore.addNotification({
    type: 'success',
    message: 'Password berhasil diubah',
    duration: 3000
  })
}

const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Handle photo upload
    appStore.addNotification({
      type: 'success',
      message: 'Foto profil berhasil diperbarui',
      duration: 3000
    })
  }
}

const revokeSession = (sessionId) => {
  const index = loginSessions.value.findIndex(s => s.id === sessionId)
  if (index > -1) {
    loginSessions.value.splice(index, 1)
    appStore.addNotification({
      type: 'success',
      message: 'Sesi login berhasil diputus',
      duration: 3000
    })
  }
}

const saveAllSettings = async () => {
  saving.value = true
  
  // Simulate save process
  setTimeout(() => {
    saving.value = false
    appStore.addNotification({
      type: 'success',
      message: 'Semua pengaturan berhasil disimpan',
      duration: 3000
    })
  }, 1500)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  appStore.addNotification({
    type: 'info',
    message: 'Selamat datang di halaman pengaturan',
    duration: 3000
  })
})
</script>