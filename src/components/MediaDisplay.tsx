import React from 'react';

interface MediaDisplayProps {
  type: 'image' | 'video' | 'audio';
  url: string;
  aspect: '16:9' | '1:1';
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({ type, url, aspect }) => {
  const aspectClass = aspect === '16:9' ? 'aspect-video' : 'aspect-square';
  if(!url || !type) return null;

  if (type === 'image') {
    return (
      <div className={`w-full max-w-3xl mx-auto ${aspectClass} mb-6`}>
        <img
          src={url}
          alt="Question media"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div className={`w-full max-w-3xl mx-auto ${aspectClass} mb-6`}>
        <video height="240" controls >
        <source src={url} type="video/mp4"/>
        </video>
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div className="flex mx-auto items-center justify-center mb-10">
        <audio controls>
          <source src={url} type="video/mp4"/>
        </audio>
      </div>
    );
  }

  return null;
};