import React from 'react'
import heroPic from '../pictures/heroPic.svg'
import Image from "next/image";

const Hero = () => {
  return (
    <section className='hero-section'>
      <Image src={heroPic} alt="Temples image"/>
      <div className='hero-text'>
        <p>Regex web Crawler</p>
        <p>for <span>Temple's names</span></p>
      </div>
    </section>
  )
}

export default Hero