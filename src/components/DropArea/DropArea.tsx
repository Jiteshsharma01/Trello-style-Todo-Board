import React, { useState } from 'react';

interface DropAreaProps {
  onDrop: () => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [isActive, setIsActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleDragLeave = () => {
    setIsActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(false);
    onDrop();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={() => setIsActive(true)}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`h-2 transition-all ${isActive ? 'h-[50px] border border-dashed rounded-lg opacity-70 p-2 text-sm' : 'bg-transparent opacity-0'}`}
    >
      Drop Here
    </div>
  );
};

export default DropArea;