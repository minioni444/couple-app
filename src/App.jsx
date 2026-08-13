import { useState } from 'react'
import './App.css'
import { categories } from './questions'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // Если категория не выбрана — показываем главный экран
  if (!selectedCategory) {
    return (
      <div className="app">
        <header className="header">
          <h1>💕 Для нас</h1>
          <p className="subtitle">Вопросы, которые сближают</p>
        </header>

        <div className="categories">
          {categories.map(category => (
            <button 
              key={category.id} 
              className="category-card"
              style={{ background: category.color }}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentQuestionIndex(0)
                setIsFinished(false)
              }}
            >
              <span className="emoji">{category.emoji}</span>
              <span className="category-info">
                <span className="category-title">{category.title}</span>
                <span className="category-description">{category.description}</span>
                <span className="question-count">{category.questions.length} вопросов</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Если вопросы закончились — показываем экран завершения
  if (isFinished) {
    return (
      <div className="app">
        <div className="finish-screen">
          <span className="finish-emoji">🎉</span>
          <h2>Вы прошли все вопросы!</h2>
          <p className="finish-text">
            {selectedCategory.emoji} {selectedCategory.title}
          </p>
          <p className="finish-subtext">Это было отличное время, чтобы узнать друг друга лучше</p>
          
          <div className="finish-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setCurrentQuestionIndex(0)
                setIsFinished(false)
              }}
            >
              🔄 Начать заново
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setSelectedCategory(null)}
            >
              ← К категориям
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Экран с вопросами
  const currentQuestion = selectedCategory.questions[currentQuestionIndex]

  return (
    <div className="app">
      <div className="question-screen">
        <button 
          className="back-btn"
          onClick={() => setSelectedCategory(null)}
        >
          ←
        </button>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100}%`,
              background: selectedCategory.color 
            }}
          />
        </div>

        <p className="question-counter">
          {currentQuestionIndex + 1} / {selectedCategory.questions.length}
        </p>

        <div className="question-card" style={{ borderColor: selectedCategory.color }}>
          <span className="question-emoji">{selectedCategory.emoji}</span>
          <h2 className="question-text">{currentQuestion}</h2>
        </div>

        <button 
          className="btn btn-primary next-btn"
          onClick={() => {
            if (currentQuestionIndex + 1 < selectedCategory.questions.length) {
              setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else {
              setIsFinished(true)
            }
          }}
        >
          {currentQuestionIndex + 1 < selectedCategory.questions.length 
            ? 'Дальше →' 
            : 'Завершить ✓'}
        </button>
      </div>
    </div>
  )
}

export default App