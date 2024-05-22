import React from 'react';
import type { Category } from '../../../payload/payload-types';
import classes from './index.module.scss';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
type CategoriesProps = {
    categories:Category[]
};

const Categories:React.FC<CategoriesProps> = ({categories}) => {
    return <section className={classes.container}>
        <div className={classes.titleWrapper}>
            <h3 className="font-semibold text-xl">We have anything you need</h3>
        </div>
        <div className={classes.list}>{
            categories?.map((category:Category,index) => {
                return (
                    <CategoryCard key={index} category={category}/>
                )
            })
        }</div>
         </section>
}
export default Categories;