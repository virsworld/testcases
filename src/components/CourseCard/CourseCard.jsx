import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ courseName, contributions, coursePath}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(coursePath);
  }
  return (
    <div
    className="border border-secondary rounded-lg p-6 
    max-w-sm mx-auto bg-primary shadow-md cursor-pointer
    transform transition-transform duration-1
    hover:scale-105 hover:shadow-lg hover:bg-primary-dark"
    onClick={handleCardClick}
    >
      <h2
      className="text-xl font-semibold text-secondary mb-2"
      >
      {courseName}
      </h2>
      <p className='text-secondary'>
        Contributions: <span className='font-bold text-accent'>{contributions / 2}</span>
      </p>
    </div>
  )
}

export default CourseCard

