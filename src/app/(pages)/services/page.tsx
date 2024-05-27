import React from 'react';
import type { Category, Page } from '../../../payload/payload-types';
import { fetchDoc } from '../../_api/fetchDoc';
import { draftMode } from 'next/headers';
import { Gutter } from '../../_components/Gutter';
import { Blocks } from '../../_components/Blocks';
import { Hero } from '../../_components/Hero';
import { fetchDocs } from '../../_api/fetchDocs';
import ServiceCategories from '../../_components/ServiceCategories';


const Services = async () => {
    const { isEnabled: isDraftMode } = draftMode()
    let categories: Category[] | null = null
    let page: Page | null = null
    try {
        page = await fetchDoc<Page>({
            collection: 'pages',
            slug: 'services',
            draft: isDraftMode,
        })
        categories = await fetchDocs<Category>('categories')
    } catch (error) {
        console.log(error)
    }
    const { hero, layout } = page
    return (
        <section>
            <Hero {...hero}/>
            <Gutter>
               <ServiceCategories categories={categories}/>
            </Gutter>
        </section>
    )
}
export default Services;