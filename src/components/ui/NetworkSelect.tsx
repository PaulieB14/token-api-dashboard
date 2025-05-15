"use client";

import { EVM_NETWORKS, NetworkId } from '@/app/token-api/_config/networks';

interface NetworkSelectProps {
  value?: NetworkId;
  onChange: (value: NetworkId) => void;
  label?: string;
  className?: string;
  required?: boolean;
}

/**
 * A dropdown component for selecting EVM networks
 */
export const NetworkSelect: React.FC<NetworkSelectProps> = ({
  value = 'mainnet',
  onChange,
  label = 'Network',
  className = '',
  required = false,
}) => {
  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text">{label}{required && <span className="text-red-500">*</span>}</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value as NetworkId)}
        required={required}
      >
        {EVM_NETWORKS.map((network) => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </select>
    </div>
  );
};
