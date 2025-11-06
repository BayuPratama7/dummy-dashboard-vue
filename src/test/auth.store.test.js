/**
 * Auth Store Unit Tests
 * Test untuk authentication store dengan berbagai scenario
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../stores/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const authStore = useAuthStore()
      
      expect(authStore.user).toBeNull()
      expect(authStore.token).toBeNull()
      expect(authStore.loading).toBe(false)
      expect(authStore.error).toBe('')
      expect(authStore.isAuthenticated).toBe(false)
    })
  })

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const authStore = useAuthStore()
      
      await authStore.login('test@example.com', 'password123')
      
      expect(authStore.user).not.toBeNull()
      expect(authStore.user.email).toBe('test@example.com')
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.error).toBe('')
    })

    it('should fail login with invalid email format', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.login('invalid-email', 'password123')
      } catch (error) {
        expect(error.message).toBe('Format email tidak valid')
      }
      
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should fail login with empty credentials', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.login('', '')
      } catch (error) {
        expect(error.message).toBe('Email dan password harus diisi')
      }
      
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should fail login with short password', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.login('test@example.com', '123')
      } catch (error) {
        expect(error.message).toBe('Password minimal 6 karakter')
      }
      
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('should set loading state during login', async () => {
      const authStore = useAuthStore()
      
      const loginPromise = authStore.login('test@example.com', 'password123')
      expect(authStore.loading).toBe(true)
      
      await loginPromise
      expect(authStore.loading).toBe(false)
    })
  })

  describe('Register', () => {
    it('should register successfully with valid data', async () => {
      const authStore = useAuthStore()
      
      await authStore.register('newuser@example.com', 'password123', 'New User')
      
      expect(authStore.user).not.toBeNull()
      expect(authStore.user.email).toBe('newuser@example.com')
      expect(authStore.user.name).toBe('New User')
      expect(authStore.isAuthenticated).toBe(true)
    })

    it('should fail register with invalid email', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.register('invalid-email', 'password123', 'User')
      } catch (error) {
        expect(error.message).toBe('Format email tidak valid')
      }
    })

    it('should fail register with short name', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.register('test@example.com', 'password123', 'A')
      } catch (error) {
        expect(error.message).toBe('Nama minimal 2 karakter')
      }
    })
  })

  describe('Logout', () => {
    it('should logout successfully', async () => {
      const authStore = useAuthStore()
      
      // Login first
      await authStore.login('test@example.com', 'password123')
      expect(authStore.isAuthenticated).toBe(true)
      
      // Then logout
      authStore.logout()
      
      expect(authStore.user).toBeNull()
      expect(authStore.token).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should clear error', async () => {
      const authStore = useAuthStore()
      
      try {
        await authStore.login('', '')
      } catch (error) {
        // Expected error
      }
      
      expect(authStore.error).not.toBe('')
      
      authStore.clearError()
      expect(authStore.error).toBe('')
    })
  })

  describe('Computed Properties', () => {
    it('should compute userDisplayName correctly', async () => {
      const authStore = useAuthStore()
      
      await authStore.login('john@example.com', 'password123')
      
      expect(authStore.userDisplayName).toBeTruthy()
    })
  })
})