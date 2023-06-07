"use client";

import Confetti from 'react-confetti'

export default function Page() {

    const {innerWidth: width, innerHeight: height} = window;

    return (
        <>
            <h1 className={"text-green-500 text-9xl text-center m-auto"} >You Won</h1>
            <Confetti width={innerWidth} height={innerHeight}/>
        </>
    )
};