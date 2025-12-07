import React, { useState } from 'react';

const AddCategoryModal = ({ isOpen, onClose, onConfirm }) => {

    const [name, setName] = useState('');
    const [color, setColor] = useState('#f8aa4bff');

    if (!isOpen) return null;

    const handleSubmit = () => {

        if (!name.trim()) {
            alert("Podaj nazwę grupy!");
            return;
        }

        onConfirm(name, color);
        setName('');
        setColor('#f8aa4bff');
        onClose();

    };


    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>


            <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                width: '300px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>

                <h3 style={{marginTop: 0}}>Nowa kategoria</h3>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9em'}}>Nazwa:</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Np. Praca, Hobby"
                        style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
                        autoFocus
                    />
                </div>


                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9em'}}>Kolor:</label>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input 
                            type="color" 
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{height: '40px', width: '60px', border: 'none', cursor: 'pointer', marginRight: '10px'}}
                        />
                        <span style={{color: '#666'}}>{color}</span>
                    </div>
                </div>


                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                    <button 
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #ccc',
                            background: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Anuluj
                    </button>
                    
                    <button 
                        onClick={handleSubmit}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            background: '#4CAF50',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Potwierdź
                    </button>
                </div>

                
            </div>


        </div>
    )

};

export default AddCategoryModal;
