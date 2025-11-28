import React from 'react';
import Category from './ui/Category';

const TodoSidebar = ({ categories, setActiveFilter, activeFilter }) => {

    const noCategoryId = "NULL_CATEGORY";

    const noCategoryOption = {
        id: noCategoryId,
        name: "Bez kategorii",
        color: "#dfdfdf"
    }

    const handleCategoryClick = (categoryId) => {

        setActiveFilter(prevFilters => {
            if (prevFilters.includes(categoryId)) {
                return prevFilters.filter(id => id !== categoryId);
            } else {
                return [...prevFilters, categoryId];
            }
        });

    };

    return (

        <nav style={{width: '150px', background: 'lightblue'}}>

            {categories.map(category => (
                <Category
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category.id)}
                    isActive={activeFilter.includes(category.id)}
                />
            ))}

            <Category
                category={noCategoryOption}
                onClick={() => handleCategoryClick(noCategoryId)}
                isActive={activeFilter.includes(noCategoryId)}
            />

        </nav>

    );

}

export default TodoSidebar;