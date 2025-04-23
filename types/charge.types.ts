export type CHARGE = {
    _id: string;
    transaction: string; // transaction id of the transaction not the charge
    refid: string;
    amount: number;
    currency: string;
    reason: string; // charge reason enum
    createdAt: string;
    updatedAt: string;
};
