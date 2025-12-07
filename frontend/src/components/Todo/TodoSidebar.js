import React from 'react';
import Category from './ui/Category';

const TodoSidebar = ({ categories, setActiveFilter, activeFilter, onAddCategoryClick }) => {

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

            <p style={{
                textAlign: 'center',
                margin: '10px'
            }}>Twoje kategorie</p>

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

            <div 
                onClick={onAddCategoryClick}
                style={{
                    padding: '15px', 
                    background: '#4CAF50', 
                    color: 'white', 
                    cursor: 'pointer', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    margin: "10px",
                    marginRight: "0px",
                    marginLeft: '15px',
                }}
            >
                + Dodaj
            </div>

        </nav>

    );

}

export default TodoSidebar;