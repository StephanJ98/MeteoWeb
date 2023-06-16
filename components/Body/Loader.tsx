import React from 'react'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className="flex items-center justify-center w-[250px] h-[250px] my-[100px] mx-auto p-[15px]">
            <div className="w-[250px] pt-[45px] ml-[-150px] inline absolute z-[11] animate-clouds"> 
                <span className="w-[65px] h-[65px] rounded-t-[50%] rounded-bl-[50%] bg-[#4c9beb] inline-block z-[5]"></span>
                <span className="w-[45px] h-[45px] rounded-t-[50%] rounded-br-[50%] bg-[#4c9beb] inline-block ml-[-25px] z-[5]"></span>
            </div>
            <span className="w-[120px] h-[120px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-[60px] inline absolute animate-sunshines"></span>
            <span className="w-[120px] h-[120px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-[60px] inline absolute"></span>
            <div className="w-[250px] mt-[-30px] ml-[150px] z-[12] animate-clouds2">
                <span className="w-[30px] h-[30px] rounded-t-[50%] rounded-bl-[50%] bg-[#4c9beb] inline-block z-[5]"></span>
                <span className="w-[50px] h-[50px] rounded-t-[50%] rounded-br-[50%] bg-[#4c9beb] inline-block ml-[-20px] z-[5]"></span>
            </div>
        </div>
    )
}

export default Loader