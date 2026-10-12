import React from 'react'

export default function DashedCircle() {
    console.log("temp rendered")
    return (
        
        <div className="z-111">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="604" height="604" fill="none"><g filter="url(#circle-3_svg__a)" opacity="0.3"><circle cx="302" cy="302" r="299.5" stroke="url(#circle-3_svg__b)" strokeDasharray="4 6" stroke-linecap="round"></circle></g><defs><linearGradient id="circle-3_svg__b" x1="2" x2="602" y1="2" y2="602" gradientUnits="userSpaceOnUse"><stop offset="0.146" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.302" stop-color="#fff" stop-opacity="0.396"></stop><stop offset="0.427" stop-color="#fff"></stop><stop offset="0.568" stop-color="#fff" stop-opacity="0"></stop><stop offset="0.682" stop-color="#fff" stop-opacity="0.66"></stop><stop offset="0.807" stop-color="#fff" stop-opacity="0.29"></stop><stop offset="0.899" stop-color="#fff" stop-opacity="0.37"></stop></linearGradient><filter id="circle-3_svg__a" width="604" height="604" x="0" y="0" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_709_11732" stdDeviation="1"></feGaussianBlur></filter></defs></svg>
        </div>
    )
}
