export type TICKET = {
    _id: string;
    subject: string;
    body: string | undefined;
    admin: string | undefined;
    account: string;
    status: string;
    createdAt: string;
    updatedAt: string;
};
