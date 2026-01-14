import React, { useState, useEffect } from 'react';
import "../../styles/todo.scss";

const EditCategoryModal = ({ isOpen, onClose, categories, onUpdate, onDelete }) => {

    const [popup, setPopup] = useState('SELECT');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [name, setName] = useState('');
    const [color, setColor] = useState('#f8aa4b');


    useEffect(() => {
        if (isOpen) {
            setPopup('SELECT');
            setSelectedCategoryId(null);
            setName('');
            setColor('#f8aa4b');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNext = () => {
        if (!selectedCategoryId) return;

        const categoryToEdit = categories.find(c => c.id === selectedCategoryId);
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setColor(categoryToEdit.color);
            setPopup('EDIT');
        }

    }

    const handleUpdate = () => {
        if (!name.trim()) return alert("Nazwa nie może być pusta!");
        onUpdate(selectedCategoryId, { id: selectedCategoryId, name, color });
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć tę kategorię? Zadania mogą stracić przypisanie.")) {
            onDelete(selectedCategoryId);
            onClose();
        }
    };



    if (popup === 'SELECT') {
        return (
            <div className='add-category-overlay'>
                <div className='add-category-card select-popup'>
                    <h3>Wybierz kategorię</h3>

                    <div className="category-selection-list">
                        {categories.map(cat => (
                            <div 
                                key={cat.id}
                                className={`category-select-item ${selectedCategoryId === cat.id ? 'selected' : ''}`}
                                style={{ '--cat-color': cat.color }} 
                                onClick={() => setSelectedCategoryId(cat.id)}
                            >
                                <p>{cat.name}</p>
                            </div>
                        ))}
                    </div>

                    <div className="add-category-modal-actions">
                        <button className="add-category-btn-cancel" onClick={onClose}>
                            ✕ Anuluj
                        </button>
                        <button 
                            className={`add-category-btn-confirm ${!selectedCategoryId ? 'confirm-disabled' : ''}`}
                            onClick={handleNext}
                            disabled={!selectedCategoryId}
                        >
                            ✓ Dalej
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='add-category-overlay'>
            <div className='add-category-card edit-popup'>
                <h3>Edytuj kategorię</h3>

                <div className='add-category-input-group'>
                    <label>Nazwa</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        <div className='add-category-color-name'><span>{color}</span></div>
                    </div>   
                </div>

                <div className="delete-category-section">
                    
                    <button className="btn-delete-category" onClick={handleDelete}>
                        Usuń kategorię
                    </button>
                </div>

                <div className="add-category-modal-actions">
                    <button className="add-category-btn-cancel" onClick={() => setPopup('SELECT')}>
                        ← Wróć
                    </button>
                    <button className="add-category-btn-confirm" onClick={handleUpdate}>
                        ✓ Zapisz
                    </button>
                </div>
            </div>
        </div>
    );

};

export default EditCategoryModal;

