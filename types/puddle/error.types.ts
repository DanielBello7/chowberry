export type Error = {
    _id: string;
    source: string; // error source enum
    message: string;
    context: string;
    isCritical: boolean;
    account: string | null;
    createdAt: string;
    updatedAt: string;
};
