'use client'
import React, { Fragment } from 'react';
import CheckoutForm from '../../_components/Checkout/CheckoutForm';
import CheckoutCartList from '../../_components/Checkout/CheckoutCartList';
import { Gutter } from '../../_components/Gutter';
import { useAuth } from '../../_providers/Auth';
import { useCart } from '../../_providers/Cart';
import Link from 'next/link';
import EmptyCart from '../../_components/EmptyCart';
import { LoadingShimmer } from '../../_components/LoadingShimmer';

const Checkout = () => {
    const { user } = useAuth()
    const { cart, cartIsEmpty, cartTotal, hasInitializedCart } = useCart()
  
    return (
        <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div>
              <EmptyCart/>
             
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className="mt-10">
            <Gutter>
                <div className="flex md:flex-row flex-col w-full items-start justify-between gap-5">
                    <div className="md:w-[70%] w-full">
                        <CheckoutForm cart={cart} cartTotal={cartTotal} />
                    </div>
                    <div className="md:w-[30%] w-full">
                        <CheckoutCartList cart={cart} cartTotal={cartTotal} />
                    </div>
                </div>
            </Gutter>
        </div>
          )}
        </Fragment>
      )}
    </Fragment>
       
    )
}
export default Checkout