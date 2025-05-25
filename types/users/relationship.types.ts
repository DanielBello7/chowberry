export type RELATIONSHIP = {
    _id: string;
    source: string; // person id
    target: string; // person id
    type: string; // relationship type
    note: string | undefined;
    createdAt: string;
    updatedAt: string;
};
