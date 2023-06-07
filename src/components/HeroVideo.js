import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeroVideo() {
    const navigate = useNavigate();
    
    const onPress  = () => {
        navigate('/videopage');
    }
    return (
        <div>
            <div className="card card-side my-5 ">
                <figure className="card-body w-1/2"><img className='rounded-md' src={require("../img/Hero3-1920x1080.jpg")} alt="Movie" /></figure>
                <div className="card-body w-1/2">
                    <h2 className="card-title text-white">New movie is released!</h2>
                    <p className='text-white'>Click the button to watch on Jetflix app.</p>
                    <div className="card-actions justify-end">
                        <button onClick={onPress} className="btn btn-primary bg-thirdColor hover:bg-fourthColor hover:text-neutral-900 border-0">Watch</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroVideo
