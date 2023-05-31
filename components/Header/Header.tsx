import React from 'react'
import { FaCloudSunRain } from "react-icons/fa"

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
            <div className='flex flex-row justify-center text-center w-full md:mt-3 md:w-1/2'>
                <input type="text" className='flex flex-col justify-center text-center text-neutral-900 font-bold rounded-lg w-4/5 h-[3rem] focus:outline-none focus:ring' />
            </div>
        </div>
    )
}