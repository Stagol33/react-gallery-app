// src/components/Photo.jsx
import { useState } from 'react';
import Modal from './Modal';

function Photo({ photo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const formatNumber = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;
  };

  return (
    <>
      <li onClick={openModal}>
        <img src={photo.webformatURL} alt={photo.tags} />
      </li>
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="image-modal">
          <img src={photo.largeImageURL} alt={photo.tags} />
          
          <div className="image-info">
            <h3>Image Details</h3>
            
            <div className="image-stats">
              <div className="image-stat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{formatNumber(photo.likes)} likes</span>
              </div>
              
              <div className="image-stat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>{formatNumber(photo.views)} views</span>
              </div>
              
              <div className="image-stat">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm0 2v14h14V5H5zm2 2h10v10H7V7zm2 2v6h6V9H9z"/>
                </svg>
                <span>{photo.imageWidth} × {photo.imageHeight}</span>
              </div>
            </div>
            
            <div className="image-tags">
              {photo.tags.split(',').map((tag, index) => (
                <span key={index} className="image-tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
            
            <div className="user-info">
              <img 
                src={`https://randomuser.me/api/portraits/men/${photo.id % 100}.jpg`} 
                alt={photo.user}
                className="user-avatar"
              />
              <div>
                <div className="user-name">{photo.user}</div>
                <a 
                  href={`https://pixabay.com/users/${photo.user}-${photo.user_id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="user-profile-link"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Photo;
