import React from 'react';
import Image from 'next/image'; 
import './style.scss';
import { ITimer } from '@/interfaces/models';

interface CardAdminProps {
  image: string | File; 
  title: string; 
  content: string; 
  timer: string; 
  schedule: string; 
}

export default function CardAdmin({ image, title, content, timer, schedule }: CardAdminProps) {
  if (!image) {
    return null; 
  }

  // Parse JSON string from timer
  let parsedTimer;
  try {
    parsedTimer = JSON.parse(timer); // Parse the JSON
  } catch (error) {
    console.error('Invalid JSON in timer:', error);
    parsedTimer = {}; // Fallback in case of error
  }

  const postStatus = schedule === 'NO' || schedule === 'POSTED' ? 'Đã đăng bài' : 'Chờ đăng bài';

  return (
    <div className="card-container">
      <Image 
        alt={title} 
        src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
        width={300} 
        height={200} 
        className="card-image" 
      />
      <div className="card-content">
        <h6 className="card-title">{title}</h6> 
        <p className="card-description" dangerouslySetInnerHTML={{ __html: content }}></p>
        
        <p className="card-timer">
          {/* Render the date and time from parsed JSON */}
          Thời gian hẹn: {parsedTimer.date ? parsedTimer.date : 'Không có ngày'} - {parsedTimer.time ? parsedTimer.time : 'Không có giờ'}
        </p>

        <p className="card-status">
          Trạng thái: {postStatus}
        </p>
      </div>
    </div>
  );
}
