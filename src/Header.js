import React from 'react';
import logo from './Spotify_Icon_RGB_Black.png'

const Header = ({userPhoto, display_name, device}) => {
    return (
        <header> 
            <form className='frm-login'>
                <a className='login' href='http://localhost:8888' > Login to Spotify </a>
            </form> 
            <span
                className='title'>Spotify APP
                <img className='logo' src={logo} />
            </span>
            <div className='userData'>
                <div><img className='userPhoto' src={userPhoto} /></div>
                <div className='displayName'>{display_name} </div>
                <div>Device: { device }</div>      
            </div>    

            
        </header>
        
        
    )    
}

export default Header