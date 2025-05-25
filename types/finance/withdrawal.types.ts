export type WITHDRAWAL = {
    _id: string;
    transaction: string;
    currency: string;
    refid: string;
    wallet: string;
    amount: number;
    status: string; // withdrawal status enum
    bank: string; // bank name
    slug: string; //bank slug
    number: string; // bank account number
    name: string; // bank account beneficiary name
    comments: string | undefined;
    createdAt: string;
    updatedAt: string;
};
