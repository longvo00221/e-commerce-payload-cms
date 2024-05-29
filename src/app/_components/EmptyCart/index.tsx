import { useRouter } from 'next/navigation';
import React from 'react';

const EmptyCart = () => {
    const router = useRouter()
    const navigateToProducts = () => {
        router.push("/products")
    };

    return (
        <div className="flex flex-col items-center justify-center h-[500px]">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <button
                onClick={navigateToProducts}
                className="mt-4 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-black/80"
            >
                Go to shop
            </button>
        </div>
    );
};

export default EmptyCart;
