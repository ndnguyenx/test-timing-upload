"use client";
import Image from "next/image";
import "./style.scss";
import { IPhoto } from "@/interfaces/IModels.interface";
import { useState } from "react";
import { randomKey, sortPhotoBelongTime } from "@/utils";
import { Modal } from "antd";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { ModalUploadPhoto } from "../modal-upload-photo/ModalUploadPhoto";
import toast from "react-hot-toast";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

interface IPropListPhotos {
    photos: IPhoto[];
    isOpenModal: boolean;
    onSelectedPhoto: (photo: IPhoto) => void;
    onCloseModal: (isOpen: boolean) => void;
}

export const ModalListPhotos = ({
    photos,
    onSelectedPhoto,
    isOpenModal,
    onCloseModal,
}: IPropListPhotos) => {
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | undefined>();
    const [isOpenModalUploadPhoto, setIsOpenModalUploadPhoto] =
        useState<boolean>(false);

    //
    const handleClickPhoto = (photo: IPhoto) => {
        setSelectedPhoto(photo);
    };

    //
    const handleOk = () => {
        if (!selectedPhoto) {
            toast.error("Bạn chưa chọn ảnh");
            return;
        }
        onSelectedPhoto(selectedPhoto);
        onCloseModal(false);
    };

    //
    const handleCancel = () => {
        onCloseModal(false);
    };

    return (
        <>
            <Modal
                centered
                okText={"Chọn"}
                cancelText={"Hủy bỏ"}
                open={isOpenModal}
                className="modal-list-photos"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <h5>Chọn ảnh</h5>
                <div className="list-photos">
                    {/* add */}
                    <div
                        className="wrap-photo add"
                        onClick={() => setIsOpenModalUploadPhoto(true)}
                    >
                        <FaPlus size={34} color="grey" />
                    </div>

                    {/* List */}
                    {sortPhotoBelongTime(photos).map((photo) => (
                        <div
                            key={randomKey()}
                            className={`wrap-photo`}
                            onClick={() => handleClickPhoto(photo)}
                        >
                            <Image
                                width={140}
                                height={140}
                                src={photo.photo_url}
                                alt={photo.photo_alt}
                                className={"photo"}
                            />
                            {selectedPhoto?.id === photo.id && "selected" && (
                                <FaCheckCircle
                                    className="icon-check"
                                    size={42}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="modal-list-photos-controls">
                    <ButtonPrimary
                        type="button"
                        text="Hủy bỏ"
                        outLine
                        error
                        small
                        onClick={handleCancel}
                    />
                    <ButtonPrimary
                        type="button"
                        text="Chọn"
                        small
                        onClick={handleOk}
                    />
                </div>
            </Modal>
            <ModalUploadPhoto
                setOptimisticImages={(photos) => {}}
                isOpenModal={isOpenModalUploadPhoto}
                onCloseModal={(isOpen) => setIsOpenModalUploadPhoto(isOpen)}
                buttonOk={{ text: "Tải lên" }}
            />
        </>
    );
};
