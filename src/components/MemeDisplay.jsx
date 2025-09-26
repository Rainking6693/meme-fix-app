function MemeDisplay({ caption, imageUrl }) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'meme.jpg'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="meme-display">
      <div className="meme-caption">
        {caption}
      </div>
      <img 
        src={imageUrl} 
        alt="Generated meme" 
        className="meme-image"
      />
      <button onClick={handleDownload} className="download-button">
        Download Meme
      </button>
    </div>
  )
}

export default MemeDisplay