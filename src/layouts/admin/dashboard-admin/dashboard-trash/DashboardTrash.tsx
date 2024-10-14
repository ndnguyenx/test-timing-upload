'use client';
import React, { useState, useEffect } from 'react';
import { IFeedBack, IQueries } from '@/interfaces/models';
import CardAdminTrash from '@/components/cards/Admin/CardAdminTrash';
import RestoreDashboardItem from '@/components/modals/Restore/RestoreDashboardItem';
import HardDeleteDashboardItem from '@/components/modals/HardDelete/HardDeleteDashboardItem'; // Import modal xóa vĩnh viễn
import { getFeedbacks } from '@/apis/feedback/feedback.apis';
import './style.scss';
import { useRouter } from 'next/navigation';

export default function DashboardTrash() {
  const [deletedFeedbacks, setDeletedFeedbacks] = useState<IFeedBack[]>([]);
  const [isRestoreModalVisible, setIsRestoreModalVisible] = useState(false);
  const [isHardDeleteModalVisible, setIsHardDeleteModalVisible] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const router = useRouter();

  const fetchDeletedFeedbacks = async () => {
    try {
      const response = await getFeedbacks({ isDeleted: true } as IQueries);
      setDeletedFeedbacks(response);
    } catch (error) {
      console.error('Error fetching deleted feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchDeletedFeedbacks();
  }, []);

  const handleRestore = (id: string) => {
    setSelectedFeedbackId(id);
    setIsRestoreModalVisible(true);
  };

  const handleHardDelete = (id: string) => {
    setSelectedFeedbackId(id);
    setIsHardDeleteModalVisible(true);
  };

  const handleRestoreComplete = () => {
    fetchDeletedFeedbacks(); // Cập nhật danh sách sau khi khôi phục
  };

  const handleHardDeleteComplete = () => {
    fetchDeletedFeedbacks(); // Cập nhật danh sách sau khi xóa vĩnh viễn
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="dashboard-trash-container">
      <h3>Hình ảnh đã xóa</h3>
      <button className="back-button" onClick={handleBack}>
        Quay lại
      </button>
      <div className="content-item">
        {deletedFeedbacks?.map((feedback) => (
          <CardAdminTrash 
            key={feedback._id} 
            image={feedback} 
            onRestore={handleRestore} 
            onHardDelete={handleHardDelete} 
            subCategoryName={feedback.subCategory?.isDeleted ? 'Không xác định' : feedback.subCategory?.name || 'Không xác định'} // Truyền subCategoryName
          />
        ))}
      </div>
      <RestoreDashboardItem
        isVisible={isRestoreModalVisible}
        onClose={() => setIsRestoreModalVisible(false)}
        feedbackId={selectedFeedbackId}
        onRestoreComplete={handleRestoreComplete}
      />
      <HardDeleteDashboardItem
        isVisible={isHardDeleteModalVisible}
        onClose={() => setIsHardDeleteModalVisible(false)}
        feedbackId={selectedFeedbackId}
        onHardDeleteComplete={handleHardDeleteComplete}
      />
    </div>
  );
}
