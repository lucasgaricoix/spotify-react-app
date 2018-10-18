import React from 'react'

const CurrentPlaying = ({ name, artistName, albumName, albumArt }) => {
  return (    
    <div className='currPlaying'>
      <div> Album: <span className='currAlbum'>{albumName}</span></div>
      <div><span className='currentArtist'>{artistName}</span></div>        
      <img src={albumArt} style={{ height: 250, width: 250 }}/>     
      
      <div>Now Playing: </div> 
      <div className='nowPlaying'>{name}</div>
                 
  </div>
  
  )
}

export default CurrentPlaying