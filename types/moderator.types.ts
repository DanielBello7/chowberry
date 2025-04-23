export type MODERATOR = {
    _id: string;
    account: string;
    organization: string;
    name: string;
    email: string;
    isActive: boolean; // controlled by the organization account
    createdAt: string;
    updatedAt: string;
};
