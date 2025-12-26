import React, { useState } from "react";
import "../../styles/split.scss";

const SplitLoadingPopUp = ({geminiAsked, goodQuestion, onClose}) => {

    if (!goodQuestion) return (
        <div>
            Pytanie jest niepoprawne
            <button onClick={onClose}>close</button>
        </div>
    )
    
    if (!geminiAsked || (!geminiAsked && goodQuestion)) return null;

    

    return (
        <div className="loader-bg">
            <div className="loader-div">
                <div class="loader"></div>
                <p>Pimpuś dzieli twoje zadanie</p>
            </div>
        </div>
    )

}

export default SplitLoadingPopUp;

