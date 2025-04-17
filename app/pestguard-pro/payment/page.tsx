'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from 'react-hot-toast';
import AuthCheck from "@/components/auth/AuthCheck";
import { updateProStatus } from '@/lib/pro-subscription';

function PaymentContent() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateCardNumber = (number: string) => {
    // Remove spaces and check if it's a valid 16-digit number
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpiry = (expiry: string) => {
    // Check MM/YY format and valid date
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    return expMonth >= 1 && expMonth <= 12 && 
           (expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth));
  };

  const validateCVV = (cvv: string) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 3;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'expiry') {
      // Remove any non-digit characters
      const cleaned = value.replace(/\D/g, '');
      
      // Format as MM/YY
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      
      // Limit to 5 characters (MM/YY)
      if (formatted.length > 5) {
        formatted = formatted.slice(0, 5);
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    };

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!validateExpiry(formData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
    }

    if (!validateName(formData.name)) {
      newErrors.name = 'Please enter your full name';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update pro status in Firestore
      await updateProStatus(true);
      
      toast.success('Payment successful! Your Pro subscription is now active.');
      router.push('/pestguard-pro/features');
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8DEB9] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Complete Your Purchase</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      className={errors.expiry ? 'border-red-500' : ''}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? 'border-red-500' : ''}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="e.g., Anmol Salaria"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`${errors.name ? 'border-red-500' : ''} placeholder:text-gray-300`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Pay ₹1'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <AuthCheck>
      <PaymentContent />
    </AuthCheck>
  );
} 