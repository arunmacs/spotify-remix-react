import './index.css'

const noAlbumImg =
  'https://images-platform.99static.com/FCY98Yn5UDRBmQcpm4Sve3b1EP8=/0x0:1875x1875/500x500/top/smart/99designs-contests-attachments/83/83315/attachment_83315236'

const AlbumDisplayInfo = props => {
  const {displayInfo} = props
  const {images, name} = displayInfo
  //   console.log(displayInfo, 'albumInfo')

  let image
  let albumName

  if (images !== undefined) {
    image = images.reduce((prev, curr) =>
      prev.height > curr.height ? prev : curr,
    )
    image = image.url
  } else {
    image = noAlbumImg
  }

  if (name === undefined || null) {
    albumName = 'Album'
  }

  return (
    <div className="album-display-info">
      <img src={image} alt="" className="album-display-image" />
      <h1 className="album-display-name">{albumName}</h1>
    </div>
  )
}

export default AlbumDisplayInfo
