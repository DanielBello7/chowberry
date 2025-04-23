export type PAYOUT = {
    _id: string;
    refid: string;
    transaction: string; // transaction id of the withdrawal
    withdrawal: string;
    amount: number;
    currency: string;
    gateway: string;
    reference: string;
    bank: string; // bank name
    slug: string; //bank slug
    number: string; // bank account number
    name: string; // bank account beneficiary name
    createdAt: string;
    updatedAt: string;
};
