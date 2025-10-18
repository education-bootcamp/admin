'use client'

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import Link from "next/link";

// Cookie Manager
class CookieManager {
    static set(value: string, name: string, days: number = 7): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    static get(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static delete(name: string): void {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }
}

// Auth Service
interface LoginResponse {
    data: {
        access_token: string;
    };
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contact: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
const AUTH_ENDPOINT = `${BASE_URL}/user-service/api/v1/users/visitors/`;

class AuthService {
    static async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${AUTH_ENDPOINT}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    }

    static async register(data: RegisterData): Promise<any> {
        const response = await fetch(`${AUTH_ENDPOINT}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Registration failed');
        }

        return response.json();
    }

    static async verify(email: string, otp: string): Promise<any> {
        const response = await fetch(
            `${AUTH_ENDPOINT}verify-email?email=${encodeURIComponent(email)}&otp=${otp}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }
        );

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Verification failed');
        }

        return response.json();
    }

    static async resend(email: string): Promise<any> {
        const response = await fetch(
            `${AUTH_ENDPOINT}verify-email?email=${encodeURIComponent(email)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            }
        );

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Resend failed');
        }

        return response.json();
    }
}

// Login Component
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{email?: string; password?: string}>({});

    // Email validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.length >= 3;
    };

    // Password validation (same as Angular)
    const validatePassword = (password: string): boolean => {
        const hasSpecialChar = /[@&$]/.test(password);
        const noSpaces = /^\S*$/.test(password);
        return password.length >= 6 && hasSpecialChar && noSpaces;
    };

    // Check if form is valid
    const isFormValid = (): boolean => {
        return validateEmail(email) && validatePassword(password);
    };

    // Validate on blur
    const handleEmailBlur = () => {
        if (email && !validateEmail(email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email (min 3 characters)' }));
        } else {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordBlur = () => {
        if (password && !validatePassword(password)) {
            setErrors(prev => ({
                ...prev,
                password: 'Password must be at least 6 characters and contain @, &, or $'
            }));
        } else {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
    };

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        setLoading(true);

        try {
            const response = await AuthService.login(email.trim(), password.trim());

            // Store token in cookie
            CookieManager.set(response?.data?.access_token, 'token');

            // Navigate to settings
            router.push("/settings");

            alert('Success!');
        } catch (error: any) {
            alert(error.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            placeholder="pat@example.com"
                            className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter your Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handlePasswordBlur}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-center">
                        <Link
                            href="/security/forgot-password"
                            className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="flex items-center justify-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Show Password</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid() || loading}
                        className={`w-full text-white rounded-lg px-4 py-2.5 font-medium transition-colors ${
                            !isFormValid() || loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Loading...' : 'Access System'}
                    </button>

                    {/* Divider */}
                    <div className="text-center text-gray-500 text-sm">OR</div>

                    {/* Register Button */}
                    <Link href="/security/register">
                        <button
                            type="button"
                            className="w-full bg-gray-100 text-gray-700 rounded-lg px-4 py-2.5 font-medium hover:bg-gray-200 transition-colors"
                        >
                            Create an Account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}