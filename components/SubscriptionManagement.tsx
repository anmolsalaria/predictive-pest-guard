'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { updateProStatus } from '@/lib/pro-subscription';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SubscriptionManagement() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      await updateProStatus(false);
      toast.success('Your subscription has been cancelled successfully.');
      router.push('/pestguard-pro');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription. Please try again.');
    } finally {
      setIsCancelling(false);
      setShowCancelDialog(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowCancelDialog(true)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Cancel Subscription
      </Button>

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your Pro subscription? You will lose access to all Pro features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isCancelling}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isCancelling}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 