'use client'
import React, { Fragment } from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'
import { useFilter } from '../../_providers/Filter'
import classes from './index.module.scss'
import Link from 'next/link'
export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { title, categories, meta: { image: metaImage, description } = {} } = product
  const { categoryFilters, setCategoryFilters  } = useFilter()
  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      <div className={classes.details}>
        <h2 className="font-bold text-2xl">{title}</h2>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              const { title: categoryTitle,id: categoryID } = category as Category

              const titleToUse = categoryTitle || 'Generic'
              const isLast = index === categories.length - 1

              return (
                <div key={index} className={classes.category}>
                  <span className='font-semibol'>Categories:</span> <Link href="/products" onClick={()=>setCategoryFilters([categoryID])}>{titleToUse} {!isLast && <Fragment>, &nbsp;</Fragment>}</Link>
                  <span className={classes.separator}>|</span>
                </div>
              )
            })}
          </div>
          <p className={classes.stock}> In stock</p>
        </div>

       <div className="flex items-start justify-between flex-col gap-5">
       <div>
          <h3 className="font-bold mr-1">Price:</h3>{product?.price}$
          </div>
          <div className="Color">
            <ColorComponent color={product?.color}/>
          </div>
       </div>
        <div className={classes.description}>
          <h3 className="font-bold text-lg">Description</h3>
          <p className="text-sm font-normal">{description}</p>
        </div>

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  )
}
const ColorComponent = (color:any) => {
  const colorr = color.color
  return (<div>
    <h3 className="font-bold">Color:</h3>
    <div className={classes.chip} style={{ backgroundColor: colorr as string }} />
  </div>)
}