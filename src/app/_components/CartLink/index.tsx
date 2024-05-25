'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <Fragment>
        <Image src="/assets/icons/cart.svg" alt="cart icon" width={25} height={25}/>
          {typeof length === 'number' && length > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 text-base rounded-full text-white flex items-center justify-center bg-black">{length}</span>
        )}
      </Fragment>
    </Link>
  )
}
