'use client';
import React from 'react';
import { Modal, message } from 'antd';
import styled from 'styled-components'; // Thêm import styled-components
import { softRemoveFeedback } from '@/apis/feedback/feedback.apis';
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

interface DeleteDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  feedbackId: string | null;
}

const DeleteDashboardItem: React.FC<DeleteDashboardItemProps> = ({
  isVisible,
  onClose,
  onConfirm,
  feedbackId,
}) => {
  const handleConfirm = async () => {
    if (feedbackId) {
      try {
        await softRemoveFeedback(feedbackId);
        message.success("Phản hồi đã được xóa mềm.");
        onConfirm();
      } catch {
        message.error('Có lỗi xảy ra khi xóa phản hồi.');
      }
    }
  };

  return (
    <Modal
      // title="Xóa Phản Hồi"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className='modal-header'>Xóa phản hồi</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa phản hồi này không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-sure" onClick={handleConfirm}>
            Có, xóa
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
};

export default DeleteDashboardItem;
