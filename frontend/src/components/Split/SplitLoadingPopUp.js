import "../../styles/split.scss";

const SplitLoadingPopUp = ({geminiAsked, goodQuestion, onClose}) => {

    if (!goodQuestion) return (
        <div className="loader-bg">
            <div className="wrong-question-div">
                <p className="wrong-question-text">Pytanie jest niepoprawne</p>
                <button className="split-body-submit-btn" onClick={onClose}>close</button>
            </div>
        </div>
    )
    
    if (!geminiAsked || (!geminiAsked && goodQuestion)) return null;

    return (
        <div className="loader-bg">
            <div className="loader-div">
                <div className="loader"></div>
                <p>Pimpuś dzieli twoje zadanie</p>
            </div>
        </div>
    )
}

export default SplitLoadingPopUp;

