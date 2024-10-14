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

interface HardDeleteMultiChildProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subCategoryIds: string[];
}

export default function HardDeleteMultiChild({
  isVisible,
  onClose,
  onConfirm,
  subCategoryIds,
}: HardDeleteMultiChildProps) {
  const handleConfirm = async () => {
    try {
      await Promise.all(subCategoryIds.map(id => DeleteSubCategory(id))); // Gọi API để xóa danh mục con
      message.success("Các danh mục con đã được xóa vĩnh viễn.");
      onConfirm(); // Cập nhật danh sách trong SubTrash
    } catch {
      message.error('Có lỗi xảy ra khi xóa các danh mục con.');
    }
  };

  return (
    <Modal
      // title="Xóa Vĩnh Viễn Nhiều Danh Mục Con"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-header">Xóa Vĩnh Viễn Nhiều Danh Mục Con</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa vĩnh viễn các danh mục con đã chọn không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn-sure" onClick={handleConfirm}>
            Có, chắc chắn
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
