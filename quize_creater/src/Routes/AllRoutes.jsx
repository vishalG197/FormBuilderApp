import React from 'react'
import {Route,Routes} from "react-router-dom"
import FormFill from '../Components/FormFill/FormFill'
// import CardList from '../Components/History/CardList'
// import FormPreview from '../Components/FormPreview/FormPreview'
import FromBuilder from '../Components/FormBuilder/FromBuilder'
import Home from '../Components/Home'
import QuizComponent from '../Components/FormBuilder/QuizeComponent'
import CategoryQuestions from "./TestComponent"
const AllRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/quizecreate" element={<FromBuilder/>}/>
     <Route path="/quize" element={<QuizComponent/>}/>
     <Route path="/formfill/:id" element={<FormFill/>}/>
     <Route path="/test" element={<CategoryQuestions/>}/>
       {/* <Route path="/preview/id" element={<FormPreview/>}/> */}
      {/* <Route path="/history" element={<CardList/>}/> */}
    </Routes>
  )
}

export default AllRoutes
