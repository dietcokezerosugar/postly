export interface ZenPaySuccessEvent {
    type: 'baseupi:success';
    order: {
        order_id: string;
        amount_paise: number;
        status: string;
        merchant_name: string;
    };
}
