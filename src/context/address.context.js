import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { fetchProvinces, fetchDistricts, fetchLocalities } from '../firebase/firebase.js';

const initialState = {
    provinces: [],
    districts: [],
    localities: []
};


const addressReducer = (state, action) => {
    switch (action.type) {
        case 'setAddressItem':
            return {
                ...state,
                [action.item]: action.payload
            };
        default:
            return state;
    }
}

export const Address = createContext(initialState);

export const AddressProvider = ({ children }) => {

    const [address, dispatch] = useReducer(addressReducer, initialState);

    const setAddressItem = (item, payload) => {
        const type = 'setAddressItem';
        dispatch({
            type: type,
            item: item,
            payload: payload
        });
    }

    const setProvinces = useCallback((provinces) => {
        setAddressItem('provinces', provinces);      
    }, []);

    useEffect(() => {
        (async () => {
            const provinces = await fetchProvinces();
            setProvinces(provinces)
        })();
    }, [setProvinces]);

    const getDistricts = async (province) => {
        const districts = await fetchDistricts(province);
        setAddressItem('districts', districts)        
    }

    const getLocalities = async (province, district) => {
        const localities = await fetchLocalities(province, district)
        setAddressItem('localities', localities)     
    }

    return (<Address.Provider value={{
        address,
        getDistricts,
        getLocalities,
    }}>
        {children}
    </Address.Provider>);
}
