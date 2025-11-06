<<<<<<< HEAD
# 🎓 SUMU Learning Management System Dashboard

> **Sistem Dashboard LMS Modern berbasis Vue.js 3 dengan fitur lengkap untuk manajemen pembelajaran online**

Dashboard web yang canggih dan responsif untuk Learning Management System (LMS) SUMU, dibangun dengan teknologi modern dan UX/UI yang intuitive.

## ✨ Fitur Utama

### 🔐 **Sistem Autentikasi & Keamanan**
- **Login/Register** dengan validasi form real-time
- **Session Management** dengan automatic logout
- **Route Protection** untuk halaman yang memerlukan autentikasi
- **Logout Modal** dengan konfirmasi elegant
- **Password Validation** dengan strength indicator

### 📊 **Dashboard Komprehensif**
- **Statistik Real-time**: Pengguna aktif, kursus, completion rate
- **Aktivitas Terbaru**: Feed aktivitas dengan timestamp
- **Quick Actions**: Akses cepat ke fitur utama
- **Charts & Analytics**: Visualisasi data dengan interactive elements

### 🎓 **Manajemen Kursus Lengkap**
- **CRUD Operations**: Create, Read, Update, Delete kursus
- **Filter & Search**: Pencarian berdasarkan kategori dan status
- **Status Management**: Draft, Active, Archived
- **Thumbnail Support**: Upload dan display gambar kursus
- **Pagination**: Navigasi data yang efisien

### 📈 **Reports & Analytics**
- **Key Metrics**: Dashboard dengan 4 metric utama
- **Interactive Charts**: User registration dan course completion
- **Performance Table**: Top courses dengan rating dan revenue
- **Export Functionality**: Download laporan dalam format PDF
- **Time Period Filter**: Data 7 hari, 30 hari, 3 bulan, 1 tahun

### 📚 **Dokumentasi Lengkap**
- **Navigation Sidebar**: Panduan terstruktur dengan scroll spy
- **Search Functionality**: Pencarian dalam dokumentasi
- **Step-by-Step Guides**: Tutorial lengkap setiap fitur
- **PDF Download**: Export dokumentasi offline

### ⚙️ **Pengaturan Advanced**
- **Multi-tab Settings**: Profile, Notifications, Security, System
- **Dark Mode Toggle**: Switch tema dengan animasi smooth
- **Notification Preferences**: Granular control notifikasi
- **Password Management**: Change password dengan validation
- **2FA Support**: Two-factor authentication setup
- **Session Management**: Monitor dan revoke active sessions

### 🔔 **Sistem Notifikasi Real-time**
- **Live Notifications**: Update otomatis setiap 30 detik
- **Rich Content**: Title, message, actions, timestamps
- **Read/Unread Status**: Visual indicators dengan badges
- **Click Actions**: Navigate langsung ke halaman terkait
- **Notification Types**: Success, Info, Warning, Error

### 👤 **Profile Management**
- **Enhanced Profile Dropdown**: Avatar, stats, quick actions
- **User Stats**: Total courses, students, performance metrics
- **Quick Navigation**: Direct access ke settings dan profile
- **Role-based Display**: Different UI based on user role

## 🛠️ Tech Stack Modern

### **Frontend Framework**
- **Vue.js 3.3.4** - Progressive framework dengan Composition API
- **Pinia 3.0.3** - Next-gen state management untuk Vue
- **Vue Router 4.2.4** - Official router dengan navigation guards

### **UI/UX & Styling**
- **TailwindCSS** - Utility-first CSS framework
- **Heroicons 2.0.18** - Beautiful hand-crafted SVG icons
- **Headless UI 1.7.16** - Unstyled, accessible UI components

### **Development Tools**
- **Vite 4.5.14** - Lightning fast build tool
- **Vitest** - Blazing fast unit testing framework
- **Vue Test Utils** - Official testing utilities for Vue
- **PostCSS** - CSS processing with modern features

### **Code Quality**
- **ESLint** - JavaScript linting untuk code quality
- **JSDoc** - Documentation comments untuk semua functions
- **TypeScript Support** - Type safety (optional)

## 📁 Struktur Proyek Lengkap

