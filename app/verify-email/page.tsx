export default function VerifyEmail() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-semibold">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">
            A verification link has been sent to your email. Please check your inbox and verify your email before logging in.
          </p>
        </div>
      </div>
    );
  }