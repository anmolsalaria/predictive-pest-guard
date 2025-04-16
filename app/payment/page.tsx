'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMockModal, setShowMockModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handlePayment = () => {
    if (!user) {
      setError('Please log in to make a payment');
      return;
    }
    setShowMockModal(true);
  };

  const handleMockPayment = () => {
    setLoading(true);
    // Simulate successful payment
    setTimeout(() => {
      setLoading(false);
      setShowMockModal(false);
      alert('Payment successful! Welcome to Pro!');
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Pro Plan
          </h2>
          <div className="mt-4 text-center">
            <span className="text-4xl font-bold text-[#F8DEB9]">₹1</span>
            <span className="text-gray-500">/month</span>
          </div>
          <div className="mt-2 text-center">
            <span className="line-through text-gray-500">₹1,000/month</span>
          </div>
          <div className="mt-2 text-center">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              99.99% OFF
            </span>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Limited time offer! Regular price ₹1,000/month after promotion
          </p>
        </div>
        <div className="mt-8 space-y-6">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F8DEB9] hover:bg-[#E8CEA9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F8DEB9]"
            >
              {loading ? 'Processing...' : 'Get Pro Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Mock Payment Modal */}
      {showMockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Mock Payment</h3>
            <p className="mb-4">This is a mock payment for demonstration purposes.</p>
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="font-semibold">Order Summary</p>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span>Original Price:</span>
                    <span className="line-through">₹1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span className="text-green-600">-₹999 (99.99%)</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>₹1</span>
                  </div>
                </div>
              </div>
              <div className="border p-4 rounded">
                <p className="font-semibold">Card Details</p>
                <p>Card Number: 4242 4242 4242 4242</p>
                <p>Expiry: 12/25</p>
                <p>CVV: 123</p>
              </div>
              <button
                onClick={handleMockPayment}
                disabled={loading}
                className="w-full bg-[#F8DEB9] text-white py-2 px-4 rounded hover:bg-[#E8CEA9]"
              >
                {loading ? 'Processing...' : 'Complete Payment'}
              </button>
              <button
                onClick={() => setShowMockModal(false)}
                disabled={loading}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 