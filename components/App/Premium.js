import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import SubscriptionFlow from './SubscriptionFlow';

const PremiumSubscription = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      setIsBuying(true);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus({
        type: 'error',
        message: "We couldn't process your subscription. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10 hover:bg-primary/20 dark:hover:bg-primary-dark/20"
        onClick={() => setIsOpen(true)}
      >
        {t.premium}
      </Button>
      {isBuying ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md">
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <SubscriptionFlow />
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upgrade to Premium</DialogTitle>
                <DialogDescription>
                  Get exclusive access to premium features and remove all limitations.
                </DialogDescription>
              </DialogHeader>

              {status && (
                <div className={`p-3 rounded-md mb-4 ${status.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                  {status.message}
                </div>
              )}

              <div className="py-4">
                <h3 className="font-semibold text-lg mb-2">Premium Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited access to all features
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics and reporting
                  </li>
                </ul>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-4">
                <div className="text-center">
                  <span className="text-2xl font-bold">$9.99</span>
                  <span className="text-muted-foreground"> / month</span>
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubscribe} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Subscribe Now"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

    </>
  );
};

export default PremiumSubscription;