'use client'

import useData from '@/hooks/useData'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from './Card'
import Loader from './Loader'

type Props = {
    darkTheme?: boolean
}

export default function Body({ }: Props) {
    const { nom, temp, tmax, tmin, sensation, force, direction, humidite, pression, latitude, longitude, description, icon, setLatitude, setLongitude, setDirection, setForce, setHumidite, setNom, setPression, setSensation, setTemp, setTmax, setTmin, setDescription, setIcon } = useData()
    const [loading, setLoading] = useState(true)

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
        }
    }, [latitude, longitude, temp, setDescription, setDirection, setForce, setHumidite, setIcon, setNom, setPression, setSensation, setTemp, setTmax, setTmin])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                setLatitude(pos.coords.latitude)
                setLongitude(pos.coords.longitude)
            })
            getData()
        } else {
            toast.error('The location is needed to get the weather information')
        }
    }, [getData, latitude, longitude, setLatitude, setLongitude, temp])

    return (
        <div className='flex flex-row justify-center text-center h-full md:min-h-[70vh] mt-4'>

            {loading ?
                <Loader />
                :
                <div className='flex flex-col justify-center text-center gap-4 md:w-11/12'>
                    <div className='bg-white w-[95vw] sm:w-full py-3 rounded-md md:py-10'>
                        <p className='font-bold text-2xl text-neutral-700'>
                            {nom} - {description}
                        </p>
                    </div>

                    <div className='flex flex-col md:flex-row gap-2'>
                        <div className='flex flex-row md:min-w-[300px] justify-center text-center bg-white rounded-md'>
                            <Image
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={'Wather Icon'}
                                width={100}
                                height={100}
                            />
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

                    <div className='flex flex-col gap-2 pb-8'>
                        <div className='flex flex-col md:flex-row flex-1 justify-center text-center gap-2 text-neutral-700'>
                            <Card title={'Wind Direction'} value={`${direction}ºC`} />
                            <Card title={'Wind Force'} value={`${force} m/s - ${force * 3.6} Km/h`} />
                            <Card title={'Pressure'} value={`${pression} Pa`} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}