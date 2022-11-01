import './App.css';
import FlashcardList from './FlashcardList';
import React, {useState} from 'react';

function App() {
  const [flashcards, setFlashcards] = useState(FLASHCARD_LIST)
  return (
    <FlashcardList flashcards = {flashcards} ></FlashcardList>
  );
}



const FLASHCARD_LIST = 
[
    {
        "id": 1,
        "category": "Art",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Which time signature is commonly known as &ldquo;Cut Time?&rdquo;",
        "answer": "2/2",
        "options": [
            "4/4",
            "6/8",
            "3/4",
            "2/2"
        ]
    },
    {
        "id" : 2, 
        "category": "Science: Computers",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Which internet company began life as an online bookstore called &#039;Cadabra&#039;?",
        "answer": "Amazon",
        "options": [
            "eBay",
            "Overstock",
            "Shopify",
            "Amazon"
        ]
    },
]


export default App;
