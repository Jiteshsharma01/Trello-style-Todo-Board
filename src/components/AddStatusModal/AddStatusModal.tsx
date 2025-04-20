import React, { useState } from 'react';

interface AddStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (status: string) => void;
  existingStatuses: string[];
}

const AddStatusModal: React.FC<AddStatusModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd,
  existingStatuses 
}) => {
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    onClose();
    setNewStatus('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus.trim()) {
      setError('Status name cannot be empty');
      return;
    }
    if (existingStatuses.includes(newStatus)) {
      setError('Status already exists');
      return;
    }
    onAdd(newStatus);
    setNewStatus('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1a1a1ae0] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Status</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Enter status name"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          
          <div className="flex justify-end gap-2">
            <button 
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border text-red-500 hover:text-red-700 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 border text-blue-500 hover:text-blue-700 rounded"
            >
              Add Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStatusModal;