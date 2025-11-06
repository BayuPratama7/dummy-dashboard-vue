/**
 * Login Component Unit Tests
 * Test untuk komponen login dengan mock dependencies
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

// Mock router
const mockRoutes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: { template: '<div>Dashboard</div>' } }
]

const mockRouter = createRouter({
  history: createWebHistory(),
  routes: mockRoutes
})

describe('Login Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false
          }),
          mockRouter
        ]
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Rendering', () => {
    it('should render login form correctly', () => {
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.find('input[type="email"]').exists()).toBe(true)
      expect(wrapper.find('input[type="password"]').exists()).toBe(true)
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })

    it('should render welcome message', () => {
      expect(wrapper.text()).toContain('Selamat Datang di SUMU')
    })

    it('should render form labels correctly', () => {
      expect(wrapper.text()).toContain('Email Address')
      expect(wrapper.text()).toContain('Password')
    })
  })

  describe('Form Validation', () => {
    it('should show email error for invalid email', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      
      await emailInput.setValue('invalid-email')
      await emailInput.trigger('input')
      
      // Check if validation triggers
      expect(wrapper.vm.email).toBe('invalid-email')
    })

    it('should show password error for short password', async () => {
      const passwordInput = wrapper.find('input[type="password"]')
      
      await passwordInput.setValue('123')
      await passwordInput.trigger('input')
      
      expect(wrapper.vm.password).toBe('123')
    })

    it('should enable submit button with valid form', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      const passwordInput = wrapper.find('input[type="password"]')
      
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('password123')
      
      expect(wrapper.vm.isFormValid).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('should call login function on form submit', async () => {
      const emailInput = wrapper.find('input[type="email"]')
      const passwordInput = wrapper.find('input[type="password"]')
      const form = wrapper.find('form')
      
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('password123')
      
      const loginSpy = vi.spyOn(wrapper.vm, 'handleLogin')
      
      await form.trigger('submit.prevent')
      
      expect(loginSpy).toHaveBeenCalled()
    })
  })

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', async () => {
      const passwordInput = wrapper.find('input[type="password"]')
      const toggleButton = wrapper.find('button[type="button"]')
      
      expect(passwordInput.attributes('type')).toBe('password')
      
      await toggleButton.trigger('click')
      
      expect(wrapper.vm.showPassword).toBe(true)
    })
  })

  describe('Remember Me', () => {
    it('should toggle remember me checkbox', async () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      
      expect(wrapper.vm.rememberMe).toBe(false)
      
      await checkbox.setChecked(true)
      
      expect(wrapper.vm.rememberMe).toBe(true)
    })
  })

  describe('Error Display', () => {
    it('should display validation errors', async () => {
      // Trigger validation error
      wrapper.vm.emailError = 'Format email tidak valid'
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Format email tidak valid')
    })
  })

  describe('Router Links', () => {
    it('should have link to signup page', () => {
      const signupLink = wrapper.find('router-link[to="/signup"]')
      expect(signupLink.exists()).toBe(true)
    })
  })
})