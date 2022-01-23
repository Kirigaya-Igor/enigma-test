import { useJsApiLoader } from '@react-google-maps/api'
import React, { useState } from 'react'
import './App.css'
import { ApiProvider } from './components/API/API'
import { Filters } from './components/Filters/Filters'
import { Loader } from './components/Loader/Loader'
import { Map } from './components/Map/Map'

const API_KEY = process.env.REACT_APP_API_KEY

const App: React.FC = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    //@ts-ignore
    googleMapsApiKey: API_KEY
  })

  const [checkedState, setCheckedState] = useState<Array<boolean>>([true, true, true]);
  const [radioState, setRadioState] = useState<string>('all');
  const [batteryState, setBatteryState] = useState<string>('0');

  return (
    <div>
      <ApiProvider>
        <Filters checkedState={checkedState} setCheckedState={setCheckedState} radioState={radioState} setRadioState={setRadioState} batteryState={batteryState} setBatteryState={setBatteryState} />
        {isLoaded ? <Map checkedState={checkedState} radioState={radioState} batteryState={batteryState} /> : <div className='loaderPanel'><Loader /></div>}
      </ApiProvider>
    </div>
  );
}

export default App;