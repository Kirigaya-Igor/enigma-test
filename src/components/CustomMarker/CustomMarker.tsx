import { InfoWindow, Marker } from '@react-google-maps/api'
import React from 'react'

type CustomMarkerType = {
    position: any
    icon: string
    size1?: number
    size2?: number
    clusterer?: any
    id: string
    openId: string 
    setOpenId: (id: string) => void
}

export const CustomMarker: React.FC<CustomMarkerType> = ({ children, position, icon, size1 = 40, size2 = 40, clusterer, id, openId, setOpenId }) => {

    const handleToggleOpen = (id: string): void => {
        if (openId === id) {
            setOpenId('')
        } else {
            setOpenId(id)
        }
    }

    const handleToggleClose = (): void => {
        setOpenId('')
    }

    return (
        <Marker
            position={position}
            icon={{ url: icon, scaledSize: new google.maps.Size(size1, size2) }}
            clusterer={clusterer}
            onClick={() => handleToggleOpen(id)}
        >
            {openId === id && <InfoWindow onCloseClick={handleToggleClose}>
                {children}
            </InfoWindow>}
        </Marker>


    )
}