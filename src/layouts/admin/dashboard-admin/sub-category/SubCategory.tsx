'use client';
import React, { useState, useEffect } from 'react';
import { Flex, Input } from 'antd';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import SubTable from '@/components/tables/table-subcategory/SubTable';
import AddCategoryChild from '@/components/modals/Add/AddCategoryChild';
import DeleteMultiChild from '@/components/modals/Delete/DeleteMultiChild';
import { getAllSubCategories, createSubCategory } from '@/apis/subCategory/subCategory.apis';
import { getCategories } from '@/apis/category/category.apis';
import { ISubCategory, ICategory } from '@/interfaces/models';
import styled from 'styled-components';
import './style.scss';

const StyledBtnArea = styled(Flex)`
  margin-bottom: 1rem; 
`;

const StyledSearchInput = styled(Input)`
  width: 200px;
  margin-left: 1rem;
`;

export default function SubCategoryLayout() {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<ICategory[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMultiDeleteModalVisible, setIsMultiDeleteModalVisible] = useState(false);

  // Fetch subcategories and parent categories
  const fetchData = async () => {
    try {
      const [fetchedSubCategories, fetchedParentCategories] = await Promise.all([
        getAllSubCategories(),
        getCategories(),
      ]);
      setSubCategories(fetchedSubCategories);
      setParentCategories(fetchedParentCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubCategory = async (subCategoryData: Partial<ISubCategory>) => {
    try {
      const newSubCategory = await createSubCategory(subCategoryData);
      setSubCategories((prev) => [...prev, newSubCategory]);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error('Error adding sub-category:', error);
    }
  };

  const handleDeleteSelected = () => {
    setIsMultiDeleteModalVisible(true); // Show multi-delete modal
  };

  const handleMultiDeleteConfirm = async () => {
    setSelectedRowKeys([]); // Reset selected row keys
    await fetchData(); // Fetch new data after deletion
  };

  const filteredSubCategories = subCategories?.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <StyledBtnArea justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-delete">
            <Link href="/admin/sub-trash">
              <ButtonSimple className='trash-icon' icon={FaTrash} />
            </Link>
          </div>
          {selectedRowKeys.length > 1 && (
            <div className="list-check">
              <ButtonSimple text="Xóa" icon={FaTrash} onClick={handleDeleteSelected} />
            </div>
          )}
        </Flex>
        <div className="button-add">
          <ButtonSimple icon={FaPlus} onClick={() => setIsAddModalVisible(true)} />
        </div>
      </StyledBtnArea>

      <div className="dashboard-search">
        <label htmlFor="search" className="dashboard-search-label">Tìm Kiếm:</label>
        <StyledSearchInput
          type="text"
          placeholder="Nhập tên danh mục con"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard-search-input"
        />
      </div>

      <div style={{ marginTop: '1rem' }} className="dashboard-table">
        <SubTable
          subCategories={filteredSubCategories}
          parentCategories={parentCategories}
          selectedRowKeys={selectedRowKeys}
          onRowSelectionChange={setSelectedRowKeys}
          onAddCategory={handleAddSubCategory}
          onRefreshSubCategories={fetchData} // Pass refresh function to SubTable
        />
      </div>

      <AddCategoryChild
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCategory={handleAddSubCategory}
      />

      <DeleteMultiChild
        isVisible={isMultiDeleteModalVisible}
        onClose={() => setIsMultiDeleteModalVisible(false)}
        selectedKeys={selectedRowKeys as string[]}
        onConfirm={handleMultiDeleteConfirm}
      />
    </div>
  );
}
