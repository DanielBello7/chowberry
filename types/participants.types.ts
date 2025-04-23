export type PARTICIPANT = {
    _id: string;
    refid: string; // number connecting the participants to the application request, exists alone if application wasnt used
    project: string;
    organization: string;
    beneficiary: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
