'use client';
import React from 'react';
import { Modal, message } from 'antd';
import styled from 'styled-components';
import { deleteFeedback } from '@/apis/feedback/feedback.apis';
import './style.scss';

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;
    margin: 1rem auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
    gap: 1rem;

    .btn-cancel {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: #858796;
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }

    .btn-sure {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: var(--color-primary);
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

interface HardDeleteDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;
  onHardDeleteComplete: () => void;
}

const HardDeleteDashboardItem: React.FC<HardDeleteDashboardItemProps> = ({
  isVisible,
  onClose,
  feedbackId,
  onHardDeleteComplete,
}) => {
  const handleHardDelete = async () => {
    if (feedbackId) {
      try {
        await deleteFeedback(feedbackId);
        message.success("Phản hồi đã được xóa vĩnh viễn.");
        onHardDeleteComplete();
        onClose();
      } catch (error) {
        console.error('Error hard deleting feedback:', error);
      }
    }
  };

  return (
    <Modal
      // title="Xóa Vĩnh Viễn Phản Hồi"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className='modal-header'>Xóa Vĩnh Viễn Phản Hồi</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa vĩnh viễn phản hồi này không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-sure" onClick={handleHardDelete}>
            Xóa Vĩnh Viễn
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
};

export default HardDeleteDashboardItem;
