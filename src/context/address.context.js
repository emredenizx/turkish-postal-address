import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { fetchProvinces, fetchDistricts, fetchLocalities } from '../firebase/firebase.js';

const initialState = {
    provinces: [],
    districts: [],
    localities: [],
    isLoading: {
        provinces: false,
        districts: false,
        localities: false
    }
};

const addressReducer = (state, action) => {
    switch (action.type) {
        case 'setAddressItem':
            return {
                ...state,
                [action.item]: action.payload
            };
        case 'setLoading':
            return {
                ...state,
                isLoading: {
                    ...state.isLoading,
                    [action.item]: action.payload
                }
            };
        default:
            return state;
    }
}

export const Address = createContext(initialState);

export const AddressProvider = ({ children }) => {

    const [address, dispatch] = useReducer(addressReducer, initialState);

    const setState = (type, item, payload) => {
        dispatch({
            type: type,
            item: item,
            payload: payload
        });
    }
    
    const fetchData = useCallback(async (item, fetch, ...values) => {
        setState('setLoading', item, true);
        const data = await fetch(values);
        setState('setAddressItem', item, data);
        setState('setLoading', item, false);
    }, [])

    useEffect(() => {
        (async () => {
            fetchData('provinces', fetchProvinces)
        })();
    }, [fetchData]);


    const getDistricts = async (province) => {
        fetchData('districts', fetchDistricts, province)
    }

    const getLocalities = async (province, district) => {
        fetchData('localities', fetchLocalities, province, district)
    }

    return (<Address.Provider value={{
        address,       
        getDistricts,
        getLocalities,
    }}>
        {children}
    </Address.Provider>);
}
