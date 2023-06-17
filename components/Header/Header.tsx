import React from 'react'
import { FaCloudSunRain } from "react-icons/fa"
import Search from './Search'

type Props = {
    darkTheme: boolean
}

export default function Header({ darkTheme }: Props) {
    return (
        <div className={`flex flex-wrap justify-center w-full md:w-auto md:mx-8 pt-5 md:flex-row ${darkTheme ? 'text-neutral-900' : 'text-neutral-300'} bg-neutral-100 pb-12 rounded-b-2xl`}>
            <div className={`flex flex-row justify-center text-center w-full md:w-1/2 ${!darkTheme ? 'text-neutral-900' : 'text-neutral-300'}`}>
                <FaCloudSunRain className='w-[68px] h-[68px] min-w-[50px] min-h-[50px] text-neutral-700' />
                <p className='flex flex-col justify-center ml-8 font-bold text-5xl text-neutral-700'>MeteoWeb</p>
            </div>
            <Search />
        </div>
    )
}