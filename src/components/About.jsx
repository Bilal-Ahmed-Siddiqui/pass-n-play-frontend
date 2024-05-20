import React from 'react'
import Navbar from "./Navbar";
import "../styles/about.css";


const About = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="box">
      <h1>About Pass n Play</h1>
      <p>
        Pass n Play is your ultimate destination for renting game DVDs. We
        provide a wide range of game titles for various gaming consoles,
        ensuring that you always have access to the latest and greatest games.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission at Pass n Play is to make gaming accessible and affordable
        for everyone. We believe that everyone should have the opportunity to
        experience the joy of gaming without breaking the bank.
      </p>
      <h2>How It Works</h2>
      <p>
        Renting games from Pass n Play is easy. Simply browse our collection of
        game titles, select the ones you want to rent, and choose your rental
        period. Once you've made your selection, we'll ship the game DVDs
        straight to your door. When you're done playing, just return the DVDs
        using the prepaid return label.
      </p>
      
    </div>
    </>
  )
}

export default About
