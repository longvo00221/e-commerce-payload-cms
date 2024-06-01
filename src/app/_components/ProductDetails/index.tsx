'use client'
import React, { useState } from 'react';
import Details from './Details';
import Specification from './Specifications';
import { Button } from '../../components/ui/button';
import { Gutter } from '../Gutter';

const ProductDetails = ({ details, specification }) => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div>
      <div className="flex w-full justify-center items-center mb-4">
        <Button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 mr-2 ${activeTab === 'details' ? 'bg-black text-white' : 'bg-gray-200 text-black'} hover:opacity-90`}
        >
          Details
        </Button>
        <Button
          onClick={() => setActiveTab('specification')}
          className={`px-4 py-2 ${activeTab === 'specification' ? 'bg-black text-white' : 'bg-gray-200 text-black'} hover:opacity-90`}
        >
          Specification
        </Button>
      </div>
      <div className="border p-4">
        <Gutter>
            {activeTab === 'details' && <Details details={details} />}
            {activeTab === 'specification' && <Specification specification={specification} />}
        </Gutter>
      </div>
    </div>
  );
};

export default ProductDetails;
