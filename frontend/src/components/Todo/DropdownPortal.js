import ReactDOM from 'react-dom';
import "../../styles/todo.scss";

export const DropdownPortal = ({ children, rect, onClose }) => {
    if (!rect) return null;

    const style = {
        position: 'absolute',
        top: rect.bottom + window.scrollY + 5 + 'px',
        left: rect.left + window.scrollX + 'px',
        zIndex: 99999,
        minWidth: rect.width + 'px',
    };

    return ReactDOM.createPortal(
        <>
            <div 
                style={{
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    zIndex: 99998,
                    cursor: 'default'
                }} 
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            
            <div style={style} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </>,
        document.body
    );
};