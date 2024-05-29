import React from 'react';
import CheckoutCartItem from './CheckoutCartItem';
import type { Product } from '../../../../payload/payload-types';


interface CheckoutCartListProps {
    cart:{ items?: { product?: string | Product; quantity?: number; id?: string; }[]; }
    cartTotal: { formatted: string; raw: number; };
}

const CheckoutCartList: React.FC<CheckoutCartListProps> = ({ cart, cartTotal }) => {
  return (
    <div className="p-4 rounded-md relative  bg-white shadow-md">
      <ul className="max-h-[450px] min-h-[200px] overflow-y-auto">
        {cart?.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const { quantity, product, product: { title, price } } = item;
            return (
              <CheckoutCartItem
                key={item.id}
                product={product}
                title={title}
                metaImage={item.product.meta?.image}
                qty={quantity}
              />
            );
          }
          return null;
        })}
      </ul>
      <div className="mt-4 border-t absolute bottom-0 left-0 bg-white z-10 p-5 w-full ">
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{cartTotal.formatted}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartList;
