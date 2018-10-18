import React from 'react'

const ArtistAlbums = ({ currentAlbum }) => {
    return (
        <div >                       
            <div className='artistAlbums'>
                {currentAlbum.map((r) => {
                    return (
                        <div className='albumName'> <img className='artistArt' src={r.art} /> {r.name}</div>
                    )
                })}
          </div>          
        </div>
    )
}

export default ArtistAlbums