import React from "react";

const checkboxes = [{ name: 'Samohode', value: 'cars' }, { name: 'Parkingi', value: 'parkings' }, { name: 'POI', value: 'POI' }]
const radio = [{ name: 'Wszystkie', value: 'all' }, { name: 'Dostępne', value: 'available' }, { name: 'Niedostępne', value: 'notAvailable' }]
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
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenu1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Wybór elementów
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenu1">
                    {checkboxes.map((item, index) => (
                      <li key={item.value + index}>
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={`custom-checkbox-${index}`}
                          value={item.value}
                          checked={checkedState[index]}
                          onChange={() => handleOnChange(index)}
                        />
                        <label className="btn btn-outline-light btn-sm customCheckbox" htmlFor={`custom-checkbox-${index}`}>{item.name}</label>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenu2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pokaż samochode
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenu2">
                    {radio.map((item, index) => (
                      <li key={item.value + index}>
                        <input
                          type="radio"
                          className="btn-check"
                          id={`custom-radio-${index}`}
                          value={item.value}
                          checked={isRadioSelected(item.value)}
                          onChange={handleCarsClick}
                        />
                        <label className="btn btn-outline-light btn-sm customCheckbox" htmlFor={`custom-radio-${index}`}>{item.name}</label>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDarkDropdownMenu3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Ladowanie baterii
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenu3">
                    {battery.map((item, index) => (
                      <li key={item.value + index}>
                        <input
                          type="radio"
                          className="btn-check"
                          id={`custom-battery-${index}`}
                          value={item.value}
                          checked={isRadioSelected(item.value)}
                          onChange={handleBatteryClick}
                        />
                        <label className="btn btn-outline-light btn-sm customCheckbox" htmlFor={`custom-battery-${index}`}>{item.name}</label>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}