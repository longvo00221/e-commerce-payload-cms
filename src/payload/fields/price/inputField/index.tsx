import React from 'react';
import { useFieldType } from 'payload/components/forms';
import { Label } from 'payload/components/forms';
import { Props } from 'payload/components/fields/Text';
import { validatePrice } from '../priceField'; // Adjust import here
import './styles.scss';

const baseClass = 'custom-price-input';

const InputField: React.FC<Props> = (props) => {
  const { path, label, required } = props;
  const { value = '', setValue } = useFieldType({
    path,
    validate: validatePrice, // Use validatePrice function for price validation
  });

  return (
    <div className={baseClass}>
      <Label htmlFor={path} label={label} required={required} />
      <input
        type="number"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputField;
