'use client';
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { DeleteSubCategory } from "@/apis/subCategory/subCategory.apis";
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

interface HardDeleteCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subCategoryId: string | null;
}

export default function HardDeleteCategoryChild({
  isVisible,
  onClose,
  onConfirm,
  subCategoryId,
}: HardDeleteCategoryChildProps) {
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = async () => {
    if (subCategoryId) {
      try {
        await DeleteSubCategory(subCategoryId);
        message.success("Danh mục con đã được xóa vĩnh viễn.");
        onConfirm();
      } catch {
        message.error('Có lỗi xảy ra khi xóa danh mục con.');
      }
    }
  };

  return (
    <Modal
      // title="Xóa Vĩnh Viễn Danh Mục Con"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-header">Xóa Vĩnh Viễn Danh Mục Con</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa vĩnh viễn danh mục con này không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-sure" onClick={handleConfirm}>
            Có, chắc chắn
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Hủy bỏ
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
