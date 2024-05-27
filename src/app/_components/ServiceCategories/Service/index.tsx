'use client';
import React, { useEffect } from 'react';
import type { Category, Media } from '../../../../payload/payload-types';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

type ServiceProps = {
    category: Category;
    key: number;
    price: string;
    isEven: boolean;
};

const Service: React.FC<ServiceProps> = ({ category, price, key, isEven}) => {
    const media = category.media as Media;
    useEffect(() => {
        AOS.init();
    }, [])
    const animationDirection = isEven ? 'fade-right' : 'fade-left';
    return (
        <div className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center p-4 border-b border-gray-200 md:py-20 py-10`} data-aos={animationDirection}>
            <div className="md:w-1/2 w-full p-4">
                <Image src={media.url} alt="service image" width={250} height={250} className="w-full h-auto max-h-[300px] object-cover rounded-md" />
            </div>
            <div className="md:w-1/2 w-full p-4">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-lg font-base my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam debitis vitae aspernatur itaque unde error ab .</p>
                <div className="text-gray-700"><a className="px-4 py-2 bg-black rounded-md text-white uppercase mt-5 block w-full md:max-w-[200px] text-center hover:bg-black/90" href="tel:+84902595237">{price}</a></div>
            </div>
        </div>
    );
};

export default Service;
