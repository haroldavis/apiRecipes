import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { User } from './user'
import { Category } from './category'

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column()
    description: string;

    @Column()
    ingredients: string;

    @ManyToOne(() => User, user => user.recipes)
    user: User;

    @ManyToOne(() => Category , category => category.recipes)
    category: Category;


}