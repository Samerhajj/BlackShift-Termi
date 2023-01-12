// React
import React, { useState, useEffect } from 'react';

// Translate
import { useTranslation } from 'react-i18next';

// APIs
import CategoryApi from '../api/CategoryAPI';

const CategorySelector = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () =>{
            const res = await CategoryApi.getAllCategories();
            if(res.success){
                const categories = res.body;
                setCategories(categories);
                const index = categories.findIndex(cat => cat.categoryId == props.initialCategory);
                setSelectedCategory(index);
                console.log(categories);
            }else{
                console.log(res.message);
            }
        };
        getCategories();
    }, []);
    
    const onCategoryChange = (newCategory) => {
        // setSelectedCategory(newCategory);
        if(newCategory){
            setSelectedCategory(newCategory.categoryId);
        }else{
            setSelectedCategory(undefined);
        }
        props.categoryChanged(newCategory);
    };
    
    return(
        <select 
            id="category"
            value={selectedCategory}
            className="form-select"
            title="Category"
            onChange={(e)=>{onCategoryChange(categories[e.target.value])}}>
            <option value="Category">Category</option>
            {
                categories.map((category, index) => (
                    <option key={index} value={index}>{category.categoryName["english"]}</option>
                ))
            }
        </select>
    );
};
export default CategorySelector;