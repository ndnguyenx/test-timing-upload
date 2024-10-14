"use client";
import React, { useState } from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { createCategory } from "@/apis/category/category.apis";
import './parent-style.scss';

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;
    margin: 1rem auto;
    .form {
      border: 1px solid #ccc;
      .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;

        &-title {
          width: 30%;
          padding: 0.5rem 0;
          text-align: center;
          background-color: #eaecf4;
          white-space: nowrap;
        }

        &-text {
          width: 70%;
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          border-radius: 0.2rem;
        }
      }
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
      border-top: 1px solid #e9ecef;
      gap: 1rem;

      .btn-cancel {
        background: #ffffff;
        border-color: #d9d9d9;
        color: rgba(0, 0, 0, 0.88);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
        &:hover {
          opacity: 0.8;
        }
      }

      .btn-add {
        padding: 0.5rem;
        border-radius: 6px;
        width: auto;
        background-color: #4e73df;
        color: var(--color-white);
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

interface AddCategoryParentProps {
  isVisible: boolean;
  onClose: () => void;
  onAddCategory: (categoryData: { name: string }, resetForm: () => void) => void;
}

export default function AddCategoryParent({
  isVisible,
  onClose,
  onAddCategory,
}: AddCategoryParentProps) {
  const [name, setName] = useState("");

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
    setName("");
  };

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as any); // Gọi hàm submit khi nhấn Enter
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error("Tên danh mục không được để trống.");
      return;
    }
    await createCategory({name: name});
    onAddCategory({ name }, () => setName(""));
  };

  return (
    <Modal open={isVisible} onCancel={handleCancel} footer={null}>
      <div className="modal-header">Thêm danh mục chính</div>
      <StyledModalContent>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="input-group">
                <span className="input-group-title">Tên danh mục chính</span>
                <input
                  type="text"
                  className="input-group-text"
                  value={name}
                  onChange={handleCategoryNameChange}
                  onKeyDown={handleKeyDown} // Bắt sự kiện phím Enter
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancel}>
                Hủy bỏ
              </button>
              <button className="btn-add" type="submit">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
