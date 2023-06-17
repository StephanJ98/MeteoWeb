'use client'

import useData from '@/hooks/useData'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {}

const Search = ({ }: Props) => {
    const [location, setLocation] = useState('')
    const { setDescription, setDirection, setForce, setHumidite, setIcon, setNom, setPression, setSensation, setTemp, setTmax, setTmin } = useData()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (location || location !== '') {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
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
        }
    }

    return (
        <div className='flex flex-row justify-center text-center w-full md:mt-3 md:w-1/2'>
            <input
                type="text"
                placeholder='Location'
                className='flex flex-col justify-center text-center text-neutral-900 font-bold rounded-lg w-[95vw] mt-2 md:mt-0 md:w-4/5 h-[3rem] focus:outline-none focus-visible:outline-none outline-none shadow-lg'
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                onKeyDown={(e) => handleKeyDown(e)}
            />
        </div>
    )
}

export default Search