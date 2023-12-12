import React from 'react'
import {Route,Routes} from "react-router-dom"
import FormFill from '../Components/FormFill/FormFill'
import CardList from '../Components/History/CardList'
import FormPreview from '../Components/FormPreview/FormPreview'
import FromBuilder from '../Components/FormBuilder/FromBuilder'
import Home from '../Components/Home'
const AllRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/quizecreate" element={<FromBuilder/>}/>
      <Route path="/quize" element={<FormFill/>}/>
      <Route path="/preview/id" element={<FormPreview/>}/>
      <Route path="/history" element={<CardList/>}/>
    </Routes>
  )
}

export default AllRoutes