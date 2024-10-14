"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: white;
    width: 70%;
    max-height: 90vh;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .modal-header {
        display: flex;
        align-items: center;
        background-color: rgba(13, 110, 253, 0.8);
        padding: 10px;
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 2;

        &-title {
            color: white;
            margin-left: 1rem;
        }

        .modal-close {
            position: absolute;
            width: 1.875rem;
            height: 1.875rem;
            background-color: red;
            color: white;
            right: 1.25rem;
            cursor: pointer;
        }
    }

    .modal-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start; 
        padding: 2rem;
        overflow-y: auto;

        &-info {
            margin-top: 2rem;
            border-top: 1px solid rgb(52, 125, 208);
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
    }
`;

const ModalImageWrapper = styled.div`
    max-height: 60vh; 
    width: 100%;
    position: relative;
    margin-bottom: 1rem; 
    display: flex;
    justify-content: center;
`;

interface IProps {
    name: string;
    image: string; 
    description: string; 
    status: string; 
}

function CategoryItem({ name, image, description, status }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Kiểm tra item có categoryId hay không
    if (!image || !name) return null; // Không hiển thị nếu không có thông tin

    return (
        <>
            <div className="feedback-item" onClick={openModal}>
                {status === 'NO' || status === 'POSTED' ? (
                    <Image 
                        className="item-img" 
                        src={image} 
                        alt={name} 
                        width={300}  
                        height={200} 
                        layout="responsive"  
                    />
                ) : null}
                <div className="overlay"></div>
                {/* <div className='item-info'>
                    <p>{name}</p> 
                </div> */}
            </div>
            {isModalOpen && (
                <ModalWrapper onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h6 className='modal-header-title'>Chi tiết Feedback</h6>
                            <IoMdClose className='modal-close' onClick={closeModal} />
                        </div>
                        <div className='modal-body'>
                            <ModalImageWrapper>
                                {status === 'NO' || status === 'POSTED' ? (
                                    <Image 
                                        src={image} 
                                        alt={name} 
                                        width={500}  
                                        height={500} 
                                        objectFit="contain" 
                                    />
                                ) : null}
                            </ModalImageWrapper>
                            <div className='modal-body-info'>
                                <h6>Thông tin chi tiết</h6>
                                <p>{name}</p> 
                                <p>{description}</p> 
                                <p>{status}</p>
                            </div>
                        </div>
                    </ModalContent>
                </ModalWrapper>
            )}
        </>
    );
}

export default CategoryItem;
