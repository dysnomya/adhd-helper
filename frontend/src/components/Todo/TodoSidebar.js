import React from 'react';
import Category from './Category';

import { ReactComponent as EditCategoryIcon } from "../../assets/edit-category.svg";

const TodoSidebar = ({ 
    categories, 
    setActiveFilter, 
    activeFilter, 
    onAddCategoryClick,
    selectedDate,
    onDateChange,
    showAllTasks,
    onToggleShowAll,
    onEditCategoryClick,
    selectedPriority,
    onPriorityChange

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

    const handleClearFilters = () => {
        onToggleShowAll(true);
        onDateChange('');

        const allCategoryIds = categories.map(cat => cat.id);
        allCategoryIds.push("NULL_CATEGORY");
        setActiveFilter(allCategoryIds);
        onPriorityChange(null);
    }

    const handlePriorityClick = (priority) => {
        if (selectedPriority === priority) {
            onPriorityChange(null);
        } else {
            onPriorityChange(priority);
        }
    };


    return (

        <div className='todo-sidebar'>
            <nav className='todo-nav'>

                <div>
                    <p className='todo-sidebar-text-titles'>Data</p>

                    <div className='sidebar-date-picker-container'>

                        <input 
                            type="date" 
                            className="date-input"
                            value={selectedDate}
                            onChange={handleDateInput}
                        />

                    </div>

                    <div className='categories-header-container'>
                        <p className='todo-sidebar-text-titles'>Kategorie</p>
                        <EditCategoryIcon 
                            className='edit-category-button'
                            onClick={onEditCategoryClick}
                        />
                    </div>



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
                </div>


                <div>
                    <div className='todo-sidebar-priorytet'>
                        <p className='todo-sidebar-text-titles'>Priorytet</p>

                        <div 
                            className={`priority high ${selectedPriority === 'HIGH' ? 'active' : ''}`}
                            onClick={() => handlePriorityClick('HIGH')}
                            > Wysoki
                        </div>

                        <div 
                            className={`priority medium ${selectedPriority === 'MEDIUM' ? 'active' : ''}`}
                            onClick={() => handlePriorityClick('MEDIUM')}
                            > Średni
                        </div>

                        <div 
                            className={`priority low ${selectedPriority === 'LOW' ? 'active' : ''}`}
                            onClick={() => handlePriorityClick('LOW')}
                            > Niski
                        </div>
                        
                    </div>


                    <div className='clear-filters'>
                        <button 
                            className="btn-clear-filters" 
                            onClick={handleClearFilters}>
                                Wyczyść filtry
                        </button>
                    </div>
                </div>

            </nav>
        </div>
        

    );
}
export default TodoSidebar;