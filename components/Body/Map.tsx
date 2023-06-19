'use client'

import React, { useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

type Props = {
    lat: number
    lon: number
}

enum VIEWS {
    PRECI = 'precipitation_new',
    TEMP = 'temp_new',
    WIND = 'wind_new'
}

function SetViewOnClick({ coords }: { coords: [number, number] }) {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
}

export default function Map({ lat, lon }: Props) {
    const [view, setView] = useState(VIEWS.PRECI)
    let zoom = lat ? 8 : 4

    return (
        <MapContainer
            center={[lat, lon]}
            zoom={zoom}
            scrollWheelZoom={true}
            className='h-[40vh] rounded-lg mb-4 relative'>
            <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            />
            <TileLayer
                url={`https://tile.openweathermap.org/map/${view}/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_API_KEY}`}
            />
            {lat && (
                <Marker position={[lat, lon] as L.LatLngExpression} />
            )}

            <div className='absolute top-3 left-12 z-[1000] flex flex-row gap-1'>
                <p className='bg-neutral-800 text-zinc-200 p-2 rounded-md' onClick={() => setView(VIEWS.PRECI)}>Precipitations</p>
                <p className='bg-neutral-800 text-zinc-200 p-2 rounded-md' onClick={() => setView(VIEWS.TEMP)}>Temperature</p>
                <p className='bg-neutral-800 text-zinc-200 p-2 rounded-md' onClick={() => setView(VIEWS.WIND)}>Wind</p>
            </div>
            <SetViewOnClick coords={[lat, lon]} />
        </MapContainer>
    )
}