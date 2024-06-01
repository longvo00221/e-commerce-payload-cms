import React from 'react';

type SpecificationProps = {
  specification: { [key: string]: string | number | boolean | null | object | (string | number | boolean)[] };
};

const Specification: React.FC<SpecificationProps> = ({ specification }) => {
  const renderTableCell = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      return <ul>{renderObjectAsList(value)}</ul>;
    } else if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    } else if (value === null) {
      return 'N/A';
    } else {
      return String(value);
    }
  };

  const renderObjectAsList = (obj: object): React.ReactNode => {
    return Object.entries(obj).map(([key, value], index) => (
      <li key={index}>
        <span className="font-bold">{formatAttributeName(key)}:</span> {renderTableCell(value)}
      </li>
    ));
  };

  const renderTableRows = (): React.ReactNode => {
    return Object.entries(specification).map(([key, value], index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
        <td className="p-2 w-1/2">{formatAttributeName(key)}</td>
        <td className="p-2 w-1/2">{renderTableCell(value)}</td>
      </tr>
    ));
  };

  const formatAttributeName = (name: string): string => {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full border-collapse">
        <tbody className="w-full">{renderTableRows()}</tbody>
      </div>
    </div>
  );
};

export default Specification;
