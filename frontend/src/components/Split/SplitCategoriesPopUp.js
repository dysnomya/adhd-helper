import React, { useState } from "react";
import "../../styles/split.scss";
import "../../styles/todo.scss";
import Category from '../Split/SplitCategory';

const SplitCategoriesPopUp = ({splitAccepted, setSplitAccepted, categories, onAddCategoryClick, setCalendarVisible, setSelectedCategory, selectedPriority, setSelectedPriority, handleSplitAdded}) => {

    const noCategoryId = "NULL_CATEGORY";

    const [activeCategory, setActiveCategory] = useState(noCategoryId);

    const noCategoryOption = {
        id: noCategoryId,
        name: "Bez kategorii",
        color: "#828282ff"
    }

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
    };
    
    return (
        splitAccepted ?
        
        <div className="loader-bg">
            <div className="split-categories-popup-div">
                <p className='split-text-kategorie'>Wybierz kategorie</p>
                <div className="split-categories-scroll-list">
                    {categories.map(category => (
                        <Category
                            key={category.id}
                            category={category}
                            onClick={() => handleCategoryClick(category.id)}
                            isActive={(category.id === activeCategory)}
                        />
                    ))}
                    <Category
                        category={noCategoryOption}
                        onClick={() => handleCategoryClick(noCategoryId)}
                        isActive={(noCategoryId === activeCategory)}
                    />
                </div>

                <div className='split-add-button'onClick={onAddCategoryClick}>
                    <p>+</p>
                </div>

                <div className='todo-sidebar-priorytet'>
                        <p className='todo-sidebar-text-titles'>Priorytet</p>

                        <div
                            className={`priority high ${selectedPriority === 'HIGH' ? 'active-priority' : ''}`}
                            style={{ '--prio-color': '#D22727' }}
                            onClick={() => handlePriorityClick('HIGH')}
                            > Wysoki
                        </div>

                        <div
                            className={`priority medium ${selectedPriority === 'MEDIUM' ? 'active-priority' : ''}`}
                            style={{ '--prio-color': '#E9BD2B' }}
                            onClick={() => handlePriorityClick('MEDIUM')}
                            > Średni
                        </div>

                        <div
                            className={`priority low ${selectedPriority === 'LOW' ? 'active-priority' : ''}`}
                            style={{ '--prio-color': '#A5DD3C' }}
                            onClick={() => handlePriorityClick('LOW')}
                            > Niski
                        </div>

                    </div>

                <div className="add-category-modal-actions split-actions">
                    <button className="add-category-btn-cancel" onClick={() => setSplitAccepted(false)}>Anuluj</button>
                    <button className="add-category-btn-confirm" 
                        onClick={() => {setSplitAccepted(false); setCalendarVisible(true); handleSplitAdded(); 
                        (activeCategory === noCategoryId) ? 
                        setSelectedCategory(noCategoryOption) 
                        : 
                        setSelectedCategory(categories.find(categorie => categorie.id === activeCategory))}}>
                        Potwierdź
                    </button>
                </div>

                
            </div>
        </div>
        : 
        <></>    
    )
}

export default SplitCategoriesPopUp;

