import "../styles/split.scss";
import { ReactComponent as Pimpus} from "../assets/pimpus-split.svg";
import Bubbles from "../assets/split-bubbles.svg";






const Split = () => {
    return (
        <div className="split-main">
            <div className="split-header">
                <div className="split-header-title-div">
                    <p className="split-header-title">Podziel zadanie</p>
                </div>
                <div className="split-header-body">
                    <label className="split-header-label">
                        Opisz zadanie które chesz wykonać
                    </label>


                    <div className="split-header-input-div" >
                        <div className="split-header-input-button-background"></div>
                        <div className="split-header-input-div-content">
                            <div className="split-header-input-background-div">
                            <input type="text" className="split-header-input"></input>
                            </div>
                            <button className="split-header-input-button">
                                Podziel zadanie
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="split-body">
                <div className="split-body-placeholder">
                    <div className="split-body-bubbles" style={{'--bg-img': `url(${Bubbles})`}}></div>
                    <div className="split-body-pimpus-div"><Pimpus class="split-body-pimpus"></Pimpus></div>
                    
                    <p className="split-body-text">Pimpuś nie może się doczekać<br/> aby pomóc ci z zadaniem !</p>
                </div>
            </div>
        </div>
    );
};

export default Split;
