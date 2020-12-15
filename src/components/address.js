import React, { useContext, useReducer, useState, useEffect } from 'react';
import { Dropdown, Form } from 'semantic-ui-react'
import { Address } from '../context/address.context';

const initialState = {
    province: '',
    district: '',
    locality: '',
    neighborhood: '',
    postal: '',
    street: ''  
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'province':
            return {
                ...initialState,
                'province': action.value,
                'street': state.street
            }
        case 'district':
            return {
                ...initialState,
                'district': action.value,
                'province': state.province,
                'street': state.street
            }
        case 'locality':
            return {
                ...state,
                'locality': action.value,
                'neighborhood': action.data.neighborhood,
                'postal': action.data.postal,
            }
        case 'street':
            return {
                ...state,
                'street': action.value
            }      
        default:
            return { ...state };
    }
};

const AddressForm = () => {

    const { getDistricts, getLocalities, address } = useContext(Address);

    const [formFields, setFormField] = useReducer(reducer, initialState);
    const [options, setOptions] = useState({})

    const { province, district, locality, street, neighborhood, postal } = formFields;

    useEffect(() => {
        (() => {            
            setOptions(prevState => {
                return {
                    ...prevState,
                    ...address
                }
            });
        })();
    }, [address])

    const onProvinceSelect = (name, province) => {
        setFormField({
            type: name,
            value: province
        })
        if (province) getDistricts(province);
    }

    const onDistrictSelect = (name, district) => {
        setFormField({
            type: name,
            value: district
        })
        if (district) getLocalities(province, district);
    }

    const onLocalitySelect = (name, value) => {
        const splitData = value.split(",");

        const locality = splitData[0].trim();
        const neighborhood = splitData[1].trim();
        const postal = splitData[2].trim();

        const data = { locality, neighborhood, postal }
        setFormField({ type: 'locality', data, value });
    }

    const onStreetChange = (event) => {
        const { value } = event.target;
        setFormField({ type: 'street', value });
    }
  
    const customSearch = (options, value) => {
        const filtered = options.filter(
            function (obj) {
                const letters = { 'I': 'ı', 'İ': 'i' }
                const findObj = obj.value
                    .replace(/[İI]/g, (letter) => letters[letter])
                    .toLowerCase().indexOf(value.toLowerCase()) !== -1;
                return findObj;
            }
        );
        return filtered;
    }

    return (
        <>
            <div className='main-container'>
                <div className='ui form'>
                    <div className='address-form'>
                        <div className='column-container'>
                            <div className='column-header'>Adres Bilgileri</div>
                            <div className='column'>
                                <div className='drop-down inline field'>
                                    <div className='inline field'>
                                        <label>İL</label>
                                        <Dropdown
                                            options={options.provinces || []}
                                            loading={address.isLoading.provinces}
                                            placeholder='Lütfen Seçiniz'
                                            clearable
                                            search={customSearch}
                                            selection
                                            fluid
                                            value={province}
                                            name='province'
                                            onChange={(e, { name, value }) => onProvinceSelect(name, value)}
                                        />
                                    </div>
                                </div>
                                <div className='drop-down inline field'>
                                    <div className='inline field'>
                                        <label>İLÇE</label>
                                        <Dropdown
                                            options={options.districts || []}
                                            disabled={!province}
                                            loading={address.isLoading.districts}
                                            placeholder='Lütfen Seçiniz'
                                            clearable
                                            search={customSearch}
                                            selection
                                            fluid
                                            value={district}
                                            name='district'
                                            onChange={(e, { name, value }) => onDistrictSelect(name, value)}
                                        />
                                    </div>
                                </div>
                                <div className='drop-down inline field'>
                                    <div className='inline field'>
                                        <label>MAHALLE</label>
                                        <Dropdown
                                            options={options.localities || []}
                                            disabled={!district}
                                            loading={address.isLoading.localities}
                                            placeholder='Lütfen Seçiniz'
                                            clearable
                                            search={customSearch}
                                            selection
                                            fluid
                                            value={locality}
                                            name='locality'
                                            onChange={(e, { name, value }) => onLocalitySelect(name, value)}
                                        />
                                    </div>
                                </div>
                                <Form.Input
                                    inline
                                    label='SEMT'
                                    placeholder={neighborhood}
                                    disabled={!locality}
                                    readOnly />
                                <Form.Input
                                    inline
                                    label='POSTA KODU'
                                    placeholder={postal}
                                    disabled={!locality}
                                    readOnly />
                                <Form.TextArea
                                    inline
                                    label='ADRES'
                                    placeholder='Cadde, Sokak, Kapı No...'
                                    value={street}
                                    onChange={onStreetChange}
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddressForm;