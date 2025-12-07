
const Category =({ category, onClick, isActive }) => {

    const activeStyle = isActive 
        ? { border: '5px solid black', borderRadius: '5px'} 
        : { border: '2px solid transparent'};

    const combinedStyle = {
        background: category.color,
        cursor: 'pointer',
        margin: "10px",
        marginRight: "0px",
        marginLeft: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...activeStyle
    };

    return (
        <div onClick={onClick} style={combinedStyle}>
            <p>{category.name}</p>
        </div>
    );
};

export default Category;