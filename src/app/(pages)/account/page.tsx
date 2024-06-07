import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import { RenderParams } from '../../_components/RenderParams'
import { LowImpactHero } from '../../_heros/LowImpact'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'
import type { User } from '../../../payload/payload-types'

const Account = ({ user }: any) => {
  return (
    <Fragment>
      <Gutter>
        <RenderParams className="params" />
      </Gutter>
      <LowImpactHero
        type="lowImpact"
        media={null}
        richText={[
          {
            type: 'h1',
            children: [
              {
                text: 'Account',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is your account dashboard. Here you can update your account information, view your purchased products, and browse your order history. To manage all users, ',
              },
              {
                type: 'link',
                url: '/admin/collections/users',
                children: [
                  {
                    text: 'login to the admin dashboard.',
                  },
                ],
              },
            ],
          },
        ]}
      />
      <Gutter className="account">
        <AccountForm />
        <HR />
        <h2 className="text-2xl font-bold">Purchased Products</h2>
        <p className="text-base mb-4">
          These are the products you have purchased over time. This provides a way for you to access
          digital assets or gated content behind a paywall. This is different from your orders,
          which are directly associated with individual payments.
        </p>
        <div>
          {user?.purchases?.length || 0 > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.purchases?.map((purchase, index) => {
                return (
                  <li key={index} className="p-4 bg-gray-100 rounded-md">
                    {typeof purchase === 'string' ? (
                      <p>{purchase}</p>
                    ) : (
                      <h4>
                        <Link href={`/products/${purchase.slug}`}>
                          <a className="text-blue-500 hover:underline">{purchase.title}</a>
                        </Link>
                      </h4>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="text-gray-500">You have no purchases.</div>
          )}
        </div>
        <HR />
        <h2 className="text-2xl font-bold">Orders</h2>
        <p className="text-base mb-4">
          These are the orders you have placed over time. Each order is associated with a payment
          intent. As you order products, they will appear in your "purchased products" list.
        </p>
        <Button className="ordersButton" href="/orders" appearance="primary" label="View orders" />
        <HR />
        <Button href="/logout" appearance="secondary" label="Log out" />
      </Gutter>
    </Fragment>
  )
}

export default Account

// export const metadata: Metadata = {
//   title: 'Account',
//   description: 'Create an account or log in to your existing account.',
//   openGraph: mergeOpenGraph({
//     title: 'Account',
//     url: '/account',
//   }),
// };
