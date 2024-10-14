'use client';

import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { DeleteCategory } from "@/apis/category/category.apis"; // Nhập API
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

interface HardDeleteCategoryProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryId: string;
}

export default function HardDeleteCategory({
  isVisible,
  onClose,
  onConfirm,
  categoryId,
}: HardDeleteCategoryProps) {
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = async () => {
    try {
      await DeleteCategory(categoryId); // Sử dụng API để xóa vĩnh viễn
      onConfirm();
    } catch {
      message.error('Có lỗi xảy ra khi xóa danh mục.');
    }
  };

  return (
    <Modal
      // title="Xóa Danh Mục Vĩnh Viễn"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-header">Xóa Danh mục Vĩnh Viễn</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa vĩnh viễn danh mục này không?</p>
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
