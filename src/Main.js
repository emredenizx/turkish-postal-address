import React from 'react';

import { AddressProvider } from "./context/address.context";
import AddressForm from "./components/address";

const Main = () => {
    return (
        <div className='main'>
            <AddressProvider>
                <AddressForm />
            </AddressProvider>
        </div>
    );
}

export default Main;

