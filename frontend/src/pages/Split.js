import "../styles/split.scss";
import img from "../assets/pimpus_happy_anim.webp";
import { ReactComponent as Ellipse} from "../assets/Ellipse.svg";
import Bubbles from "../assets/split-bubbles.svg";
import { useTaskData } from "../hooks/UseTaskData";
import { useState, useEffect, useMemo  } from "react";
import SplitTaskListContainer from "../components/Split/SplitTaskListContainer";
import AddCategoryModal from "../components/Todo/AddCategoryModal";
import { createCategory } from "../api/TaskApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SplitLoadingPopUp from "../components/Split/SplitLoadingPopUp";
import SplitCategoriesPopUp from "../components/Split/SplitCategoriesPopUp";
import SplitCalendar from "../components/Split/SplitCalendar";
import { ReactComponent as Chevron} from "../assets/Chevron right.svg";
import { getTaskDateName, parseEuropeanDate } from "../functions/TasksHelpers"


const Split = () => {

    // Loading tasks data from database
    const {
        tasks,
        categories,
        isLoading,
        error,
        addCategoryLocal
    } = useTaskData();

    // 1. Stan dla wartości inputu
    const [taskDescription, setTaskDescription] = useState('');
    // 2. Stan dla wyniku (opcjonalnie, by wyświetlić go w SplitBodyContent)
    const [geminiAsked, setGeminiAsked] = useState(false);
    const [goodQuestion, setGoodQuestion] = useState(true);
    const [geminiResult, setGeminiResult] = useState('');
    const [taskSplitted, setTaskSplitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [splitAccepted, setSplitAccepted] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [outSelectedDate, setOutSelectedDate] = useState(new Date());
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectAllTasks, setSelectAllTasks] = useState(false);

    // console.log(geminiResult);
    console.log(selectedCategory);

    const handleConfirmAddCategory = async (name, color) => {

        try {
            // API
            const newCategoryFromBackend = await createCategory({ name, color });
            addCategoryLocal(newCategoryFromBackend);

            //TEMP
            alert("DOdano grupę");

        } catch (e) {
            console.error(e);
        }

        setIsModalOpen(false);
    }

    const handleCheck = () => {
        if(selectAllTasks) {
            setSelectAllTasks(false);
            setSelectedTasks([]);
        } else {
            setSelectAllTasks(true);
            setSelectedTasks(geminiResult);
        }
         // Odwracamy wartość (true -> false, false -> true)  
    };

    const onClickPrzypisz = () => {
        const selectedIds = selectedTasks.map(t => t.id);

        // 2. Aktualizujemy stan RAZ, przelatując przez wszystkie taski
        setGeminiResult(geminiResult => {
            return geminiResult.map(task => {
                // Czy ten task jest na liście zaznaczonych?
                if (selectedIds.includes(task.id)) {
                    return { ...task, date: outSelectedDate }; // Zmieniamy datę
                }
                // WAŻNE: Jeśli nie zmieniamy, zwracamy stary obiekt!
                return task; 
            });
        });

        setSelectedTasks([]);
    }

    // Inicjalizacja Gemini (Klucz API najlepiej trzymać w .env)
    // const genAI = new GoogleGenerativeAI("");
    const genAI = new GoogleGenerativeAI("AIzaSyA1UoiLF7bVwrKgw1sgx-fo_E7KDmbakgA");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const SplitTaskButtonClicked = async () => {
    if (!taskDescription) return;   

    try {
        setGeminiAsked(true);
        // const prompt1 = `
        //     Czy zadanie "${taskDescription}" jest poprawne politycznie, publicznie, socjalnie, etnicznie, humanitarnie, historycznie, etycznie?
        //     Zwróć odpowiedź WYŁĄCZNIE jako jedno słowo "TAK" lub "NIE".
        // `;
        // const result1 = await model.generateContent(prompt1);
        // const responseText1 = result1.response.text();
        

        // console.log(responseText1);
        // if(responseText1 == "NIE"){
        //     setGeminiAsked(false);
        //     setGoodQuestion(false);
        // }

        if(true/*responseText1 == "TAK"*/ ){
            // Przygotowujemy instrukcję z Twoim formatem
            const prompt = `
                Rozbij zadanie "${taskDescription}" na kilka (do 12) mniejszych kroków.
                Zwróć odpowiedź WYŁĄCZNIE jako czysty tablicowy format JSON.
                Każdy obiekt w tablicy musi mieć pola:
                - "id": numer kroku
                - "name": krótka nazwa kroku
                - "day": użyj dzisiejszej daty (${new Date().toISOString().split('T')[0]})
                - "priority": wybierz jedną z wartości: 'VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'
                - "timeNeeded": wyestymuj czas wykonywania zadania w minutach
                - "date": data wykonania zadania ZOSTAW PUSTE
                
                Format wyjściowy:
                [
                {"id": ..., "name": "...", "day": "...", "priority": "...", "timeNeeded": ..., "date": null},
                ...
                ]
            `;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            
            // Oczyszczanie tekstu (Gemini czasem dodaje ```json ... ```)
            const cleanedJson = responseText.replace(/```json|```/g, "").trim();
            const newSubTasks = JSON.parse(cleanedJson);

            console.log("Wygenerowane podzadania:", newSubTasks);

            setTaskSplitted(true);
            setGeminiResult(newSubTasks);
            setGeminiAsked(false);
        }

    } catch (error) {
        console.error("Błąd przetwarzania JSON:", error);
        setGeminiAsked(false);
    }
};   

    return (    
            !calendarVisible ? (
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
                                    <form
                                            onSubmit={(e) => {
                                            e.preventDefault(); // <-- prevent the default form action
                                            SplitTaskButtonClicked();
                                            }}
                                        >
                                    <input type="text" id="split-header-input" className="split-header-input"
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}></input>
                                    </form>
                                </div>
                                <button id="split-header-input-button" className="split-header-input-button" onClick={SplitTaskButtonClicked}>
                                    Podziel zadanie
                                </button>
                            </div>
                        </div>
                    </div>
                </div>           

                {taskSplitted ? (
                    <>
                    <div className="split-body splitted">
                        <SplitTaskListContainer 
                            splittedTasks={geminiResult} 
                            setGeminiAsked={setGeminiAsked} 
                            isCalendarTasks={false} 
                        />
                    </div>
                    <div className="split-body-submit-div">
                        <button className="split-body-submit-btn" onClick={() => setSplitAccepted(true)}>Zaakceptuj Podział</button>
                    </div>
                    </>

                ) : (
                    <div className="split-body">
                        <div className="split-body-placeholder">
                            <div className="split-body-bubbles" style={{'--bg-img': `url(${Bubbles})`}}></div>
                            <div className="split-body-pimpus-div">
                                <div className="split-body-pimpus-shadow-div">
                                    <img src={img} className="split-body-pimpus"></img>
                                    <Ellipse className="split-body-pimpus-ellipse"></Ellipse>
                                </div>
                            </div>
                            <p className="split-body-text">Pimpuś nie może się doczekać<br/> aby pomóc ci z zadaniem !</p>
                        </div>
                    </div>
                )}

                <SplitLoadingPopUp geminiAsked={geminiAsked} goodQuestion={goodQuestion} onClose={() => setGoodQuestion(true)}></SplitLoadingPopUp>
                <SplitCategoriesPopUp categories={categories} 
                    splitAccepted={splitAccepted} 
                    setSplitAccepted={setSplitAccepted} 
                    onAddCategoryClick={() => setIsModalOpen(true)} 
                    handleConfirmAddCategory={handleConfirmAddCategory}
                    setCalendarVisible={setCalendarVisible}
                    setSelectedCategory={setSelectedCategory}></SplitCategoriesPopUp>
                <AddCategoryModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmAddCategory}
                /> 
            </div >
            ) :
            <div className="split-main-calendar">
                <div className="split-calendar-sidebar-bg">
                    <div className="split-calendar-sidebar-header">
                        <div className="split-calendar-sidebar-header-top">
                            <Chevron className="split-calendar-sidebar-header-back" onClick={() => setCalendarVisible(false)}></Chevron>
                            <div className="split-calendar-sidebar-header-right">
                                <p className='split-calendar-sidebar-text-zadania'>Zadania</p>
                                <p className='split-calendar-sidebar-text-pod'>do przypisania</p>
                            </div>
                            <Chevron className="split-calendar-sidebar-header-back none"></Chevron>
                        </div>
                        
                        <div className="split-calendar-checkbox-div">
                            <div className="container">
                                <input type="checkbox" className="checkbox" id="checkbox" checked={selectAllTasks}/>
                                <label className="switch" for="checkbox" onClick={handleCheck} >
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <span className='split-calendar-sidebar-text-checkbox'>Wszystkie zadania</span>
                        </div>
                        
                    </div>                    
                    <SplitTaskListContainer 
                        splittedTasks={geminiResult} 
                        setGeminiAsked={setGeminiAsked}
                        isCalendarTasks={true} 
                        selectedTasks={selectedTasks}
                        setSelectedTasks={setSelectedTasks}
                        selectedCategory={selectedCategory}
                        selectAllTasks={selectAllTasks}
                    />
                    <div className="split-add-category-modal-actions">
                        <button className="add-category-btn-confirm" onClick={onClickPrzypisz}>Przypisz {getTaskDateName(outSelectedDate)}</button>
                    </div>
                </div>
                
                <SplitCalendar setOutSelectedDate={setOutSelectedDate} tasks={geminiResult} selectedCategory={selectedCategory}></SplitCalendar>
            </div>
    );
};

export default Split;
