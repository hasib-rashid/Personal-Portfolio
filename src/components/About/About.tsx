import React from 'react'
import StatsRing from './StatsRing'


const About = () => {
    return (
        <div className="about">
            <h1><span className='crimson'>A</span>bout <span className="crimson">M</span>e</h1>
            <br />
            <div style={{ display: "flex" }}>
                <p>I am Hasib Al Rashid. I am a full stack developer, student and a hobbyist with extensive knowledge about web development and infrastructure. Currently being only 16 years old, I study at Mirzapur Cadet College, Bangladesh for aquiring my middle school studies. I currently know the most of Web Development including FrontEnd and BackEnd. The Languages and Technologies that I mainly work with <span style={{ color: "#F0DB4F" }}>Javascript</span>, <span style={{ color: "#3178C6" }}>Typescript</span>, <span style={{ color: "#00D8FF" }}>ReactJS</span>, <span style={{ color: "#07AC4F" }}>MongoDB</span>, <span style={{ color: "#FFCA28" }}>Firebase</span>, <span style={{ color: "#3ECF8E" }}>Supabase</span>, <span style={{ color: "gray" }}>NextJS</span>, <span style={{ color: "crimson" }}>RestAPI</span> and most importantly <span style={{ color: "#264DE4" }}>CSS</span> for designing.</p>
                <StatsRing />
            </div>
        </div>
    )
}

export default About