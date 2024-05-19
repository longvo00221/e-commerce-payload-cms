'use client'
import React from 'react';
import type { Category, Media } from '../../../../payload/payload-types';
import classes from './index.module.scss';
import { useFilter } from '../../../_providers/Filter';
import Link from 'next/link';
type CategoryCardProps = {
    category: Category
    key?:number
};

const CategoryCard:React.FC<CategoryCardProps> = ({category,key}) => {
    const media = category.media as Media
    const { setCategoryFilters } = useFilter()
    return (
        <Link href="/products" className={classes.card} style={{ backgroundImage: `url(${media.url})` }}
        onClick={()=>setCategoryFilters([category.id])}>
            <p className={classes.title}>{category.title}</p>
        </Link>
    )
}
export default CategoryCard;