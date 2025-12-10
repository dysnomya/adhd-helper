import React from 'react';
import Category from './Category';

const TodoSidebar = ({ 
    categories, 
    setActiveFilter, 
    activeFilter, 
    onAddCategoryClick,
    selectedDate,
    onDateChange,
    showAllTasks,
    onToggleShowAll

}) => {

    const noCategoryId = "NULL_CATEGORY";

    const noCategoryOption = {
        id: noCategoryId,
        name: "Bez kategorii",
        color: "#828282ff"
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

    const handleDateInput = (e) => {
        const newDate = e.target.value;
        onDateChange(newDate);
        if (newDate) {
            onToggleShowAll(false);
        }
    };

    const handleToggle = (e) => {
        const isChecked = e.target.value;
        onToggleShowAll(isChecked);
        if (isChecked) {
            onDateChange('');
        }
    }

    return (

        <div className='todo-sidebar'>
            <nav className='todo-nav'>

                <p className='todo-sidebar-text-titles'>Data</p>

                <div className='sidebar-date-picker-container'>

                    <input 
                        type="date" 
                        className="date-input"
                        value={selectedDate}
                        onChange={handleDateInput}
                    />

                    <div className="sidebar-date-switch-container">
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={showAllTasks}
                                onChange={handleToggle}
                            />
                            <span className="slider"></span>
                        </label>
                        <span>Wszystkie zadania</span>
                    </div>

                </div>

                <p className='todo-sidebar-text-titles'>Kategorie</p>

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


                <div className='todo-sidebar-priorytet'>
                    <p className='todo-sidebar-text-titles'>Priorytet</p>
                </div>

            </nav>
        </div>
        

    );

}

export default TodoSidebar;