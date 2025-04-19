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
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`h-2 transition-all ${isActive ? 'bg-blue-200' : 'bg-transparent'}`}
    />
  );
};

export default DropArea;