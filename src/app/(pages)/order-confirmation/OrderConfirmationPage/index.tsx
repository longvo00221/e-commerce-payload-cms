'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      {error ? (
        <Fragment>
          <Message error={error} />
          <p className="text-red-500 my-4">
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className="flex space-x-4 mt-4">
            <Button href="/account" label="View account" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
          <p className="text-gray-700 mb-4">
            {`Your order has been confirmed. You will receive an email confirmation shortly. Your order ID is ${orderID}.`}
          </p>
          <div className="flex space-x-4 mt-4">
            <Button href={`/orders/${orderID}`} label="View order" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
