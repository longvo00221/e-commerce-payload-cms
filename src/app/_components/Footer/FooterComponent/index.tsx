'use client'
import React from 'react';
import type { Footer, Media } from '../../../../payload/payload-types'
import {  noHeaderFooterUrls } from '../../../constants';
import { usePathname } from 'next/navigation';
import { Gutter } from '../../Gutter';
import Image from 'next/image';
import classes from './index.module.scss';
import Link from 'next/link';
import { Button } from '../../Button';
type FooterComponentProps = {
    footer: Footer | null;
};

const FooterComponent: React.FC<FooterComponentProps> = ({ footer }) => {
    const pathname = usePathname()
    const navItems = footer?.navItems || []
    return (
        <footer className={noHeaderFooterUrls.includes(pathname) ? 'hidden md:mt-10 mt-5' : 'md:mt-[100px] mt-[50px]'}>
            <div className={classes.footer}>
                <Gutter>
                    <div className={classes.wrap}>
                        <Link href="/">
                            <Image src="/footer-logo.png" alt='logo' width={100} height={30} loading='lazy'/>
                        </Link>
                        {/* if you want to add the additional data into footer or header there are 3 steps that you need to follow
                        first: modify global.ts in _graphql because this is the file where logic grapql use to query
                        second: modify in Footer.ts in payload/global this is the file that whill set data for server
                        third: modify in payload-types this is the file for types of data use in app
                        after finish all these task you need to payload generate:graphQLSchema and generate:types to apply a new query logic and new types before you config*/}
                        <p>{footer.copyright}</p>
                        <div className='flex gap-5'>
                            {navItems.map((item,index) => {
                                // the step to add icon into navlink in footer
                                // first modify link.ts in _grapql
                                // second: modify link.ts in payload/fields

                                const icon = item?.link?.icon as Media
                                return(
                                    <Button key={item.link.label} el="link" href={item.link.url} newTab={true} className='w-full'>
                                        <Image src={icon?.url} alt={item.link.label} width={24} height={24} className='h-6 w-6'/>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </Gutter>
            </div>
        </footer>
    )
}
export default FooterComponent;