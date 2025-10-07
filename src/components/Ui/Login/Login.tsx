"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
        // TODO: Add login API call here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-10 space-y-6 relative overflow-hidden">
                {/* Background subtle illustration */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/background-pattern.svg')] bg-cover bg-center opacity-10 pointer-events-none"></div>

                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 text-center z-10 relative">
                    Expense Manager
                </h1>
                <p className="text-center text-gray-500 z-10 relative">
                    Manage your expenses effortlessly
                </p>

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-5 z-10 relative"
                >
                    {/* Email Input */}
                    <div className="relative">
                        <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm text-gray-500">
                        <a
                            href="/auth/forgot-password"
                            className="hover:underline text-gray-600"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium hover:cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <div className="text-center text-gray-500 text-sm z-10 relative">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-gray-600 hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
