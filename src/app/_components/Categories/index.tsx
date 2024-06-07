'use client'
import React, { useEffect } from 'react'
import type { Category } from '../../../payload/payload-types'
import classes from './index.module.scss'
import Link from 'next/link'
import CategoryCard from './CategoryCard'
import AOS from 'aos'
import 'aos/dist/aos.css'
type CategoriesProps = {
  categories: Category[]
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const storeCategories = categories.filter(
    category => category.parent && category.parent?.title === 'stores',
  )
  const serviceCategories = categories.filter(
    category => category.parent && category.parent?.title === 'services',
  )
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div className={classes.container} data-aos="fade-up">
      <section className="my-[50px]">
        <div className={classes.titleWrapper}>
          <h3 className="font-semibold text-3xl">Our store</h3>
        </div>
        <div className={classes.list}>
          {storeCategories.map((category: Category, index) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="my-[50px]" data-aos="fade-up">
        <div className={classes.titleWrapper}>
          <h3 className="font-semibold text-3xl">Our services</h3>
        </div>
        <div className={classes.list}>
          {serviceCategories.map((category: Category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isServices={category.parent?.title === 'services'}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Categories
