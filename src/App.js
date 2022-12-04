import './App.css';
import FlashcardList from './FlashcardList';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

function App() {
    const [flashcards, setFlashcards] = useState(FLASHCARD_LIST)
    const [categories, setCategories] = useState([])
    const categoryEl = useRef();
    const amountRef = useRef();
    useEffect(()=>{
        axios.get("https://opentdb.com/api_category.php").then((res)=>{
            setCategories(res.data.trivia_categories)
        })
    },[])
    useEffect(() => {
       
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        axios.get("https://opentdb.com/api.php",{
            params : {
                amount : amountRef.current.value,
                category : categoryEl.current.value
            }
        }).then((res) => {
            console.log(res.data)
            setFlashcards(res.data.results.map((questionItem, index) => {
                const answer = questionItem.correct_answer
                const options = [
                    ...questionItem.incorrect_answers.map(a => decodeString(a)),
                    decodeString(answer)
                ]
                return {
                    id: `${index}-${
                        Date.now()
                    }`,
                    question: decodeString(questionItem.question),
                    answer: decodeString(answer),
                    options: options.sort(() => Math.random() - 0.5)

                }
            }))
        })
    }

    return (
        <>
            <form className='header' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='category'>Category</label>
                    <select id='category' ref={categoryEl}>
                        {categories.map((category)=>{
                            return <option value={category.id} key={category.name}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>Number of questions</label>
                    <input type='number' id='amount' min='1' step="1" defaultValue={10} ref={amountRef}/>
                </div>
                <div className='form-group btn'>
                    <button>Generate</button>
                </div>
            </form>
            <div className='container'>
                <FlashcardList flashcards={flashcards}></FlashcardList>
            </div>
        </>


    );
}

function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value
}


const FLASHCARD_LIST = [
    {
        "id": 1,
        "category": "Legendary",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is my name?",
        "answer": "Sainath",
        "options": ["psynath", "ksainath", "cainath", "Sainath"]
    }, {
        "id": 2,
        "category": "Lengendary",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Favorite athelete?",
        "answer": "Khabib Nurmagomedov",
        "options": ["Khabib Nurmagomedov", "LeBron James", "Virat Kohli", "Cristiano Ronaldo"]
    },
]


export default App;
