import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import YourPlayLists from './components/YourPlayLists'
import YourMusic from './components/YourMusic'
import Profile from './components/Profile'
import Playlist from './components/Playlist'
import PlayListAlbum from './components/PlayListAlbum'
import GenreCategory from './components/GenreCategory'
import Search from './components/Search'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/your-music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={YourPlayLists} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/editor-pick/:id" component={Playlist} />
      <ProtectedRoute
        exact
        path="/new-releases/album/:id"
        component={Playlist}
      />
      <ProtectedRoute
        exact
        path="/your-playlists/:id"
        component={PlayListAlbum}
      />
      <ProtectedRoute
        exact
        path="/genre/:categoryId"
        component={GenreCategory}
      />
      <ProtectedRoute
        exact
        path="/genre/:categoryId/:id/playlist"
        component={Playlist}
      />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/search/playlist/:id" />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
