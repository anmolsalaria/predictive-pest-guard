import AuthForm from "@/components/AuthForm"
import Image from "next/image"

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8DEB9] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-02-13_110226-removebg-preview-w517VqqW67TIg8ikMC1M9TBCiQVeKN.png"
          alt="PestGuard Logo"
          width={80}
          height={80}
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Predictive PestGuard</h2>
      </div>
      <AuthForm />
    </div>
  )
}

