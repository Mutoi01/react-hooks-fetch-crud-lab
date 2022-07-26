import React, { useState, useEffect}  from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => { setQuiz(data); })
  }
  ,[]);

  const displayQuestions= quiz.map((quest) => (
    <QuestionItem 
    key={quest.id}
    question={quest}
    onUpdate={handleUpdateItem}
    onDelete={handleDeleteItem}
    />
  ))

  function handleDeleteItem(deletedQuestion){
    const updatedQuestions = quiz.filter(question => question.id!==deletedQuestion.id);
    setQuiz(updatedQuestions);
  }

  function handleUpdateItem(updatedQuestion){
    const updatedQuestions = quiz.map(question => {
      if(question.id === updatedQuestion.id){
        return updatedQuestion;
      }
      else{
        return question;
      }
    })
    setQuiz(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
