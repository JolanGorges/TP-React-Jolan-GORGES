import React from 'react';

const FormField = ({ label, type, value, onChange, required = false }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
            type={type}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

export default FormField;