"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Separate component to handle search params
function SuccessContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log("message", type);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-green-500 p-6 rounded-full "
      >
        ✅
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {type === "login" || type === "signup"
          ? "Bravo! 🎉 You've just unlocked another cinematic adventure! Keep exploring, keep watching, and let the magic of movies continue! 🍿✨"
          : "Success"}
      </motion.h2>
      <Button
        className="mt-6 bg-[var(--foreground)] text-white px-6 py-3 font-semibold rounded"
        onClick={() => router.push("/dashboard")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}

// Page component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}