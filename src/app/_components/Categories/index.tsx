import React from 'react';
import type { Category } from '../../../payload/payload-types';
import classes from './Categories.module.scss';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
type CategoriesProps = {
    categories:Category[]
};

const Categories:React.FC<CategoriesProps> = ({categories}) => {
    
    return <section className={classes.container}>
        <div className={classes.titleWrapper}>
            <h3>Shop by categories</h3>
            <Link href="/products">Show All</Link>
        </div>
        <div className={classes.list}>{
            categories.map((category:Category) => {
                return (
                    <CategoryCard category={category}/>
                )
            })
        }</div>
         </section>
}
export default Categories;