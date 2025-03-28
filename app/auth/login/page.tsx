"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/slices/authSlice";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../../../redux/store";
import toast, { Toaster } from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginForm>({
    mode: "onBlur"
  });

  const handleLogin = async (data:LoginForm)=>{
    setError(null)
    try {
      const res = await dispatch(userLogin({ email: data.email, password: data.password }))
      
      if(res?.payload?.status == 200){
        // Show success toast
        toast.success('Logged in successfully!', {
          duration: 4000, // Display for 4 seconds
          position: 'top-right', // Position of the toast
          style: {
            background: '#4CAF50', // Green background
            color: 'white', // White text
            padding: '16px',
            borderRadius: '8px'
          }
        });

        // Redirect to dashboard after a short delay to show toast
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000);
      } else {
        // Handle login failure
        toast.error(res?.payload?.message || 'Login failed', {
          duration: 4000,
          position: 'top-right',
          style: {
            background: '#FF5252', // Red background
            color: 'white',
            padding: '16px',
            borderRadius: '8px'
          }
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error(`An unexpected error occurred ${error}`, {
        duration: 4000,
        position: 'top-right',
               
      });
    }
  }

  return (
    <div className="auth-container">
      {/* Add Toaster component to render toasts */}
      <Toaster />

      <div className="absolute inset-0 bg-[url('/netflix-bg.jpg')] bg-cover bg-center opacity-50 w-[100vw] h-[100vh]"></div>
      <div className="absolute inset-0 bg-overlay"></div>
      <div className="auth-box z-2">
        <h1 className="text-4xl font-bold text-center text-[var(--foreground)] heading">
          CineFlow
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form
          className="mt-6 flex flex-col items-center space-y-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            type="email"
            placeholder="Email"
            required={true}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email"
              }
            })}
            className="mt-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm flex flex-row justify-start items-center">{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Password"
            required={true}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-start">{errors.password.message}</p>
          )}
          <div className="w-full">
          <button
            type="submit"
            className="bg-[var(--foreground)] text-white-800 font-semibold py-3 mt-3 w-full"
            disabled={!isValid}
          >
            Sign In
          </button>
          </div>
        </form>

        <div className="mt-5 flex justify-between text-sm text-gray-400 p-3 forgotSection">
          <Link href="#">Forgot password?</Link>
          <Link href="/auth/signup" className="text-[var(--foreground)] mt-3">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}