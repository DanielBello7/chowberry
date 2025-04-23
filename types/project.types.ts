export type PROJECT = {
    _id: string;
    title: string;
    description: string;
    organization: string;
    currency: string;
    budget: number;
    balance: number;
    status: string;
    start: string | undefined; // date the project is to start
    finish: string | undefined; // date the project is to be stopped
    initial: number; // amount each beneficiary is to recieve upon being added to the project
    country: string;
    region: string;
    createdAt: string;
    updatedAt: string;
};
