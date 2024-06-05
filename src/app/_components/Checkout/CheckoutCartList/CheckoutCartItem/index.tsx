import React from 'react';
import Link from 'next/link';
import { Media as MeDia } from '../../../Media';
import { Media, Product } from '../../../../../payload/payload-types';


interface CheckoutCartItemProps {
  product: Product;
  title: string;
  metaImage: string | Media;
  qty: number;
}

const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({
  product,
  title,
  metaImage,
  qty,
}) => {
  return (
    <li className="flex items-center py-4">
      <Link href={`/products/${product.slug}`} className="relative min-h-[100px] p-4 flex-shrink-0">
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <MeDia className="h-[60px] w-[60px] object-contain" resource={metaImage} />
        )}
      </Link>
      <div className="ml-4 flex flex-col justify-between">
        <h3 className="font-bold truncate max-w-[150px]">{title}</h3>
        <p>{product.price}$</p>
        <p>Quantity: {qty}</p>
      </div>
    </li>
  );
};

export default CheckoutCartItem;
