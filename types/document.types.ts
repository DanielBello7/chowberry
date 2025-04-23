export type DOCUMENT = {
    _id: string;
    refid: string; // this connects it to where it was used or generated for
    account: string;
    title: string;
    url: string;
    reason: string; // upload reason enum
    note: string | undefined;
    createdAt: string;
    updatedAt: string;
};
