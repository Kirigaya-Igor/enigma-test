import React from "react";
import { CustomDropdown } from "../common/CustomDropdown";

const checkboxes = [{ name: 'Samohode', value: 'cars' }, { name: 'Parkingi', value: 'parkings' }, { name: 'POI', value: 'POI' }]
const carList = [{ name: 'Wszystkie', value: 'all' }, { name: 'Dostępne', value: 'available' }, { name: 'Niedostępne', value: 'notAvailable' }]
const battery = [{ name: 'Ladowanie baterii dowolne', value: '0' }, { name: 'Ladowanie baterii > 30%', value: '30' }, { name: 'Ladowanie baterii > 50%', value: '50' }, { name: 'Ladowanie baterii > 70%', value: '70' }, { name: 'Ladowanie baterii > 90%', value: '90' }]

type FiltersType = {
    checkedState: Array<boolean>
    setCheckedState: (state: Array<boolean>) => void
    radioState: string
    setRadioState: (state: string) => void
    batteryState: string
    setBatteryState: (state: string) => void
}

export const Filters: React.FC<FiltersType> = ({checkedState, setCheckedState, radioState, setRadioState, batteryState, setBatteryState}) => {

    const handleOnChange = (position: any): void => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
      }
    
      const isRadioSelected = (value: string): boolean => {
        if (radioState === value || batteryState === value) {
          return true
        }
        return false
      }
    
      const handleCarsClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setRadioState(e.target.value)
      }
    
      const handleBatteryClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setBatteryState(e.target.value)
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <h3 className='text-white navTitle'>Enigma test app</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <CustomDropdown title={'Wybór elementów'} data={checkboxes} type={'checkbox'} checkedState={checkedState} handleOnChange={handleOnChange}/>

                <CustomDropdown title={'Pokaż samochode'} data={carList} type={'radio'} isRadioSelected={isRadioSelected} handleOnChange={handleCarsClick}/>

                <CustomDropdown title={'Ladowanie baterii'} data={battery} type={'radio'} isRadioSelected={isRadioSelected} handleOnChange={handleBatteryClick}/>
              </ul>
            </div>
          </div>
        </nav>
    )
}