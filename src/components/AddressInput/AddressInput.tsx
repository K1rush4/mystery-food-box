import React, { useState } from 'react';
import axios from 'axios';
import './AddressInput.css';

const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_API_KEY;

interface Suggestion {
    text: string;
}

interface GeocodeParams {
    apikey: string;
    format: string;
    geocode: string;
}

const AddressInput: React.FC = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

    const fetchSuggestions = async (inputValue: string) => {
        if (inputValue.length < 3) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        try {
            const params: GeocodeParams = {
                apikey: YANDEX_API_KEY,
                format: 'json',
                geocode: inputValue,
            };
            const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', { params });

            const suggestions = response.data.response.GeoObjectCollection.featureMember.map(
                (item: any) => ({
                    text: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
                })
            );
            setSuggestions(suggestions);
            setIsOpen(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue(value);

        if (timerId) {
            clearTimeout(timerId);
        }

        const newTimerId = setTimeout(() => {
            fetchSuggestions(value).then();
        }, 1000);

        setTimerId(newTimerId);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setValue(suggestion.text);
        setSuggestions([]);
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200); // Small delay to allow click events to register
    };

    return (
        <div className="address-input-container">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="address-input"
            />
            {isOpen && suggestions.length > 0 && (
                <ul className="suggestions-container">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressInput;
