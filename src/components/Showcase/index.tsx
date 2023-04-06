import React from 'react'
import Left from './left'
import Right from './right'


const ShowcaseBanner = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <Left />
      <Right />
    </section>
  )
}

export default ShowcaseBanner