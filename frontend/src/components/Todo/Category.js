import "../../styles/todo.scss";

const Category =({ category, onClick, isActive }) => {

    return (
        <div 
            className={`todo-sidebar-category-item ${isActive ? 'active' : ''}`}
            onClick={onClick} 
            style={{ '--cat-color': category.color }}
        >
            <p>{category.name}</p>
        </div>
    );
};

export default Category;