```
DUMMYPROJECT_VUEJS/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── Header.vue       # Navigation header dengan notifications
│   │   ├── Layout.vue       # Main layout dengan responsive sidebar
│   │   ├── LogoutModal.vue  # Elegant logout confirmation
│   │   ├── Navbar.vue       # Top navigation bar
│   │   └── NotificationManager.vue  # Toast notification system
│   ├── views/               # Page components
│   │   ├── Dashboard.vue    # Main dashboard dengan stats
│   │   ├── Login.vue        # Enhanced login dengan validation
│   │   ├── SignUp.vue       # Registration form
│   │   ├── Users.vue        # User management table
│   │   ├── Courses.vue      # Course management CRUD
│   │   ├── Reports.vue      # Analytics dan reporting
│   │   ├── Documentation.vue # Interactive documentation
│   │   └── Settings.vue     # Multi-tab settings panel
│   ├── stores/              # Pinia state management
│   │   ├── auth.js          # Authentication state & logic
│   │   ├── app.js           # Global app state & notifications
│   │   └── index.js         # Store configuration
│   ├── services/            # Service layer
│   │   └── auth.service.js  # Authentication API service
│   ├── router/              # Vue Router setup
│   │   └── index.js         # Routes dengan guards
│   ├── test/                # Unit tests
│   │   ├── setup.js         # Test environment setup
│   │   ├── auth.store.test.js
│   │   ├── auth.service.test.js
│   │   └── Login.test.js
│   ├── assets/              # Images, fonts, etc.
│   ├── App.vue              # Root component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles
├── package.json             # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.cjs     # TailwindCSS setup
├── vitest.config.js        # Testing configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### **Prerequisites**
- **Node.js** (v16.0.0 atau lebih tinggi)
- **npm** (v7.0.0 atau lebih tinggi)
- **Git** (untuk cloning repository)

### **Installation**

1. **Navigate ke direktori project**
   ```bash
   cd DUMMYPROJECT_VUEJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run serve
   # atau
   npx vite
   ```

4. **Buka browser dan akses**
   ```
   http://localhost:3000
   ```

### **Build untuk Production**

```bash
# Build optimized production files
npm run build

# Preview production build
npm run preview
```

### **Testing**

```bash
# Run unit tests
npm run test

# Run tests dengan watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests dengan UI
npm run test:ui
```

## 🔑 Kredensial Demo

Untuk testing aplikasi, gunakan kredensial berikut:

| Role | Email | Password |
|------|-------|----------|
| **Administrator** | admin@sumu.edu | admin123 |
| **Instructor** | instructor@sumu.edu | instructor123 |
| **Student** | student@sumu.edu | student123 |

> **Note**: Ini adalah kredensial demo untuk development. Di production, implementasikan sistem autentikasi yang aman.

## 📖 Panduan Penggunaan

### **1. Login & Authentication**
1. Buka aplikasi di browser
2. Masukkan email dan password dari tabel kredensial di atas
3. Klik "Masuk" untuk mengakses dashboard
4. Sistem akan redirect ke dashboard utama

### **2. Navigation**
- **Sidebar**: Menu utama untuk navigasi antar halaman
- **Header**: Search, notifications, dan profile menu
- **Breadcrumb**: Indikator posisi halaman saat ini

### **3. Dashboard Features**
- **Statistics Cards**: Overview metrics sistem
- **Recent Activity**: Feed aktivitas terbaru
- **Quick Actions**: Akses cepat ke fungsi utama
- **Charts**: Visualisasi data performa

### **4. Course Management**
- Akses melalui sidebar menu "Courses"
- **Create**: Tambah kursus baru dengan form lengkap
- **Edit**: Update informasi kursus existing
- **Delete**: Hapus kursus dengan konfirmasi
- **Filter**: Cari berdasarkan kategori, status, atau keyword

### **5. Reports & Analytics**
- Menu "Reports" untuk analytics dashboard
- Filter berdasarkan periode waktu
- Export laporan dalam format PDF
- Monitor key performance indicators

### **6. Settings & Profile**
- Akses melalui profile dropdown di header
- Update profil personal
- Konfigurasi notifikasi
- Keamanan dan password management
- Preferensi sistem (dark mode, bahasa, timezone)

## 🎯 Fitur-Fitur Advanced

### **Real-time Notifications**
- Notifikasi otomatis setiap 30 detik (demo mode)
- Click-to-action untuk navigasi langsung
- Mark as read/unread functionality
- Bulk actions (mark all as read)

### **Responsive Design**
- **Desktop**: Full layout dengan sidebar
- **Tablet**: Collapsible sidebar
- **Mobile**: Off-canvas mobile menu
- **Touch-friendly**: Optimized untuk touch interactions

### **Dark Mode**
- Toggle melalui profile menu atau settings
- Persistent preference dengan localStorage
- Smooth color transitions
- Consistent across all pages

### **Error Handling**
- Try-catch blocks untuk semua async operations
- User-friendly error messages
- Automatic retry mechanisms
- Fallback UI states

### **Performance Optimization**
- Lazy loading untuk routes
- Component-level code splitting
- Optimized bundle sizes
- Efficient state management

## 🛠️ Development Scripts

```bash
# Development
npm run serve          # Start development server
npx vite              # Alternative way to start dev server

