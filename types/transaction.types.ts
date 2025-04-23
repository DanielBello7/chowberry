export type TRANSACTION = {
    _id: string;
    refid: string;
    currency: string;
    amount: number;
    type: string; // transaction enum
    createdAt: string;
    updatedAt: string;
};
