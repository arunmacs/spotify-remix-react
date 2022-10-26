import React, {Component} from 'react'
import moment from 'moment'
import NavBar from '../NavBar'
import Cards from '../Cards'
import LoaderView from '../LoaderView'

import './index.css'

class SpotifyClone extends Component {
  state = {
    editorsPickData: [],
    genresAndMoodsData: [],
    newReleasesData: [],
    isEditorPickSectionLoading: true,
    isGenreMoodSectionLoading: true,
    isNewReleaseSectionLoading: true,
  }

  componentDidMount() {
    this.getEditorsPickData()
    this.getGenreAndMoodsData()
    this.getNewReleasesData()
  }

  getAccessToken = () => {
    const token = localStorage.getItem('pa_token', '')
    return token
  }

  getTimeStamp = () => {
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    return timestamp
  }

  sessionTimedOut = () => {
    const {history} = this.props
    localStorage.removeItem('pa_token')
    history.replace('/login')
  }

  getEditorsPickData = async () => {
    const token = this.getAccessToken()

    const timeStamp = this.getTimeStamp()

    const userApiUrl = 'https://api.spotify.com/v1/me'
    const userOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userDataResponse = await fetch(userApiUrl, userOptions)
    const userData = await userDataResponse.json()
    const {country} = userData

    const editorsPickApiUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`
    const editorsPickOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(editorsPickApiUrl, editorsPickOptions)

    if (response.ok === true) {
      const data = await response.json()
      // console.log('getEditorsPickData', data)

      const updatedData = data.playlists.items.map(item => ({
        id: item.id || 'undefined',
        type: item.type || 'undefined',
        albumType: item.album_type || 'undefined',
        name: item.name || 'undefined',
        artists: item.artists || 'undefined',
        images: item.images || 'undefined',
        releaseDate: item.release_date || 'undefined',
        externalUrls: item.external_urls || 'undefined',
        totalTracks: item.total_tracks || 'undefined',
        uri: item.uri || 'undefined',
        slug: 'editor-pick',
      }))

      this.setState({
        editorsPickData: updatedData,
        isEditorPickSectionLoading: false,
      })
    } else {
      this.sessionTimedOut()
    }
  }

  getGenreAndMoodsData = async () => {
    const token = this.getAccessToken()

    const categoryApiUrl = 'https://api.spotify.com/v1/browse/categories'
    const categoryOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(categoryApiUrl, categoryOptions)

    if (response.ok === true) {
      const data = await response.json()
      // console.log('getGenreAndMoodsData', data)

      const updatedData = data.categories.items.map(item => ({
        id: item.id || 'undefined',
        type: 'category',
        albumType: item.album_type || 'undefined',
        name: item.name || 'undefined',
        artists: item.artists || 'undefined',
        images: item.icons || 'undefined',
        releaseDate: item.release_date || 'undefined',
        externalUrls: item.external_urls || 'undefined',
        totalTracks: item.total_tracks || 'undefined',
        uri: item.uri || 'undefined',
        slug: 'genre',
      }))

      this.setState({
        genresAndMoodsData: updatedData,
        isGenreMoodSectionLoading: false,
      })
    } else {
      this.sessionTimedOut()
    }
  }

  getNewReleasesData = async () => {
    const token = this.getAccessToken()

    const userApiUrl = 'https://api.spotify.com/v1/me'
    const userOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userDataResponse = await fetch(userApiUrl, userOptions)
    const userData = await userDataResponse.json()
    const {country} = userData

    const newReleasesApiUrl = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
    const newReleasesOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(newReleasesApiUrl, newReleasesOptions)
    if (response.ok === true) {
      const data = await response.json()
      // console.log('getNewReleasesData', data)

      const updatedData = data.albums.items.map(item => ({
        id: item.id || 'undefined',
        type: item.type || 'undefined',
        albumType: item.album_type || 'undefined',
        name: item.name || 'undefined',
        artists: item.artists || 'undefined',
        images: item.images || 'undefined',
        releaseDate: item.release_date || 'undefined',
        externalUrls: item.external_urls || 'undefined',
        totalTracks: item.total_tracks || 'undefined',
        uri: item.uri || 'undefined',
        slug: 'new-releases/album',
      }))

      this.setState({
        newReleasesData: updatedData,
        isNewReleaseSectionLoading: false,
      })
    } else {
      this.sessionTimedOut()
    }
  }

  renderCardsItems = (title, data) => (
    <div className="content-container">
      <h1 className="content-heading">{title}</h1>
      <div className="content">
        {data.map(item => (
          <Cards data={item} key={item.id} />
        ))}
      </div>
    </div>
  )

  renderHomeView = () => {
    const {
      isEditorPickSectionLoading,
      isGenreMoodSectionLoading,
      isNewReleaseSectionLoading,
      editorsPickData,
      genresAndMoodsData,
      newReleasesData,
    } = this.state

    console
      .log
      // 'editorsPickData > ',
      // editorsPickData,
      // 'genresAndMoodsData > ',
      // genresAndMoodsData,
      // 'newReleasesData > ',
      // newReleasesData,
      ()

    return (
      <>
        {isEditorPickSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems("Editor's picks", editorsPickData)
        )}
        {isGenreMoodSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems('Genres & Moods', genresAndMoodsData)
        )}
        {isNewReleaseSectionLoading ? (
          <LoaderView />
        ) : (
          this.renderCardsItems('New Releases', newReleasesData)
        )}
      </>
    )
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <div className="app-body">{this.renderHomeView()}</div>
      </div>
    )
  }
}

export default SpotifyClone
