export type PURCHASE = {
    _id: string;
    refid: string;
    transaction: string;
    merchant: string;
    beneficiary: string;
    wallet: string; // wallet of merchant
    token: string;
    product: string;
    amount: number;
    currency: string;
    before: number; // balance in token before
    after: number; // balance in token after
    createdAt: string;
    updatedAt: string;
};
