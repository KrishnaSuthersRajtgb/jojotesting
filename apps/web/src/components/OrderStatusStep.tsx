import React from 'react';

interface Props {
  label: string;
  completed: boolean;
}

const OrderStatusStep: React.FC<Props> = ({ label, completed }) => {
  return (
    <div className="flex items-center gap-9">
      <div className={`w-4 h-4 rounded-full ${completed ? 'bg-green-500' : 'bg-gray-300'}`} />
      <span className={completed ? 'text-black' : 'text-gray-400'}>{label}</span>
    </div>
  );
};

export default OrderStatusStep;
