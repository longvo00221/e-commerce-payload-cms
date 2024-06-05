'use client'
import React,{useState} from 'react';
import type { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter';
import Link from 'next/link';
import Image from 'next/image'
import { HeaderNav } from '../Nav';
import { noHeaderFooterUrls } from '../../../constants';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../_providers/Auth'
import UserNav from '../UserNav';
import { Button } from '../../../components/ui/button';

import dynamic from 'next/dynamic';
const MobileNav = dynamic(() => import('../MobileNav'));

type HeaderComponentProps = {
    header: Header | null
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({ header }) => {
    const pathname = usePathname();
    const { user } = useAuth()
    const [isNavMobileOpen, setIsNavMobileOpen] = useState(false)
    
    return <nav className={['py-0', noHeaderFooterUrls.includes(pathname) && 'hidden'].filter(Boolean).join(' ')}>
        <Gutter className='flex items-center justify-between flex-wrap relative'>
            <Link href="/">
                <Image loading="lazy" src="/logo.png" alt="logo" width={120} height={20} className="w-[80px] h-13"/>
            </Link>
            <div className="md:hidden block">
                <Button variant="ghost" onClick={()=>setIsNavMobileOpen(true)}>
                    <Image src="/assets/icons/menu.svg" alt="menu icon" width={24} height={24}/>
                </Button>
                {isNavMobileOpen && <MobileNav header={header} user={user}
                isNavMobileOpen={isNavMobileOpen} setIsNavMobileOpen={setIsNavMobileOpen}/>}
            </div>
            <div className="md:flex items-center justify-between flex-wrap hidden ml-auto w-[60%]">
                <HeaderNav header={header} user={user}/>
                <UserNav user={user}/>
            </div>
        </Gutter>
    </nav>
}
export default HeaderComponent;