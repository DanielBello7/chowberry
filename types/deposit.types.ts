export type DEPOSIT = {
    _id: string;
    transaction: string;
    wallet: string;
    amount: number;
    before: number; // balance before deposit
    currency: string;
    after: number; // balance after deposit
    gateway: string; // gateway enum
    refid: string; // from transaction
    reference: string; // from gateway
    notes: string;
    createdAt: string;
    updatedAt: string;
};
