export type TOKEN = {
    _id: string;
    code: string;
    beneficiary: string;
    project: string;
    organization: string;
    amount: number; // amount token was generated with
    balance: number; // amount token currently has
    currency: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
