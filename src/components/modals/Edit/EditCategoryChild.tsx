'use client';
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import { updateSubCategory } from "@/apis/subCategory/subCategory.apis";
import { ISubCategory, ICategory } from "@/interfaces/models";
import { getCategories } from '@/apis/category/category.apis'; 
import './style.scss';

interface EditCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string; 
  subCategoryName: string; 
  cateId?: string; 
  onRefreshSubCategories: () => Promise<void>; 
}

const EditCategoryChild: React.FC<EditCategoryChildProps> = ({
  isVisible,
  onClose,
  subCategoryId,
  subCategoryName,
  cateId,
  onRefreshSubCategories,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Lỗi khi tải danh mục cha.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const selectedCategory = categories.find(category => category._id === cateId);
      
      if (selectedCategory) {
        if (selectedCategory.isDeleted) {
          form.setFieldsValue({ categoryID: undefined }); // Reset danh mục cha khi bị xóa mềm
        } else {
          form.setFieldsValue({ categoryID: cateId });
        }
      } else {
        form.setFieldsValue({ categoryID: undefined }); // Reset danh mục cha nếu không tìm thấy
      }

      // Set giá trị cho tên danh mục con
      form.setFieldsValue({ name: subCategoryName });
    }
  }, [isVisible, subCategoryName, cateId, categories, form]);

  const handleEditCategory = async (values: Partial<ISubCategory>) => {
    try {
      const resUpdated = await updateSubCategory(subCategoryId, { ...values });
      console.log("resUpdated:::", resUpdated);
      
      message.success("Danh mục con đã được cập nhật thành công!");
      form.resetFields();
      await onRefreshSubCategories(); 
      onClose();
    } catch {
      message.error('Có lỗi xảy ra khi cập nhật danh mục con.');
    }
  };

  return (
    <Modal
      title="Sửa Danh Mục Con"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      className="custom-modal"
    >
      <Form form={form} onFinish={handleEditCategory} layout="horizontal">
        <Form.Item
          label="Danh mục cha"
          name="categoryID"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục cha!' }]}
        >
          <Select
            loading={loading}
            placeholder="Chọn danh mục cha"
            onChange={(value) => {
              const selectedCategory = categories.find((category) => category._id === value);
              if (selectedCategory && selectedCategory.isDeleted) {
                form.resetFields(['categoryID']); // Reset lại input của Danh mục cha
                message.warning('Danh mục này đã bị xóa, vui lòng chọn danh mục khác!');
              }
            }}
          >
            {categories
              .filter((category) => !category.isDeleted) // Chỉ hiển thị danh mục chưa bị xóa mềm
              .map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Danh Mục Con"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục con!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryChild;
