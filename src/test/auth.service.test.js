/**
 * Auth Service Unit Tests
 * Test untuk authentication service dengan mock localStorage
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AuthService from '../services/auth.service'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
})

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const result = await AuthService.login('test@example.com', 'password123')
      
      expect(result).toBeDefined()
      expect(result.email).toBe('test@example.com')
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2)
    })

    it('should reject with invalid email format', async () => {
      await expect(AuthService.login('invalid-email', 'password123'))
        .rejects.toThrow('Format email tidak valid')
    })

    it('should reject with empty credentials', async () => {
      await expect(AuthService.login('', ''))
        .rejects.toThrow('Email dan password harus diisi')
    })

    it('should reject with short password', async () => {
      await expect(AuthService.login('test@example.com', '123'))
        .rejects.toThrow('Password minimal 6 karakter')
    })

    it('should login admin with special credentials', async () => {
      const result = await AuthService.login('admin@sumu.com', 'admin123')
      
      expect(result.email).toBe('admin@sumu.com')
      expect(result.name).toBe('Administrator')
      expect(result.role).toBe('admin')
    })
  })

  describe('Register', () => {
    it('should register successfully with valid data', async () => {
      const result = await AuthService.signup('newuser@example.com', 'password123', 'New User')
      
      expect(result).toBeDefined()
      expect(result.email).toBe('newuser@example.com')
      expect(result.name).toBe('New User')
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2)
    })

    it('should reject registration with existing admin email', async () => {
      await expect(AuthService.signup('admin@sumu.com', 'password123', 'Admin'))
        .rejects.toThrow('Email sudah terdaftar')
    })

    it('should reject with invalid input', async () => {
      await expect(AuthService.signup('', 'password123', 'User'))
        .rejects.toThrow('Semua field harus diisi')
    })
  })

  describe('Logout', () => {
    it('should remove items from localStorage', () => {
      AuthService.logout()
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user-token')
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user-data')
    })
  })

  describe('getCurrentUser', () => {
    it('should return user data when available', () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' }
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
      
      const result = AuthService.getCurrentUser()
      
      expect(result).toEqual(mockUser)
    })

    it('should return null when no user data', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const result = AuthService.getCurrentUser()
      
      expect(result).toBeNull()
    })

    it('should return null when JSON parse fails', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json')
      
      const result = AuthService.getCurrentUser()
      
      expect(result).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when both token and user exist', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'user-token') return 'mock-token'
        if (key === 'user-data') return JSON.stringify({ id: 1, email: 'test@example.com' })
        return null
      })
      
      const result = AuthService.isAuthenticated()
      
      expect(result).toBe(true)
    })

    it('should return false when token is missing', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'user-token') return null
        if (key === 'user-data') return JSON.stringify({ id: 1, email: 'test@example.com' })
        return null
      })
      
      const result = AuthService.isAuthenticated()
      
      expect(result).toBe(false)
    })
  })

  describe('Utility Methods', () => {
    it('should validate email format correctly', () => {
      expect(AuthService.isValidEmail('test@example.com')).toBe(true)
      expect(AuthService.isValidEmail('invalid-email')).toBe(false)
      expect(AuthService.isValidEmail('')).toBe(false)
    })

    it('should extract name from email', () => {
      expect(AuthService.extractNameFromEmail('john.doe@example.com')).toBe('John Doe')
      expect(AuthService.extractNameFromEmail('test_user@example.com')).toBe('Test User')
    })

    it('should generate mock token', () => {
      const token = AuthService.generateMockToken()
      
      expect(token).toBeDefined()
      expect(token.split('.')).toHaveLength(3) // JWT format
    })
  })
})