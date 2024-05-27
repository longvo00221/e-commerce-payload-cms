import React from 'react';
import type { Category } from '../../../payload/payload-types';
import ServiceWithPrice from './HOC';

type ServiceCategoriesProps = {
    categories:Category[] | null
};

const ServiceCategories:React.FC<ServiceCategoriesProps> = ({categories}) => {
    
    return (
        <section className="mt-10 mb-5">
            <h2 className="font-bold text-2xl flex justify-center">Service Categories</h2>
            <ul>
                {categories?.filter(category =>category.parent && category.parent?.title === 'services')?.map((category,index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <ServiceWithPrice category={category} key={index} isEven={isEven}/>
                    )
                })}
            </ul>
        </section>
    )
}
export default ServiceCategories;