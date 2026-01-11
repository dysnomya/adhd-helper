import "../../styles/split.scss";

const SplitCategory =({ category, onClick, isActive }) => {

    return (
        <div 
            className={`split-category-item ${isActive ? 'active-category' : ''}`}
            onClick={onClick} 
            style={{ '--cat-color': category.color }}
        >
            <p>{category.name}</p>
        </div>
    );
};

export default SplitCategory;