# Build
npm run build         # Build for production
npm run preview       # Preview production build

# Testing
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once and exit
npm run test:coverage # Generate coverage report
npm run test:ui       # Open testing UI

# Linting & Formatting
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

## 🔐 API Integration

### **Authentication Service**
```javascript
// src/services/auth.service.js
const AuthService = {
  login(credentials),       // Login user
  register(userData),       // Register new user
  logout(),                // Logout current user
  refreshToken(),          // Refresh access token
  getUserProfile()         // Get user profile data
}
```

### **Store Management**
```javascript
// Pinia stores untuk state management
- authStore: User authentication & profile
- appStore: Global app state, notifications, UI preferences
```

## 🎨 Styling & Design System

### **TailwindCSS Configuration**
- **Custom Colors**: Blue primary, gray neutrals
- **Custom Fonts**: Inter, system fonts fallback
- **Responsive Breakpoints**: sm, md, lg, xl, 2xl
- **Dark Mode**: Class-based dark mode support

### **Component Patterns**
- **Cards**: Consistent padding, shadows, rounded corners
- **Buttons**: Primary, secondary, danger variants
- **Forms**: Standardized input styling dengan focus states
- **Modals**: Backdrop blur, slide-in animations
- **Notifications**: Toast style dengan auto-dismiss

### **Color Palette**
```css
Primary: Blue (blue-500, blue-600, blue-700)
Secondary: Gray (gray-100, gray-200, gray-300, gray-400, gray-500)
Success: Green (green-500, green-600)
Warning: Yellow (yellow-500, yellow-600)
Error: Red (red-500, red-600)
Info: Blue (blue-400, blue-500)
```

## 📊 Data Management

### **Sample Data Structure**
```javascript
// User Profile
{
  name: "Bayubys07",
  email: "bayubys07@gmail.com",
  role: "Administrator",
  totalCourses: 24,
  totalStudents: 1275,
  lastLogin: Date,
  preferences: { ... }
}

// Notifications
{
  id: Number,
  type: "success|info|warning|error",
  title: String,
  message: String,
  timestamp: Date,
  read: Boolean,
  actionUrl: String
}

// Courses
{
  id: Number,
  title: String,
  description: String,
  category: String,
  status: "draft|active|archived",
  students: Number,
  duration: Number,
  thumbnail: String
}
```

## 🧪 Testing Strategy

### **Unit Tests Coverage**
- **Components**: Vue component testing dengan Vue Test Utils
- **Stores**: Pinia store testing
- **Services**: API service mocking
- **Utils**: Pure function testing

### **Test Files**
```bash
src/test/
├── setup.js              # Test environment configuration
├── auth.store.test.js     # Authentication store tests
├── auth.service.test.js   # Auth service tests
└── Login.test.js          # Login component tests
```

### **Testing Best Practices**
- Mock external dependencies
- Test user interactions
- Verify state changes
- Assert UI updates
- Coverage > 80%

## 🚀 Deployment

### **Production Build**
```bash
npm run build
```
Generates optimized files di `dist/` directory.

### **Environment Variables**
```env
# .env.production
VITE_API_BASE_URL=https://api.sumu.edu
VITE_APP_NAME=SUMU LMS
VITE_APP_VERSION=1.0.0
```

### **Deployment Platforms**
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting untuk public repos
- **Firebase Hosting**: Google Cloud platform

## 🔍 Troubleshooting

### **Common Issues**

**1. Port sudah digunakan**
```bash
# Gunakan port yang berbeda
npx vite --port 3001
```

**2. Dependencies error**
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Build error**
```bash
# Clear cache dan rebuild
npm run build -- --force
```

**4. Test failures**
```bash
# Update snapshots
npm run test -- --update-snapshots
```

## 📈 Performance Metrics

### **Core Web Vitals**
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)  
- **CLS**: < 0.1 (Cumulative Layout Shift)

### **Bundle Analysis**
- Main bundle: ~150KB (gzipped)
- Vendor bundle: ~200KB (gzipped)
- Route-based code splitting implemented
- Tree shaking untuk unused code elimination

## 🤝 Contributing

### **Development Workflow**
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Code Standards**
- Follow Vue.js 3 best practices
- Use Composition API pattern
- Write comprehensive JSDoc comments
- Maintain test coverage > 80%
- Follow conventional commit messages

## 📄 License

Proyek ini dibuat untuk keperluan learning dan demo. Bebas digunakan untuk tujuan edukatif.

## 👨‍💻 Author

**Bayubys07**
- Email: bayubys07@gmail.com
- Project: SUMU Learning Management System Dashboard

