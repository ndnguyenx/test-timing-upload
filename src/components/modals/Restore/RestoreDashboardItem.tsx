'use client';
import React from 'react';
import { Modal, Button, message } from 'antd';
import { restoreFeedback } from '@/apis/feedback/feedback.apis';
import './style.scss';

interface RestoreDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;
  onRestoreComplete: () => void;
}

const RestoreDashboardItem: React.FC<RestoreDashboardItemProps> = ({
  isVisible,
  onClose,
  feedbackId,
  onRestoreComplete,
}) => {
  const handleRestore = async () => {
    if (feedbackId) {
      try {
        await restoreFeedback(feedbackId); // Gọi API để khôi phục phản hồi
        message.success("Danh mục con đã được khôi phục.");
        onRestoreComplete(); // Cập nhật danh sách sau khi khôi phục
        onClose();
      } catch (error) {
        console.error('Error restoring feedback:', error);
      }
    }
  };

  return (
    <Modal
      // title="Khôi Phục Phản Hồi"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <div key="footer-container" style={{ padding: '1rem' }}>
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button key="restore" type="primary" onClick={handleRestore}>
            Khôi Phục
          </Button>,
        </div>
      ]}
    >
      <div className='modal-header'>Khôi Phục Phản Hồi</div>
      <p style={{ padding: '1rem 1rem 0 1rem' }}>Bạn có chắc chắn muốn khôi phục phản hồi này không?</p>
    </Modal>
  );
};

export default RestoreDashboardItem;
