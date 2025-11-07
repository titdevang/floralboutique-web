'use client';

import 'react-phone-input-2/lib/style.css';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';

interface PhoneInputProps {
    value?: string;
    onChange?: (value: string) => void;
}

export default function IntlPhoneInput({ value = '', onChange }: PhoneInputProps) {
    const [phone, setPhone] = useState(value);

    useEffect(() => {
        if (value !== phone) setPhone(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (phoneValue: string) => {
        setPhone(phoneValue);
        onChange?.(phoneValue);
    };

    return (
        <div className="flex flex-col ">
            <PhoneInput
                country={'in'}
                onlyCountries={['in']}
                value={phone}
                placeholder={"Mobile Number"}
                disableCountryGuess={false}
                onChange={handleChange}
                inputClass="w-full placeholder:text-primary border !rounded-none !border-gray-light px-3 py-5 focus:!border-1 focus:!border-primary focus:ring-0 focus:outline-none transition duration-500"
                inputStyle={{ width: '100%', fontFamily: 'Montserrat, Montserrat Fallback !important' }}
                disableDropdown={false}
                countryCodeEditable={false}
                buttonClass={"!bg-transparent !border-none hover:bg-transparent focus:!bg-transparent"}

            />
        </div>
    );
}
