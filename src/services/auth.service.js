/**
 * AuthService - Service untuk mengelola autentikasi pengguna
 * Menangani login, logout, register dengan error handling yang proper
 */

// Storage keys
const TOKEN_KEY = 'user-token';
const USER_KEY = 'user-data';

class AuthService {
    /**
     * Login user dengan email dan password
     * @param {string} email - Email pengguna
     * @param {string} password - Password pengguna
     * @returns {Promise<Object>} User data
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            try {
                // Validasi input
                if (!email || !password) {
                    reject(new Error('Email dan password harus diisi'));
                    return;
                }

                if (!this.isValidEmail(email)) {
                    reject(new Error('Format email tidak valid'));
                    return;
                }

                if (password.length < 6) {
                    reject(new Error('Password minimal 6 karakter'));
                    return;
                }

                // Simulate API call dengan delay
                setTimeout(() => {
                    try {
                        // Mock successful login dengan kondisi tertentu
                        if (email === 'admin@sumu.com' && password === 'admin123') {
                            const mockToken = this.generateMockToken();
                            const mockUser = {
                                id: 1,
                                email: email,
                                name: 'Administrator',
                                role: 'admin',
                                avatar: null,
                                loginAt: new Date().toISOString()
                            };
                            
                            this.setAuthData(mockToken, mockUser);
                            resolve(mockUser);
                            
                        } else if (email && password) {
                            // Any other valid email/password combination
                            const mockToken = this.generateMockToken();
                            const mockUser = {
                                id: Date.now(),
                                email: email,
                                name: this.extractNameFromEmail(email),
                                role: 'user',
                                avatar: null,
                                loginAt: new Date().toISOString()
                            };
                            
                            this.setAuthData(mockToken, mockUser);
                            resolve(mockUser);
                            
                        } else {
                            reject(new Error('Email atau password tidak valid'));
                        }
                    } catch (error) {
                        reject(new Error('Terjadi kesalahan saat memproses login'));
                    }
                }, 800); // Simulate network delay
                
            } catch (error) {
                reject(new Error('Terjadi kesalahan tak terduga'));
            }
        });
    }

    /**
     * Register user baru
     * @param {string} email - Email pengguna
     * @param {string} password - Password pengguna
     * @param {string} name - Nama pengguna
     * @returns {Promise<Object>} User data
     */
    signup(email, password, name) {
        return new Promise((resolve, reject) => {
            try {
                // Validasi input
                if (!email || !password || !name) {
                    reject(new Error('Semua field harus diisi'));
                    return;
                }

                if (!this.isValidEmail(email)) {
                    reject(new Error('Format email tidak valid'));
                    return;
                }

                if (password.length < 6) {
                    reject(new Error('Password minimal 6 karakter'));
                    return;
                }

                if (name.length < 2) {
                    reject(new Error('Nama minimal 2 karakter'));
                    return;
                }

                // Simulate API call
                setTimeout(() => {
                    try {
                        // Check if email already exists (mock check)
                        if (email === 'admin@sumu.com') {
                            reject(new Error('Email sudah terdaftar'));
                            return;
                        }

                        const mockToken = this.generateMockToken();
                        const mockUser = {
                            id: Date.now(),
                            email: email,
                            name: name,
                            role: 'user',
                            avatar: null,
                            createdAt: new Date().toISOString(),
                            loginAt: new Date().toISOString()
                        };
                        
                        this.setAuthData(mockToken, mockUser);
                        resolve(mockUser);
                        
                    } catch (error) {
                        reject(new Error('Terjadi kesalahan saat memproses registrasi'));
                    }
                }, 1000);
                
            } catch (error) {
                reject(new Error('Terjadi kesalahan tak terduga'));
            }
        });
    }

    /**
     * Logout user dan bersihkan data
     */
    logout() {
        try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Error during logout:', error);
            // Force remove even if there's an error
            try {
                localStorage.clear();
            } catch (clearError) {
                console.error('Error clearing localStorage:', clearError);
            }
        }
    }

    /**
     * Get current logged in user
     * @returns {Object|null} User data atau null
     */
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem(USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    /**
     * Check apakah user sudah authenticated
     * @returns {boolean}
     */
    isAuthenticated() {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const user = this.getCurrentUser();
            return !!(token && user);
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    /**
     * Set authentication data ke localStorage
     * @param {string} token - Auth token
     * @param {Object} user - User data
     */
    setAuthData(token, user) {
        try {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Error setting auth data:', error);
            throw new Error('Gagal menyimpan data autentikasi');
        }
    }

    /**
     * Generate mock JWT token
     * @returns {string} Mock token
     */
    generateMockToken() {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({ 
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            iss: 'sumu-lms'
        }));
        const signature = btoa('mock-signature');
        
        return `${header}.${payload}.${signature}`;
    }

    /**
     * Extract name from email
     * @param {string} email - Email address
     * @returns {string} Extracted name
     */
    extractNameFromEmail(email) {
        try {
            return email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        } catch (error) {
            return 'User';
        }
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Get token from storage
     * @returns {string|null}
     */
    getToken() {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    /**
     * Refresh token (mock implementation)
     * @returns {Promise<string>}
     */
    refreshToken() {
        return new Promise((resolve, reject) => {
            try {
                if (!this.isAuthenticated()) {
                    reject(new Error('User not authenticated'));
                    return;
                }

                setTimeout(() => {
                    const newToken = this.generateMockToken();
                    localStorage.setItem(TOKEN_KEY, newToken);
                    resolve(newToken);
                }, 500);
                
            } catch (error) {
                reject(new Error('Failed to refresh token'));
            }
        });
    }
}

export default new AuthService();