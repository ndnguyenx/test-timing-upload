"use client";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CategoryNav from "./feedback-nav/FeedbackNav";
import CategoryItem from "./feedback-item/FeedbackItem";
import { IBlog } from "@/interfaces/models/blog.interface"; 
import { getFeedbacks } from "@/apis/feedback/feedback.apis";
import { getCategories } from "@/apis/category/category.apis";
import { message } from "antd";

const CategoryStyled = styled.div`
    .category-wrapper {
        padding: 1rem;
        column-gap: 1rem;

        @media (min-width: 375px) {
            column-count: 1;
        }

        @media (min-width: 590px) and (max-width: 969px) {
            column-count: 2;
        }

        @media (min-width: 970px) and (max-width: 1199px) {
            column-count: 3;
        }

        @media screen and (min-width: 1200px) {
            column-count: 5;
        }
    }
`;

export function Category() {
    const [filteredProducts, setFilteredProducts] = useState<IBlog[]>([]); 
    const [categories, setCategories] = useState<string[]>([]);

    // Fetch data feedback and categories
    const fetchData = async () => {
        try {
            const feedbacks: IBlog[] = await getFeedbacks(); 
            // const categories = await getCategories();

            // setCategories(categories.map((cat) => cat.name));
            setFilteredProducts(feedbacks); 
        } catch (error) {
            message.error("Có lỗi xảy ra khi lấy dữ liệu.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CategoryStyled>
            <CategoryNav items={["Tất cả", ...categories]} onItemClick={() => {}} /> 
            <div className="category-wrapper">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <CategoryItem
                            key={product.title} 
                            name={product.title} 
                            image={product.thumb} 
                            description={product.content}
                            status={product.schedule} 
                        />
                    ))
                ) : (
                    <div className="text-center w-screen">
                        {/* <p>Không có phản hồi nào được tìm thấy.</p> */}
                    </div>
                )}
            </div>
        </CategoryStyled>
    );
}
