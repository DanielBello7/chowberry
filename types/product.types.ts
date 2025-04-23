export type PRODUCT = {
    _id: string;
    merchant: string;
    title: string;
    img: string | undefined;
    amount: number;
    currency: string; // currency enum
    description: string;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
};
