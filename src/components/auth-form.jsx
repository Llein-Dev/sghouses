"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAPI, signupAPI } from "@/utils/api/Auth/api";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setError(null);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const response = await loginAPI(formData.email, formData.password);
        console.log("Login successful:", response);
        router.push('/'); // Navigate to the homepage on successful login
      } else {
        const response = await signupAPI(formData.name, formData.email, formData.password);
        console.log("Signup successful:", response);
        toggleForm();
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.'); // Set error message
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex bg-white container mx-auto h-[70vh]">
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-200">
        <img
          src="/dark-blue-house-exterior-2.png"
          alt="Auth illustration"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button variant="link" type="button" className="text-gray-500 w-full" onClick={toggleForm}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </Button>
              <Button type="submit" variant="blue" className="w-full" disabled={loading}>
                {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}

