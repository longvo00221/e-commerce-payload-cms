import { Field } from 'payload/types';
import InputField from './inputField/index';
export const validatePrice = (value: string) => {
    const isValidPrice = /^\d+(\.\d{1,2})?$/.test(value);
    
    if (!isValidPrice) {
      return 'Please enter a valid price';
    }
    
    return true;
  };
  
  
const priceField: Field = {
  name: 'price',
  label: 'Price',
  type: 'text',
  admin: {
    components: {
      Field: InputField,
    },
  },
};

export default priceField;
