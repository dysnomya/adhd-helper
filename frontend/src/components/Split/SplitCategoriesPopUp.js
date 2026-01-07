import React, { useState } from "react";
import "../../styles/split.scss";
import "../../styles/todo.scss";
import Category from '../Split/SplitCategory';

const SplitCategoriesPopUp = ({splitAccepted, setSplitAccepted, categories, onAddCategoryClick, setCalendarVisible, setSelectedCategory}) => {

    const noCategoryId = "NULL_CATEGORY";

    const [activeCategory, setActiveCategory] = useState(0);

    const noCategoryOption = {
        id: noCategoryId,
        name: "Bez kategorii",
        color: "#828282ff"
    }

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
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
                            isActive={(category.id == activeCategory)}
                        />
                    ))}
                    <Category
                        category={noCategoryOption}
                        onClick={() => handleCategoryClick(noCategoryId)}
                        isActive={(noCategoryId == activeCategory)}
                    />
                </div>

                <div className='split-add-button'onClick={onAddCategoryClick}>
                    <p>+</p>
                </div>

                <div className="add-category-modal-actions split-actions">
                    <button className="add-category-btn-cancel" onClick={() => setSplitAccepted(false)}>Anuluj</button>
                    <button className="add-category-btn-confirm" 
                        onClick={() => {setSplitAccepted(false); setCalendarVisible(true); 
                        (activeCategory == noCategoryId) ? 
                        setSelectedCategory(noCategoryOption) 
                        : 
                        setSelectedCategory(categories.find(categorie => categorie.id == activeCategory))}}>
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

