import React, { useState } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import './App.css';
import './File.css'

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [colors, setColors] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <div className="app-container">
      <Toaster position='bottom-left' toastOptions={{ duration: 1000 }} />
      <h1>Image Color Extractor 🎨</h1>
      <label className="custum-file-upload" htmlFor="file">
        <div className="icon">
          <i className="bi bi-cloud-upload-fill"></i>
        </div>
        <div className="text">
          <span>Click to upload image</span>
        </div>
        <input type="file" id="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      <h3>Or</h3>
      <input
        className='url-input'
        type="text"
        placeholder="Enter Image URL 🔗"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
          <div className="msg">
            <div className="msg__title">
              <i className="bi bi-info-circle-fill"></i>
              &nbsp;&nbsp;&nbsp;
              Click on the color to copy.
            </div>
          </div>
          <ColorExtractor src={imageUrl} getColors={(colors) => setColors(colors)} />
        </div>
      )}

      <div className="color-blocks">
        {colors.map((color, index) => (
          <CopyToClipboard key={index} text={color}>
            <div className="color-block" onClick={() => toast.success(`Color copied to clipboard 👍`)}>
              <div className='single-color-box'
                style={{
                  backgroundColor: color,
                  cursor: 'pointer',
                }}
              ></div>
              <span
                className='color-name'
                style={{
                  color: color
                }}
              >
                {color}
              </span>
            </div>
          </CopyToClipboard>
        ))}
      </div>

    </div>
  );
};

export default App;
