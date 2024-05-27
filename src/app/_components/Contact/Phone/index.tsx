'use client'
import React from 'react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import Image from 'next/image';
import styles from './index.module.scss';

const PhoneComponent = () => {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className="relative">
            <Button 
                className={`md:w-18 md:h-18 rounded-full shadow-lg w-14 h-14 p-3 flex items-center justify-center bg-white ${styles.phone} hover:bg-black/10`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image src="/assets/icons/phone.svg" alt="phone icon" width={50} height={50}/>
            </Button>
            {isHovered && (
                <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
                className="absolute top-[10px] -left-[187px] w-auto h-10 p-5 rounded-full flex items-center justify-center bg-white shadow-md z-10">
                    {/* Content when hovered */}
                    +84 123 456 789
                </div>
            )}
        </div>
    )
}

export default PhoneComponent;
