import React, { createContext, useState, useEffect, FC } from 'react';
import axios from 'axios'

// @ts-ignore
export const ApiContext = createContext();

type address = {
    street: string | null 
    house: string | null
    city: string | null
}

type color = { 
    rgb: string | null 
    alpha: number | null 
}

type location = { 
    latitude: number
    longitude: number
}

export type CarType = {
    address: address | null
    batteryLevelPct: number | null
    color: string | null
    description: any
    discriminator: string | null
    id: string
    location: location
    locationDescription: any
    mapColor: color | null
    metadata: any
    name: string | null
    picture: { id: string | null, name: string | null, extension: any, contentType: any }
    platesNumber: string | null
    promotion: any
    rangeKm: number | null
    reservation: any
    reservationEnd: any
    sideNumber: string | null
    status: string | null
    type: string | null
}

export type ParkingType = {
    address: address | null
    availableSpacesCount: number | null
    chargers: Array<any>
    color: color | null
    description: string | null
    discriminator: string | null
    id: string
    location: location
    metadata: any
    name: string | null
    pictureId: any
    spacesCount: number | null
}

export type PoiType = {
    address: address | null
    category: string | null
    color: color | null
    description: string | null
    discriminator: string | null
    id: string
    location: location
    metadata: Object
    name: string | null
    picture: any
}

export const ApiProvider: FC = ({ children }) => {

    const [cars, setCars] = useState<Array<CarType>>([])
    const [parkings, setParkings] = useState<Array<ParkingType>>([])
    const [poi, setPoi] = useState<Array<PoiType>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getData = async () => {
        const res1 = await axios.get('https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE')
        const res2 = await axios.get('https://dev.vozilla.pl/api-client-portal/map?objectType=PARKING')
        const res3 = await axios.get('https://dev.vozilla.pl/api-client-portal/map?objectType=POI')

        setCars(res1.data.objects)
        setParkings(res2.data.objects)
        setPoi(res3.data.objects)
        setIsLoading(false)
        console.log(res1.data.objects)
        console.log(res2.data.objects)
        console.log(res3.data.objects)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <ApiContext.Provider value={{ cars, parkings, poi, isLoading }}>
            {children}
        </ApiContext.Provider>
    )
}