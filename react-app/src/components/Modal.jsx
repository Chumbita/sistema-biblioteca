import React from 'react';

const Modal = ({ title, inputs, formData, isOpen, onClose, onSubmit, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form>
          {inputs.map((input) => (
            <div key={input.name} className="mb-4">
              <label className="block mb-1 font-medium">{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={formData[input.name] || ''}
                placeholder={input.placeholder}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </form>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
