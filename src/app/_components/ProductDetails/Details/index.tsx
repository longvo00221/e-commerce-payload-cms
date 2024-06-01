import React from 'react';
import RichText from '../../RichText';


type DetailsProps = {
  details: any; 
};

const Details: React.FC<DetailsProps> = ({ details }) => {
  return <RichText content={details} />;
};

export default Details;