## 🙏 Acknowledgments

- **Vue.js Team** - Amazing framework
- **Tailwind Labs** - Beautiful utility-first CSS
- **Heroicons** - Perfect icon set
- **Vite Team** - Lightning fast build tool
- **Pinia Team** - Intuitive state management

---

**Built with ❤️ using Vue.js 3, TailwindCSS, and modern web technologies**

### TailwindCSS Classes yang Konsisten

**Colors:**
- Primary: `blue-600`, `blue-700`
- Success: `green-500`, `green-600`
- Warning: `yellow-500`, `yellow-600`
- Error: `red-500`, `red-600`
- Gray scale: `gray-50` hingga `gray-900`

**Spacing:**
- Padding: `p-4`, `p-6`, `p-8`
- Margin: `m-4`, `m-6`, `m-8`
- Gap: `gap-4`, `gap-6`, `gap-8`

**Typography:**
- Headings: `text-xl`, `text-2xl`, `text-3xl` dengan `font-bold`
- Body: `text-sm`, `text-base` dengan `font-medium`
- Captions: `text-xs`, `text-sm` dengan `text-gray-500`

**Shadows & Borders:**
- Cards: `shadow-sm`, `border`, `border-gray-200`
- Elevated: `shadow-lg`
- Rounded: `rounded-lg`, `rounded-xl`

## 🛡️ Error Handling

### Authentication Errors
- Email format validation
- Password length validation
- Network error handling
- localStorage error handling

### Global Error Handling
- Try-catch blocks di semua async operations
- Error boundaries untuk komponen
- Graceful fallbacks untuk missing data
- User-friendly error messages

### Notification System
- Toast notifications untuk feedback
- Auto-dismiss setelah durasi tertentu
- Berbagai tipe: success, error, warning, info
- Click to dismiss manual

## 🧪 Testing Strategy

### Unit Tests Coverage
- **Auth Store**: Login, register, logout, error handling
- **Auth Service**: API calls, validation, localStorage
- **Components**: Rendering, user interactions, props
- **Utils**: Helper functions, validation methods

### Test Files
- `auth.store.test.js`: Testing Pinia auth store
- `auth.service.test.js`: Testing authentication service
- `Login.test.js`: Testing login component
- `setup.js`: Global test configuration

### Mocking Strategy
- localStorage mocking untuk browser APIs
- Router mocking untuk navigation tests
- Pinia store mocking untuk component tests
- Async operation mocking dengan delays

## 📚 API Documentation

### Authentication Service

#### `login(email, password)`
```javascript
/**
 * Login user dengan email dan password
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @returns {Promise<Object>} User data
 * @throws {Error} Validation atau authentication errors
 */
```

#### `signup(email, password, name)`
```javascript
/**
 * Register user baru
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @param {string} name - Nama pengguna
 * @returns {Promise<Object>} User data
 * @throws {Error} Validation errors
 */
```

### Pinia Stores

#### Auth Store
- `user`: Current user object
- `token`: Authentication token
- `loading`: Loading state
- `error`: Error messages
- `isAuthenticated`: Authentication status

#### App Store
- `sidebarOpen`: Mobile sidebar state
- `notifications`: Notification array
- `darkMode`: Dark mode preference
- `loading`: Global loading state

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
// Build tool configuration
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173
  }
})
```

### TailwindCSS Configuration (`tailwind.config.js`)
```javascript
// Utility-first CSS framework configuration
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {...}
      }
    }
  }
}
```

### Vitest Configuration (`vitest.config.js`)
```javascript
// Testing framework configuration
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  }
})
```

## 🚨 Known Issues & Limitations

1. **Data Mock**: Semua data menggunakan mock/hardcoded (tidak ada backend)
2. **Authentication**: Token tidak memiliki expiration checking
3. **Router Guards**: Belum implementasi route protection
4. **Image Upload**: Belum ada fitur upload avatar/gambar
5. **Internationalization**: Belum ada multi-language support

## 🔮 Future Enhancements

1. **Backend Integration**: Koneksi ke REST API atau GraphQL
2. **Real-time Features**: WebSocket untuk notifications
3. **Advanced Charts**: Data visualization dengan Chart.js/D3
4. **File Management**: Upload dan manage files
5. **Role-based Access**: Permission system
6. **PWA Features**: Offline capability
7. **Dark Mode**: Complete dark theme implementation
8. **Animation**: Transition dan micro-interactions

## 📄 License

Proyek ini dibuat untuk keperluan demonstrasi dan pembelajaran.

## 👥 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue baru di repository ini.

---

**Built with ❤️ using Vue.js 3, TailwindCSS, and modern web technologies**
