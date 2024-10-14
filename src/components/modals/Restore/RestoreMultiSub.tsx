'use client';
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { restoreSubCategory } from "@/apis/subCategory/subCategory.apis"; // API khôi phục danh mục con
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
      background-color: #1677ff;
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

interface RestoreMultiSubProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subCategoryIds: string[];
}

export default function RestoreMultiSub({
  isVisible,
  onClose,
  onConfirm,
  subCategoryIds,
}: RestoreMultiSubProps) {
  const handleConfirm = async () => {
    try {
      await Promise.all(subCategoryIds.map(id => restoreSubCategory(id))); // Gọi API để khôi phục danh mục con
      message.success("Các danh mục con đã được khôi phục.");
      onConfirm(); // Cập nhật danh sách trong SubTrash
    } catch {
      message.error('Có lỗi xảy ra khi khôi phục các danh mục con.');
    }
  };

  return (
    <Modal
      // title="Khôi Phục Nhiều Danh Mục Con"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-header">Khôi Phục Nhiều Danh Mục Con</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn khôi phục các danh mục con đã chọn không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn-sure" onClick={handleConfirm}>
            Có, khôi phục
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
