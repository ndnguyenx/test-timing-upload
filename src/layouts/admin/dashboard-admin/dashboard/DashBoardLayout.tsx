"use client";
import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import CreateFeedbackModal from "@/components/modals/Add/CreateFeedbackModal";
import CardAdmin from "@/components/cards/Admin/CardAdmin"; 
import { IBlog } from "@/interfaces/models/blog.interface"; 
import { getFeedbacks } from "@/apis/feedback/feedback.apis";
import { FaPlus } from "react-icons/fa"; 
import ButtonSimple from "@/components/buttons/ButtonSimple";
import "./style.scss";

export default function DashboardLayout() {
    const [uploadedImages, setUploadedImages] = useState<IBlog[]>([]); 
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchFeedbacks = async () => {
        try {
            const response = await getFeedbacks(); 
            if (response.length > 0) {
                setUploadedImages(response);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleRefreshImages = (newBlog: IBlog) => { 
        setUploadedImages((prev) => [...prev, newBlog]);
        fetchFeedbacks(); 
    };

    return (
        <div className="dashboard-container">
            <Flex className="btn-area" justify="flex-end" align="center">
                <div className="button-add">
                    <ButtonSimple icon={FaPlus} onClick={handleOpenModal} />
                </div>
            </Flex>

            <div className="content-item">
                {uploadedImages?.map((blog) => { 
                    return (
                        <CardAdmin
                            key={blog?.title} 
                            image={blog?.thumb} 
                            title={blog.title} 
                            content={blog.content} 
                            timer={blog.timer} 
                            schedule={blog.schedule}
                        />
                    );
                })}
            </div>

            {isModalVisible && <CreateFeedbackModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onUploadComplete={handleRefreshImages}
            />}
        </div>
    );
}
