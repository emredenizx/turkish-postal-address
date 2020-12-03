import React, { useContext, useReducer, useState, useEffect } from 'react';
import { Dropdown, Form } from 'semantic-ui-react'
import { Address } from '../context/address.context';
import { formatProvinces, formatDistricts, formatLocalities } from '../utils/utils';

const initialState = {
    province: '',
    district: '',
    locality: '',
    neighborhood: '',
    postal: '',
    street: '',
    loading : {
        provinces:false,
        districts:false,
        localities:false
    }
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
            case 'loading':
                return {
                    ...state,
                    loading : {
                        ...state.loading,
                        [action.field] : action.value
                    }
                }
        default:
            return { ...state };
    }
};

const AddressForm = () => {

    const { getDistricts, getLocalities, address } = useContext(Address);

    const [formFields, setFormField] = useReducer(reducer, initialState);   

    const [provinces, setProvinceOptions] = useState(address.provinces);
    const [districts, setDistrictOptions] = useState(address.districts);
    const [localities, setLocalityOptions] = useState(address.localities);

    const { province, district, locality, street, neighborhood, postal, loading } = formFields;    

    useEffect(() => {
        setLoading('provinces',true)
        const provinces = formatProvinces(address.provinces);
        setProvinceOptions(provinces);
        setLoading('provinces',false)
    }, [address.provinces]);

    useEffect(() => {
        setLoading('districts',true)
        const districts = formatDistricts(address.districts);
        setDistrictOptions(districts);
        setLoading('districts',false)
    }, [address.districts]);

    useEffect(() => {
        setLoading('localities',true)
        const localities = formatLocalities(address.localities);
        setLocalityOptions(localities);
        setLoading('localities',false)
    }, [address.localities]);

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

    const setLoading = (field, value) => {
        setFormField({ 
            type: 'loading', 
            field: field,
            value 
        });
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
                                            options={provinces || []}                                            
                                            loading={loading.provinces}
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
                                            options={districts || []}
                                            disabled={!province}
                                            loading={loading.districts}
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
                                            options={localities || []}
                                            disabled={!district}
                                            loading={loading.localities}                                            
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