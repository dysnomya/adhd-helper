
const Category =({ category, onClick, isActive }) => {

    const activeStyle = isActive 
        ? { border: '5px solid black', borderRadius: '5px', padding: '10px' } 
        : { border: '2px solid transparent', padding: '10px' };

    const combinedStyle = {
        background: category.color,
        cursor: 'pointer',
        margin: "5px",
        ...activeStyle
    };

    return (
        <div onClick={onClick} style={combinedStyle}>
            <p>{category.name}</p>
        </div>
    );
};

export default Category;