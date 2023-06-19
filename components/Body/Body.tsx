'use client'

import useData from '@/hooks/useData'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from './Card'
import Loader from './Loader'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr:false })

type Props = {
    darkTheme?: boolean
}

export default function Body({ }: Props) {
    const { nom, temp, tmax, tmin, sensation, force, direction, humidite, pression, latitude, longitude, description, icon, setLatitude, setLongitude, setDirection, setForce, setHumidite, setNom, setPression, setSensation, setTemp, setTmax, setTmin, setDescription, setIcon } = useData()
    const [loading, setLoading] = useState(true)
    const [first, setFirst] = useState(true)

    const getData = useCallback(() => {
        if (!temp) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then(response => {
                    const data = response.data
                    setNom(data?.name)
                    setTemp(data?.main.temp)
                    setTmax(data?.main.temp_max)
                    setTmin(data?.main.temp_min)
                    setSensation(data?.main.feels_like)
                    setHumidite(data?.main.humidity)
                    setPression(data?.main.pressure)
                    setForce(data?.wind.speed)
                    setDirection(data?.wind.deg)
                    setDescription(data?.weather[0].description)
                    setIcon(data?.weather[0].icon)

                    setLoading(false)
                })
                .catch(() => {
                    toast.error('Something went wrong! \n\nTry another location.', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        }
                    })
                })
        }
    }, [latitude, longitude, setDescription, setDirection, setForce, setHumidite, setIcon, setNom, setPression, setSensation, setTemp, setTmax, setTmin, temp])

    useEffect(() => {
        if (!navigator.geolocation) toast.error('The location is needed to get the weather information')

        if (first) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                setLatitude(pos.coords.latitude)
                setLongitude(pos.coords.longitude)
            })
            if (latitude !== 0 && longitude !== 0) {
                getData()
                setFirst(false)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latitude, longitude])

    return (
        <div className='flex flex-row justify-center text-center h-full w-full md:min-h-[70vh] mt-4'>

            {loading ?
                <Loader />
                :
                <div className='flex flex-col justify-center text-center gap-2 md:gap-4 md:w-full md:mx-8'>
                    <div className='bg-white w-[95vw] md:w-full py-3 rounded-md md:py-5'>
                        <p className='font-bold text-2xl text-neutral-700'>
                            {nom} - {description}
                        </p>
                    </div>

                    <div className='flex flex-col md:flex-row gap-2'>
                        <div className='flex flex-row md:min-w-[300px] justify-center text-center bg-white rounded-md'>
                            <div className='flex flex-col justify-center'>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                    alt={'Wather Icon'}
                                    width={100}
                                    height={100}
                                    className='aspect-square w-[100px] h-[100px]'
                                />
                            </div>
                        </div>
                        <div className='flex flex-auto flex-col md:flex-row w-full justify-center text-center gap-2 text-neutral-700'>
                            <Card title={'Temperature'} value={`${temp}ºC`} />
                            <div className='flex flex-col flex-1 justify-between gap-2'>
                                <Card title={'Max Temperature'} value={`${tmax}ºC`} />
                                <Card title={'Min Temperature'} value={`${tmin}ºC`} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col md:flex-row flex-1 justify-center text-center gap-2 text-neutral-700'>
                            <Card title={'Thermic Feel'} value={`${sensation}ºC`} />
                            <Card title={'Humidity'} value={`${humidite}%`} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col md:flex-row flex-1 justify-center text-center gap-2 text-neutral-700'>
                            <Card title={'Wind Direction'} value={`${direction} º`} />
                            <Card title={'Wind Force'} value={`${force} m/s - ${(force * 3.6).toFixed(1)} Km/h`} />
                            <Card title={'Pressure'} value={`${pression} Pa`} />
                        </div>
                    </div>

                    <Map lat={latitude} lon={longitude} />
                </div>
            }
        </div>
    )
}