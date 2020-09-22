import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Recipe } from './recipe'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(()=> Recipe, recipe => recipe.user)
    recipes: Recipe[];

    
}