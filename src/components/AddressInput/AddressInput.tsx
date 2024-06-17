import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import debounce from 'lodash.debounce';


const getSuggestions = async (value: string) => {
    if (value.length < 3) {
        return [];
    }

    const YANDEX_API_KEY = "temp"

    const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
        params: {
            apikey: YANDEX_API_KEY,
            format: 'json',
            geocode: value,
        },
    });

    return response.data.response.GeoObjectCollection.featureMember.map((item: any) => ({
        text: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
    }));
};

const renderSuggestion = (suggestion: { text: string }) => <div className="suggestion-item">{suggestion.text}</div>;

export default function AddressInput() {
    const [value, setValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<{ text: string }[]>([]);

    const YANDEX_API_KEY = import.meta.env.VITE_YANDEX_API_KEY;
    console.log(YANDEX_API_KEY)

    const debouncedGetSuggestions = useCallback(
        debounce(async (value: string) => {
            const suggestions = await getSuggestions(value);
            setSuggestions(suggestions);
        }, 1000),
        []
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
        setValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        debouncedGetSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Введите адрес',
        value,
        onChange,
    };

    useEffect(() => {
        return () => {
            debouncedGetSuggestions.cancel();
        };
    }, [debouncedGetSuggestions]);

    const renderSuggestionsContainer = ({ containerProps, children }: { containerProps: any; children: any }) => {
        return ReactDOM.createPortal(
            <div {...containerProps} className="suggestions-container">
                {children}
            </div>,
            document.body
        );
    };

    return (
        <div className="regInput100">
            <label htmlFor="address">Адрес доставки:</label>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={(suggestion) => suggestion.text}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                renderSuggestionsContainer={renderSuggestionsContainer}
                theme={{
                    container: 'autosuggest-container',
                    input: 'autosuggest-input',
                    suggestionsContainer: 'suggestions-container',
                    suggestionsList: 'suggestions-list',
                    suggestion: 'suggestion-item',
                }}
            />
        </div>
    );
}
