import { Model } from 'sequelize-typescript';
interface createUserInterface {
    login: string;
    password: string;
}
export declare class User extends Model<User, createUserInterface> {
    id: number;
    login: string;
    password: string;
}
export {};
