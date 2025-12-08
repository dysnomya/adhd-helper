import React from 'react';
import Category from './Category';

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

        <div className='todo-sidebar'>
            <nav className='todo-nav'>

                <p className='todo-sidebar-text-kategorie'>Kategorie</p>

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
                    className='todo-sidebar-add-button'
                    onClick={onAddCategoryClick}
                >
                    <p>+</p>
                </div>

            </nav>
        </div>
        

    );

}

export default TodoSidebar;