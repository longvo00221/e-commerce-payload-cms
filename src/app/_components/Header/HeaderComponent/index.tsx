'use client'
import React from 'react';
import type { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter';
import Link from 'next/link';
import Image from 'next/image'
import { HeaderNav } from '../Nav';
import { noHeaderFooterUrls } from '../../../constants';
import { usePathname } from 'next/navigation';
type HeaderComponentProps = {
    header: Header | null
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ header }) => {
    const pathname = usePathname();
    return <nav className={['py-0', noHeaderFooterUrls.includes(pathname) && 'hidden'].filter(Boolean).join(' ')}>
        <Gutter className='flex items-center justify-between flex-wrap'>
            <Link href="/">
                <Image loading="lazy" src="/logo.png" alt="logo" width={120} height={20} className="w-[80px] h-13"/>
            </Link>
            <HeaderNav header={header} />
        </Gutter>
    </nav>
}
export default HeaderComponent;