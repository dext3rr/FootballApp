export interface User {
    id: number;
    username: string;
    email: string;
    accountCreationDate: Date;
    roles?: string[];
}
