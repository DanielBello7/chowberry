export type OTP = {
    _id: string;
    email: string;
    code: string;
    type: string; // login | transaction
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
};
