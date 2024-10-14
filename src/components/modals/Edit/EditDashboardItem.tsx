'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { ICategory, ISubCategory } from '@/interfaces/models';
import { getCategories } from '@/apis/category/category.apis'; // Gọi API để lấy danh mục cha
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { getFeedbackById, getFeedbackById1, updateFeedback } from '@/apis/feedback/feedback.apis';
import './style.scss'

interface EditDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;  
  onUpdateComplete: () => void;
}

export default function EditDashboardItem({
  isVisible,
  onClose,
  feedbackId,
  onUpdateComplete,
}: EditDashboardItemProps) {
  const [imgName, setImgName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        message.error('Có lỗi xảy ra khi lấy danh mục.');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const allSubCategories = await getAllSubCategories();
        setSubCategories(allSubCategories);
      } catch (error) {
        message.error('Có lỗi xảy ra khi lấy danh mục con.');
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (feedbackId) { 
      const fetchFeedbackById = async () => {
        try {
          const response = await getFeedbackById1(feedbackId);
          const feedback = response?.data;
          setImgName(feedback?.nameFeedback || '');
          setDescription(feedback?.description || '');
          console.log(feedback);
          console.log(response);

          // Kiểm tra nếu feedback.subCategory trùng với bất kỳ subCategoryID nào
          const matchedSubCategory = subCategories.find(
            (subCategory) => subCategory._id === feedback?.subCategory
          );

          const matchedCategory = categories.find(
            (category) => category._id === feedback?.category?._id
          );

          // Nếu tìm thấy danh mục con trùng khớp, cập nhật giá trị selectedSubCategory
          if (matchedSubCategory) {
            setSelectedSubCategory(matchedSubCategory._id);
          } else {
            setSelectedSubCategory(''); // Nếu không tìm thấy, đặt về giá trị mặc định
          }

        } catch (error) {
          message.error('Có lỗi xảy ra khi tải thông tin phản hồi.');
        }
      };

      fetchFeedbackById();
    }
  }, [feedbackId, subCategories]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imgName || !selectedSubCategory || !description) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!feedbackId) { 
      message.error('Không thể cập nhật vì thiếu ID.');
      return;
    }
    
    const formData = {
      nameFeedback: imgName, 
      description: description, 
      subCategoryID: selectedSubCategory,
      images: file ? file : undefined
    };

    setLoading(true);

    try {
      const result = await updateFeedback(feedbackId, formData);
      if (result?.statusCode !== 200) {
        message.success(result?.message);
        return;
      }
      message.success(result?.message);
      onUpdateComplete();
      onClose();
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật hình ảnh.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      confirmLoading={loading}
    >
      <div className='modal-header'>Chỉnh sửa phản hồi</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
        <Input
          placeholder="Tên hình ảnh"
          value={imgName}
          onChange={(e) => setImgName(e.target.value)}
        />
        <Input.TextArea
          placeholder="Mô tả hình ảnh"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ resize: 'none' }}
        />
        <Select
          placeholder="Chọn danh mục con"
          style={{ width: '100%' }}
          value={selectedSubCategory}
          onChange={(value) => setSelectedSubCategory(value)}
        >
          {categories.length > 0 ? (
            categories.map((category) => (
              !category.isDeleted && (
                <React.Fragment key={category._id}>
                  <Select.Option
                    disabled
                    value={`parent-${category._id}`}
                    className="category-option"
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#787878",
                    }}
                  >
                    {category.name}
                  </Select.Option>
                  {category.subCategoriesID.map((subCategoryID) => {
                    const subCategory = subCategories.find(
                      (sc) => sc._id === subCategoryID
                    );
                    if (category.isDeleted || (subCategory && subCategory.isDeleted)) {
                      setSelectedSubCategory("");
                    }

                    return subCategory ? (
                      <Select.Option
                        key={subCategory._id}
                        value={subCategory._id}
                        className="subcategory-option"
                        style={{ paddingLeft: "2rem" }}
                      >
                        {subCategory.name}
                      </Select.Option>
                    ) : null;
                  })}
                </React.Fragment>
              )
            ))
          ) : (
            <Select.Option disabled>Không có danh mục nào</Select.Option>
          )}
        </Select>

        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
}
