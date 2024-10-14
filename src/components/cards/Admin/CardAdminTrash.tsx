import React from 'react';
import { IFeedBack } from '@/interfaces/models';
import { Button } from 'antd';
import Image from 'next/image'; 
import './style.scss';

interface CardAdminTrashProps {
  image: IFeedBack;
  onRestore: (id: string) => void;
  onHardDelete: (id: string) => void; 
  subCategoryName: string; 
}

export default function CardAdminTrash({ image, onRestore, onHardDelete, subCategoryName }: CardAdminTrashProps) {
  return (
    <div className="card-container">
      <Image 
        alt={image?.nameFeedback} 
        src={image?.url} 
        width={300}  
        height={200} 
        className="card-image" 
      />
      <div className="card-content">
        <h6 className="card-title">{image?.nameFeedback}</h6>
        <p className="card-description">{image?.description}</p>
        
        {/* Hiển thị subCategoryName */}
        <p className="card-subcategory">
          Danh mục con: {subCategoryName}
        </p>

        <div className="card-actions" style={{ display: 'flex' }}>
          <Button 
            type="primary" 
            onClick={() => onRestore(image._id)} 
            className="action-button restore-button"
          >
            Khôi Phục
          </Button>
          <Button 
            type="default" 
            onClick={() => onHardDelete(image._id)} 
            className="action-button delete-button"
          >
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}
