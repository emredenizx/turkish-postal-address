import { AddressProvider } from "./context/address.context";
import AddressForm from "./components/address";
import './App.scss';

function App() {
  return (
    <div className='main'>
      <AddressProvider>
        <AddressForm />
      </AddressProvider>
    </div>
  );
}

export default App;
