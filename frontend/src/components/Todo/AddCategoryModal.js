import React, { useState } from 'react';
import "../../styles/todo.scss";

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {

    const [name, setName] = useState('');
    const [color, setColor] = useState('#f8aa4b');

    if (!isOpen) return null;

    const handleSubmit = () => {

        if (!name.trim()) {
            alert("Podaj nazwę grupy!");
            return;
        }

        onConfirm(name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(), color);
        setName('');
        setColor('#f8aa4b');
        onClose();

    };


    return (

        <div className='add-category-overlay'>
            
            <div className='add-category-card'>

                <h3>Dodaj kategorię</h3>

                <div className='add-category-input-group'>
                    <label>Nazwa</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Praca, Studia"
                        autoFocus
                    />
                </div>

                <div className='add-category-input-group'>
                    <label>Kolor</label>
                    <div className='add-category-color-group'>
                        <div className='add-category-color-input' style={{backgroundColor:color}}>
                            <input 
                                type="color" 
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>

                        <div className='add-category-color-name' >
                            <span>{color}</span>
                        </div>
                    </div>   
                </div>

                <div className="add-category-input-group">
                    <label>Preview</label>
                    <div 
                        className="add-category-preview-badge"
                        style={{ backgroundColor: color }}
                    >
                        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() || "Nazwa"}
                    </div>
                </div>

                <div className="add-category-modal-actions">
                    <button className="add-category-btn-cancel" onClick={onClose}>
                        ✕ Anuluj
                    </button>
                    <button className="add-category-btn-confirm" onClick={handleSubmit}>
                        ✓ Dodaj
                    </button>
                </div>

            </div>

        </div>
    )
};

export default AddCategoryModal;
