import React from 'react'
import { FaCloudSunRain } from "react-icons/fa"
import Search from './Search'

type Props = {
    darkTheme: boolean
}

export default function Header({ darkTheme }: Props) {
    return (
        <div className={`flex flex-wrap justify-center w-full pt-5 md:flex-row ${darkTheme ? 'text-neutral-900' : 'text-neutral-300'}`}>
            <div className={`flex flex-row justify-center text-center w-full md:w-1/2 ${!darkTheme ? 'text-neutral-900' : 'text-neutral-300'}`}>
                <FaCloudSunRain className='w-[68px] h-[68px] min-w-[50px] min-h-[50px]' />
                <p className='flex flex-col justify-center ml-8 font-bold text-5xl'>MeteoWeb</p>
            </div>
            <Search />
        </div>
    )
}