export type REFUND = {
    _id: string;
    refid: string;
    transaction: string;
    refund: string; // the transaction id of the tranasction being refunded
    amount: number;
    currency: string;
    wallet: string;
    before: number; // balance before refund
    after: number; // balance after refund
    createdAt: string;
    updatedAt: string;
};
