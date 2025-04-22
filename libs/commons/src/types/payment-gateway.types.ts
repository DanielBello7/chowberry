export interface PaymentGateway {
    gateway: string;
    makePayment(data: PaymentParams): Promise<PaymentResult>;
    findPayment(refId: string): Promise<PaymentResult>;
    getAvailableBanks(): Promise<BankType[]>;
    verifyCredentials(data: {
        accountNumber: string;
        bankCode: string;
        bankName: string;
    }): Promise<BankCredentials>;
}

export type PaymentParams = {
    accountNumber: string;
    accountBank: string;
    amount: number;
    currency: string;
    beneficiaryName: string;
    narration?: string;
};

export type BankType = {
    name: string;
    code: string | null;
    slug: string;
};

export type BankCredentials = {
    accountNumber: string;
    accountName: string;
};

export type PaymentResult = {
    status: 'successful' | 'failed';
    ref: string;
    amount: number;
    currency: string;
    narration: string;
    createdAt: Date | string;
    accountNumber: string;
    bankName: string;
    bankSlug: string;
    bankCode: string | null;
    customer: {
        name: string;
        phone: string;
        email: string;
    };
};
