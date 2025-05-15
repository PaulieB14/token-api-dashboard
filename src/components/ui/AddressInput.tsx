"use client";

import { useState, ChangeEvent } from 'react';
import { shortenAddress } from '@/app/token-api/_utils/utils';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  onBlur?: () => void;
}

/**
 * A specialized input component for Ethereum addresses
 * Includes validation and formatting
 */
export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter address (0x...)',
  label,
  className = '',
  required = false,
  readOnly = false,
  onBlur,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  // Validates Ethereum address format
  const validateAddress = (address: string): boolean => {
    if (!address) return true; // Empty is valid unless required
    if (required && !address) return false;
    
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    onChange(newValue);
    setIsValid(validateAddress(newValue));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsValid(validateAddress(value));
    if (onBlur) onBlur();
  };

  const displayValue = isFocused || !value ? value : shortenAddress(value);

  return (
    <div className={`form-control ${className}`}>
      {label && (
        <label className="label">
          <span className="label-text">{label}{required && <span className="text-red-500">*</span>}</span>
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`input w-full ${!isValid ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
          readOnly={readOnly}
          required={required}
        />
        {!isValid && (
          <div className="text-red-500 text-sm mt-1">Please enter a valid Ethereum address</div>
        )}
      </div>
    </div>
  );
};
