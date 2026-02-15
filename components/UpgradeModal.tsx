import React, { useState } from 'react';
import { Button } from './ui-lib';
import { useStore } from '../store';

import { createZenPayOrder } from '../src/lib/zenpay';
import { ZenPaySuccessEvent } from '../src/types/zenpay';
import { supabase } from '../src/lib/supabase';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
    const { togglePro, user, isPro } = useStore();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleUpgrade = async () => {
        try {
            setLoading(true);
            setErrorMessage(null);

            // 1. Create Order
            const amountPaise = 100; // ₹1.00
            const order = await createZenPayOrder(
                amountPaise,
                "Postly Pro Subscription",
                user?.email
            );

            // 2. Open Popup
            // Calculate center position
            const width = 500;
            const height = 700;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            const popup = window.open(
                order.checkout_url,
                'ZenPayCheckout',
                `width=${width},height=${height},left=${left},top=${top}`
            );

            if (!popup) {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }

            // 3. Listen for Success Message
            const messageHandler = (event: MessageEvent) => {
                // Verify origin if needed, but ZenPay URL might vary in dev
                // if (event.origin !== 'http://localhost:3000') return; 

                if (event.data?.type === 'baseupi:success') {
                    console.log('Payment Successful:', event.data.order);
                    popup.close();
                    window.removeEventListener('message', messageHandler);

                    // 4. Upgrade User
                    if (!isPro) {
                        togglePro();

                        // Persist to Supabase if user is logged in
                        if (user) {
                            supabase.from('profiles').update({
                                is_pro: true,
                                // store order details if useful? 
                                // stripe_customer_id: event.data.order.order_id 
                            }).eq('id', user.id).then(({ error }) => {
                                if (error) console.error('Failed to sync Pro status:', error);
                            });
                        }
                    }

                    // TODO: Sync to backend here if needed

                    onClose();
                    alert('Welcome to Pro! Your subscription is active.');
                }
            };

            window.addEventListener('message', messageHandler);

            // Cleanup listener if popup receives loaded polling or user closes manually
            const timer = setInterval(() => {
                if (popup.closed) {
                    clearInterval(timer);
                    window.removeEventListener('message', messageHandler);
                    setLoading(false);
                }
            }, 1000);

        } catch (error: any) {
            console.error('Payment failed:', error);
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
                    <h2 className="text-lg font-semibold leading-none tracking-tight">Upgrade to Pro</h2>
                    <p className="text-sm text-muted-foreground">
                        Unlock premium features and take your posts to the next level.
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 rounded text-sm bg-red-100 text-red-600 dark:bg-red-900/30">
                        {errorMessage}
                    </div>
                )}

                <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Verified Badge</p>
                            <p className="text-sm text-muted-foreground">Add official verified checkmark</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Transparent Backgrounds</p>
                            <p className="text-sm text-muted-foreground">Export clean assets without bg</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-md border p-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">Dark Mode Exports</p>
                            <p className="text-sm text-muted-foreground">Perfect for dark themed content</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-4">
                    <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button onClick={handleUpgrade} disabled={loading}>
                        {loading ? (
                            <><span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" /> Processing...</>
                        ) : "Pay ₹1 via UPI"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
