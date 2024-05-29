import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../_utilities/mergeOpenGraph'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order: Order | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <div className=" p-4">
      <Gutter>
      <h1 className="text-2xl font-bold mb-4">
        Order Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <p className="text-lg"><strong>ID:</strong> {order.id}</p>
        <p className="text-lg"><strong>Ordered On:</strong> {formatDateTime(order.createdAt)}</p>
        <p className="text-lg"><strong>Name:</strong> {order.name}</p>
        <p className="text-lg"><strong>State:</strong> {order.state}</p>    
        <p className="text-lg"><strong>Address:</strong> {order.address}</p>
        <p className="text-lg"><strong>Phone:</strong> {order.phone}</p>
        <p className="text-lg font-bold">
          Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format(order.total)}
        </p>
      </div>
      <hr className="my-4" />
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h4 className="text-xl font-bold mb-4">Order Items</h4>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const { quantity, product, product: { title, meta } } = item
            const isLast = index === (order?.items?.length || 0) - 1
            const metaImage = meta?.image

            return (
              <Fragment key={index}>
                <div className="flex items-center mb-4">
                  <Link href={`/products/${product.slug}`} className="w-20 h-20 mr-4 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    {!metaImage ? <span className="text-gray-500">No image</span> : <Media resource={metaImage} className="w-full h-full object-cover" />}
                  </Link>
                  <div className="flex-grow">
                    <h5 className="text-lg font-bold">
                      <Link href={`/products/${product.slug}`} className="text-blue-600 hover:underline">{title}</Link>
                    </h5>
                    <p className="text-gray-700">Quantity: {quantity}</p>
                    <Price product={product} button={false} quantity={quantity} />
                  </div>
                </div>
                {!isLast && <hr className="my-4" />}
              </Fragment>
            )
          }
          return null
        })}
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <Button href="/orders" appearance="primary" label="See all orders" />
        <Button href="/account" appearance="secondary" label="Go to account" />
      </div>
      </Gutter>
    </div>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
