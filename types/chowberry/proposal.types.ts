export type PROPOSAL = {
    _id: string;
    refid: string; // this is used to connect the partner record and also the documents record
    merchant: string;
    organization: string;
    project: string;
    notes: string | undefined;
    status: string;
    createdAt: string;
    updatedAt: string;
};
