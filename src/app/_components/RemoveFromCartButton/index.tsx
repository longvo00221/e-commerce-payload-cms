import React from 'react'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = props => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product)

  if (!productIsInCart) {
    return <div>Item is not in the cart</div>
  }
  const handleDeleteProductFromCart = () => {
    try {
      deleteItemFromCart(product)
      toast.success('Product removed from cart')
    } catch (error) {
      toast.error('Error deleting product from cart')
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleDeleteProductFromCart}
      className="flex items-center justify-center p-3 hover:bg-black/10 rounded-md "
    >
      <Image src="/assets/icons/trash.svg" alt="trash icon" width={25} height={25}/>
    </Button>
  )
}
