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
                    <div style={{display:'flex', flexDirection: 'row', justifyContent:'center', padding:'5px'}}>
                        <div style={{height: '40px', width: '40px', cursor: 'pointer', borderRadius:'50px', backgroundColor:color}}>
                        <input 
                        type="color" 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        style={{height: '50px', width: '50px', cursor: 'pointer', borderRadius:'20px', border:'none', padding:'0px', opacity:'0'}}
                        />
                        </div>
                        <div style={{paddingLeft:'10px', display:'flex', flexDirection: 'column', justifyContent:'center'}}>
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


        // <div style={{
        //     position: 'fixed',
        //     top: 0, left: 0, right: 0, bottom: 0,
        //     backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     zIndex: 1000
        // }}>


        //     <div style={{
        //         background: 'white',
        //         padding: '20px',
        //         borderRadius: '8px',
        //         width: '300px',
        //         boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        //     }}>

        //         <h3 style={{marginTop: 0}}>Nowa kategoria</h3>

        //         <div style={{marginBottom: '15px'}}>
        //             <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9em'}}>Nazwa:</label>
        //             <input 
        //                 type="text" 
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 placeholder="Np. Praca, Hobby"
        //                 style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}
        //                 autoFocus
        //             />
        //         </div>


        //         <div style={{marginBottom: '20px'}}>
        //             <label style={{display: 'block', marginBottom: '5px', fontSize: '0.9em'}}>Kolor:</label>
        //             <div style={{display: 'flex', alignItems: 'center'}}>
        //                 <input 
        //                     type="color" 
        //                     value={color}
        //                     onChange={(e) => setColor(e.target.value)}
        //                     style={{height: '40px', width: '60px', border: 'none', cursor: 'pointer', marginRight: '10px'}}
        //                 />
        //                 <span style={{color: '#666'}}>{color}</span>
        //             </div>
        //         </div>


        //         <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
        //             <button 
        //                 onClick={onClose}
        //                 style={{
        //                     padding: '8px 16px',
        //                     border: '1px solid #ccc',
        //                     background: 'white',
        //                     borderRadius: '4px',
        //                     cursor: 'pointer'
        //                 }}
        //             >
        //                 Anuluj
        //             </button>
                    
        //             <button 
        //                 onClick={handleSubmit}
        //                 style={{
        //                     padding: '8px 16px',
        //                     border: 'none',
        //                     background: '#4CAF50',
        //                     color: 'white',
        //                     borderRadius: '4px',
        //                     cursor: 'pointer'
        //                 }}
        //             >
        //                 Potwierdź
        //             </button>
        //         </div>

                
        //     </div>


        // </div>
    )

};

export default AddCategoryModal;
