const ZENPAY_URL = import.meta.env.VITE_ZENPAY_URL || 'http://localhost:3000';
const API_KEY = import.meta.env.VITE_ZENPAY_API_KEY;
const SECRET_KEY = import.meta.env.VITE_ZENPAY_SECRET_KEY;

export interface ZenPayOrder {
    order_id: string;
    checkout_url: string;
    amount_paise: number;
    status: string;
}

export const createZenPayOrder = async (amountPaise: number, description: string, customerEmail?: string): Promise<ZenPayOrder> => {
    if (!API_KEY || !SECRET_KEY) {
        throw new Error('Missing ZenPay API Keys');
    }

    const response = await fetch(`${ZENPAY_URL}/api/v1/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${SECRET_KEY}`
        },
        body: JSON.stringify({
            amount_paise: amountPaise,
            merchant_order_id: `postly_${Date.now()}`,
            customer_email: customerEmail,
            description: description,
            line_items: [
                {
                    name: "Postly Pro Subscription",
                    description: "Lifetime access to Pro features",
                    amount_paise: amountPaise,
                    quantity: 1
                }
            ],
            metadata: {
                source: 'postly_web'
            }
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create ZenPay order');
    }

    return await response.json();
};
