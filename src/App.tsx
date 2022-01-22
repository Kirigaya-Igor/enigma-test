import { useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import './App.css'
import { ApiProvider } from './components/API/API'
import { Map } from './components/Map/Map'

const API_KEY = process.env.REACT_APP_API_KEY

const App = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    //@ts-ignore
    googleMapsApiKey: API_KEY
  })

  return (
    <div>
      <ApiProvider>
        {isLoaded ? <Map /> : <h2>Loading...</h2>}
      </ApiProvider>
    </div>
  );
}

export default App;
