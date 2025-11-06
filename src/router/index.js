import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Courses from '../views/Courses.vue'
import Reports from '../views/Reports.vue'
import Documentation from '../views/Documentation.vue'
import Settings from '../views/Settings.vue'
import AuthService from '../services/auth.service'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports,
    meta: { requiresAuth: true }
  },
  {
    path: '/docs',
    name: 'Documentation',
    component: Documentation,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard untuk proteksi route
router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated()
  const requiresAuth = to.meta.requiresAuth !== false // Default true kecuali explicitly false

  if (requiresAuth && !isAuthenticated) {
    // Redirect ke login jika belum authenticated
    next({ path: '/login' })
  } else if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    // Redirect ke dashboard jika sudah login dan mengakses login/signup
    next({ path: '/dashboard' })
  } else {
    next()
  }
})

export default router