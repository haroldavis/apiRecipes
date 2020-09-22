import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Recipe } from './recipe'

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;
    
    @OneToMany(() => Recipe, recipe => recipe.category)
    recipes: Recipe[];
    
}