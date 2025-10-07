"use client";

import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log({ name, email, password });
        // TODO: Add register API call here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-xl p-10 space-y-6 relative overflow-hidden">
                {/* Background subtle illustration */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/background-pattern.svg')] bg-cover bg-center opacity-10 pointer-events-none"></div>

                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 text-center z-10 relative">
                    Create Account
                </h1>
                <p className="text-center text-gray-500 z-10 relative">
                    Start managing your expenses today
                </p>

                {/* Form */}
                <form
                    onSubmit={handleRegister}
                    className="space-y-5 z-10 relative"
                >
                    {/* Name Input */}
                    <div className="relative">
                        <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                        />
                    </div>

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
                                <Lock size={20} />
                            ) : (
                                <Lock size={20} />
                            )}
                        </button>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirm ? (
                                <Lock size={20} />
                            ) : (
                                <Lock size={20} />
                            )}
                        </button>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center text-gray-500 text-sm z-10 relative">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-gray-600 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
