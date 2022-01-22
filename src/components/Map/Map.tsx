import { GoogleMap, MarkerClusterer } from '@react-google-maps/api'
import React, { useContext, useRef, useState } from 'react'
import { ApiContext, CarType, ParkingType, PoiType } from '../API/API'
import { CustomMarker } from '../CustomMarker/CustomMarker'
import greenCar from '../images/greenCar.png'
import parkingIcon from '../images/parkingIcon.png'
import poiIcon from '../images/poiIcon.png'
import redCar from '../images/redCar.png'
import { Loader } from '../Loader/Loader'
import './map.scss'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const center = {
    lat: 51.110333,
    lng: 17.027323
}

export const Map: React.FC = () => {

    const mapRef = useRef(undefined)
    //@ts-ignore
    const { cars, parkings, poi, isLoading } = useContext(ApiContext);

    const [openId, setOpenId] = useState<string>('')

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current = map
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    return (
        <div className='container'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {isLoading ? <div className='filterPanel'><Loader/></div> : 
                <div>
                    <MarkerClusterer gridSize={40}>
                        {(clusterer) =>
                            cars.map((car: CarType) => (
                                <CustomMarker key={car.id + car.location.latitude} position={{ lat: car.location.latitude, lng: car.location.longitude }}
                                    icon={`${car.status === 'AVAILABLE' ? greenCar : redCar}`} size1={50} size2={60} clusterer={clusterer} id={car.id} openId={openId} setOpenId={setOpenId} >
                                    <div className='popup'>
                                        {car.address && <div className='popupItem' >
                                            Adres: {`${car.address.city ? car.address.city : ''} ${car.address.street ? `, ${car.address.street}` : ''} ${car.address.house ? `/ ${car.address.house}` : ''} `}
                                        </div>}
                                        {car.batteryLevelPct && <div className='popupItem'>Bateria (%): {car.batteryLevelPct}</div>}
                                        {car.color && <div className='popupItem' >Kolor: {car.color}</div>}
                                        {car.description && <div className='popupItem' >Opis: {car.description}</div>}
                                        {car.name && <div className='popupItem' >Nazwa: {car.name}</div>}
                                        {car.platesNumber && <div className='popupItem' >Znaki rejstracyjne: {car.platesNumber}</div>}
                                        {car.sideNumber && <div className='popupItem' >Numer boczny: {car.sideNumber}</div>}
                                        {car.status && <div className='popupItem' >Status: {`${car.status === 'AVAILABLE' ? 'Dostępna' : 'Niedostępna'}`}</div>}
                                    </div>
                                </CustomMarker>
                            ))
                        }
                    </MarkerClusterer>

                    <MarkerClusterer gridSize={40}>
                        {(clusterer) =>
                            parkings.map((parking: ParkingType) => (
                                <CustomMarker key={parking.id + parking.location.latitude} position={{ lat: parking.location.latitude, lng: parking.location.longitude }}
                                    icon={parkingIcon} size1={40} size2={40} clusterer={clusterer} id={parking.id} openId={openId} setOpenId={setOpenId}>
                                    <div className='popup'>
                                        {parking.address && <div className='popupItem' >
                                            Adres: {`${parking.address.city ? parking.address.city : ''} ${parking.address.street ? `, ${parking.address.street}` : ''} ${parking.address.house ? `/ ${parking.address.house}` : ''} `}
                                        </div>}
                                        {parking.spacesCount && <div className='popupItem' >Ilość miejsc: {parking.spacesCount}</div>}
                                        {parking.availableSpacesCount && <div className='popupItem' >Wolne miejsca: {parking.availableSpacesCount}</div>}
                                        {parking.name && <div className='popupItem' >Nazwa: {parking.name}</div>}
                                        {parking.description && <div className='popupItem' >Opis: {parking.description}</div>}

                                    </div>
                                </CustomMarker>
                            ))
                        }
                    </MarkerClusterer>

                    <MarkerClusterer gridSize={40}>
                        {(clusterer) =>
                            poi.map((item: PoiType) => (
                                <CustomMarker key={item.id + item.location.latitude} position={{ lat: item.location.latitude, lng: item.location.longitude }}
                                    icon={poiIcon} size1={50} size2={50} clusterer={clusterer} id={item.id} openId={openId} setOpenId={setOpenId}>
                                    <div className='popup'>
                                        {item.address && <div className='popupItem' >
                                            Adres: {`${item.address.city ? item.address.city : ''} ${item.address.street ? `, ${item.address.street}` : ''} ${item.address.house ? `/ ${item.address.house}` : ''} `}
                                        </div>}
                                        {item.category && <div className='popupItem' >Kategoria: {item.category}</div>}
                                        {item.name && <div className='popupItem' >Nazwa: {item.name}</div>}
                                        {item.description && <div className='popupItem' >Opis: {item.description}</div>}
                                    </div>
                                </CustomMarker>
                            ))
                        }
                    </MarkerClusterer>
                </div>}
            </GoogleMap>
        </div>
    )
}
