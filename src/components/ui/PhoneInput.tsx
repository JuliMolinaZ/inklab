'use client';

import { useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

const countryCodes = [
  { code: '+57', country: 'CO', flag: '🇨🇴', placeholder: '324 358 2350' },
  { code: '+1', country: 'US', flag: '🇺🇸', placeholder: '555 123 4567' },
  { code: '+52', country: 'MX', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { code: '+34', country: 'ES', flag: '🇪🇸', placeholder: '612 345 678' },
  { code: '+54', country: 'AR', flag: '🇦🇷', placeholder: '11 2345 6789' },
];

export function PhoneInput({ name, label, required, error, placeholder }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]!); // Colombia por defecto
  const inputId = useId();

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-fg">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>

      <div className="flex gap-2">
        {/* Country Code Selector */}
        <select
          value={selectedCountry.code}
          onChange={(e) => {
            const country = countryCodes.find(c => c.code === e.target.value);
            if (country) setSelectedCountry(country);
          }}
          className={cn(
            'flex h-11 w-24 items-center rounded-xl border border-border bg-bg px-3 text-sm transition-colors',
            'hover:border-accent/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
            error && 'border-error focus:border-error focus:ring-error/20'
          )}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.code}
            </option>
          ))}
        </select>

        {/* Phone Number Input */}
        <input
          type="tel"
          id={inputId}
          name={name}
          required={required}
          placeholder={placeholder || selectedCountry.placeholder}
          className={cn(
            'flex-1 h-11 rounded-xl border border-border bg-bg px-4 text-sm transition-colors placeholder:text-fg-subtle',
            'hover:border-accent/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20',
            error && 'border-error focus:border-error focus:ring-error/20'
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
