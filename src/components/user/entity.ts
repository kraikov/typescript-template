import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('user')
export default class User {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
