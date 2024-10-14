'use client';
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { restoreCategory } from "@/apis/category/category.apis";
import { ICategory } from "@/interfaces/models";
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

interface RestoreMultiCategoryProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (categoryIds: string[]) => void;
  selectedCategories: ICategory[];
}

export default function RestoreMultiCategory({
  isVisible,
  onClose,
  onConfirm,
  selectedCategories,
}: RestoreMultiCategoryProps) {
  const handleConfirm = async () => {
    try {
      await Promise.all(selectedCategories.map(category => restoreCategory(category._id))); // Gọi API để khôi phục nhiều danh mục
      onConfirm(selectedCategories.map(category => category._id)); 
    } catch {
      message.error('Có lỗi xảy ra khi khôi phục danh mục.');
    }
  };

  return (
    <Modal
      // title="Khôi Phục Danh Mục"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-header">Khôi Phục Danh Mục</div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn khôi phục các danh mục đã chọn không?</p>
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
