import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Header from './Header';
import CurrentPlaying from './CurrentPaying'
import ArtistAlbums from './ArtistAlbums'

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      isFatching: false,
      nowPlaying: { name: 'Not Checked', artistId: '', artistName: '', albumName: '', albumId: '', albumArt: '', device: '' },
      currentAlbum: [],
      currentUser: {display_name: '', userId: '', userPhoto: '', }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  componentWillMount (){
    if (this.state.loggedIn === true) {
      this.setState({ isFatching: false })
    }
    else this.setState({ isFatching: true })

    spotifyApi.getMe()
    .then((data) => {
      console.log('getMe', data)
      this.setState({
        currentUser: {
          userId: data.id,
          userPhoto: data.images[0].url,
          display_name: data.display_name
        }
      })
    })

    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
            name: response.item.name, 
            device: response.device.name,
            artistId: response.item.artists[0].id,
            artistName: response.item.artists[0].name,
            albumId: response.item.album.id,
            albumArt: response.item.album.images[0].url,
            albumName: response.item.album.name
            }
        });
      })
  }

  getMyCurrentPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log('playing', response)
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              device: response.device.name,
              artistId: response.item.artists[0].id,
              artistName: response.item.artists[0].name,
              albumId: response.item.album.id,
              albumArt: response.item.album.images[0].url,
              albumName: response.item.album.name
            }
        });
      })
  }

  getArtistAlbums = () => {
    spotifyApi.getArtistAlbums(this.state.nowPlaying.artistId)
    .then((data) => {
      console.log('Artist albums', data);
        this.setState ({
          currentAlbum: data.items.map((repo) => {
              return {
                name: repo.name,
                art: repo.images[1].url        
              }
            })          
        })
          
    }, function(err) {
      console.error(err);
    });
  }
  

  render() {    
    return (
      <div className="App">  

        <Header 
          userPhoto={this.state.currentUser.userPhoto}
          display_name={this.state.currentUser.display_name}
          device={this.state.nowPlaying.device}
        />
        <hr/>
        <button onClick={this.getMyCurrentPlaying} style={{ marginBottom: 20 }}> Refresh </button>
        <CurrentPlaying          
          name={this.state.nowPlaying.name} 
          artistName={this.state.nowPlaying.artistName} 
          albumName={this.state.nowPlaying.albumName}
          albumArt={this.state.nowPlaying.albumArt}
        />
        <hr/>    
        <button className='btn-artist-albuns' onClick={this.getArtistAlbums}> Artist Albums </button>        
        <ArtistAlbums currentAlbum={this.state.currentAlbum}/>
      </div>
    );
  }
}

export default App;
