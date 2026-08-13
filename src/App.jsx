import { useState } from 'react'
import './App.css'
import { levels, neverHaveIEver, wouldYouRather, modes } from './questions'
import mainPhoto from './assets/main.png'

function App() {
  const [currentMode, setCurrentMode] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const openMode = (modeId) => {
    setCurrentMode(modeId)
    setSelectedItem(null)
    setCurrentIndex(0)
    setIsFinished(false)
  }

  const openItem = (item) => {
    setSelectedItem(item)
    setCurrentIndex(0)
    setIsFinished(false)
  }

  const goBack = () => {
    if (selectedItem) {
      setSelectedItem(null)
      setCurrentIndex(0)
      setIsFinished(false)
    } else {
      setCurrentMode(null)
    }
  }

  // ===== ГЛАВНАЯ СТРАНИЦА =====
  if (!currentMode) {
    return (
      <div className="app">
        <h1 className="main-title">ВОПРОСЫ ДЛЯ СБЛИЖЕНИЯ</h1>
        <p className="main-subtitle">с любовью для любви</p>

        {/* Овалы */}
<div className="photo-container">
  <div className="oval oval-back"></div>
  <div className="oval oval-middle"></div>
  <div className="oval oval-front"></div>
</div>

{/* Фото */}
<div className="photo-container-photo">
  <img src={mainPhoto} alt="Главное фото" className="main-photo" />
</div>
        

        {/* Правила */}
        <div className="rules-section">
          <h2 className="rules-title">Правила</h2>
          {/* Здесь будут правила */}
        </div>

        {/* Режимы */}
        <div className="modes-section">
          {modes.map(mode => (
            <button 
              key={mode.id} 
              className="mode-card"
              onClick={() => openMode(mode.id)}
            >
              <span className="mode-title">{mode.title}</span>
              <span className="mode-description">{mode.description}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ===== РЕЖИМ "8 УРОВНЕЙ" — СПИСОК УРОВНЕЙ =====
  if (currentMode === 'levels' && !selectedItem) {
    return (
      <div className="app">
        <button className="back-btn" onClick={goBack}>←</button>
        
        <h1 className="page-title">8 уровней</h1>
        <p className="page-subtitle">От разминки до абсолютной откровенности</p>

        <div className="levels">
          {levels.map(level => (
            <button 
              key={level.id} 
              className="level-card"
              style={{ borderColor: level.color }}
              onClick={() => openItem(level)}
            >
              <span className="level-info">
                <span className="level-title" style={{ color: level.color }}>
                  {level.title} — {level.subtitle}
                </span>
                <span className="level-description">{level.description}</span>
                <span className="level-badges">
                  <span className="badge" style={{ background: level.color }}>
                    {level.difficulty}
                  </span>
                  <span className="badge badge-questions">
                    {level.questions.length} вопросов
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ===== РЕЖИМ "Я БЫ НИКОГДА" =====
  if (currentMode === 'never') {
    if (isFinished) {
      return (
        <div className="app">
          <div className="finish-screen">
            <h2>Всё пройдено!</h2>
            <p className="finish-subtext">Вы прошли все {neverHaveIEver.length} карточек</p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                Начать заново
              </button>
              <button className="btn btn-secondary" onClick={goBack}>Назад</button>
            </div>
          </div>
        </div>
      )
    }

    const card = neverHaveIEver[currentIndex]

    return (
      <div className="app">
        <div className="question-screen">
          <button className="back-btn" onClick={goBack}>←</button>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / neverHaveIEver.length) * 100}%`, background: '#7AA2BB' }}
            />
          </div>

          <p className="question-counter">{currentIndex + 1} / {neverHaveIEver.length}</p>

          <div className="question-card">
            <p className="question-level">Я бы никогда не...</p>
            <h2 className="question-text">{card.text}</h2>
          </div>

          <button 
            className="btn btn-primary next-btn"
            onClick={() => {
              if (currentIndex + 1 < neverHaveIEver.length) {
                setCurrentIndex(currentIndex + 1)
              } else {
                setIsFinished(true)
              }
            }}
          >
            {currentIndex + 1 < neverHaveIEver.length ? 'Дальше' : 'Завершить'}
          </button>
        </div>
      </div>
    )
  }

  // ===== РЕЖИМ "ЧТО ТЫ ВЫБЕРЕШЬ" =====
  if (currentMode === 'wouldYouRather') {
    if (isFinished) {
      return (
        <div className="app">
          <div className="finish-screen">
            <h2>Всё пройдено!</h2>
            <p className="finish-subtext">Вы прошли все {wouldYouRather.length} дилемм</p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                Начать заново
              </button>
              <button className="btn btn-secondary" onClick={goBack}>Назад</button>
            </div>
          </div>
        </div>
      )
    }

    const dilemma = wouldYouRather[currentIndex]

    return (
      <div className="app">
        <div className="question-screen">
          <button className="back-btn" onClick={goBack}>←</button>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / wouldYouRather.length) * 100}%`, background: '#7AA2BB' }}
            />
          </div>

          <p className="question-counter">{currentIndex + 1} / {wouldYouRather.length}</p>

          <div className="dilemma-card">
            <p className="question-level">Что ты выберешь?</p>
            <div className="dilemma-options">
              <div className="dilemma-option">
                <span className="option-letter">А</span>
                <span className="option-text">{dilemma.optionA}</span>
              </div>
              <span className="dilemma-or">или</span>
              <div className="dilemma-option">
                <span className="option-letter">Б</span>
                <span className="option-text">{dilemma.optionB}</span>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-primary next-btn"
            onClick={() => {
              if (currentIndex + 1 < wouldYouRather.length) {
                setCurrentIndex(currentIndex + 1)
              } else {
                setIsFinished(true)
              }
            }}
          >
            {currentIndex + 1 < wouldYouRather.length ? 'Дальше' : 'Завершить'}
          </button>
        </div>
      </div>
    )
  }

  // ===== РЕЖИМ "8 УРОВНЕЙ" — ВОПРОСЫ =====
  if (currentMode === 'levels' && selectedItem) {
    if (isFinished) {
      return (
        <div className="app">
          <div className="finish-screen">
            <h2>Уровень пройден!</h2>
            <p className="finish-text">
              {selectedItem.title} — {selectedItem.subtitle}
            </p>
            <p className="finish-subtext">
              Вы прошли все {selectedItem.questions.length} вопросов
            </p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                Пройти заново
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                К уровням
              </button>
            </div>
          </div>
        </div>
      )
    }

    const question = selectedItem.questions[currentIndex]

    return (
      <div className="app">
        <div className="question-screen">
          <button className="back-btn" onClick={() => setSelectedItem(null)}>←</button>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentIndex + 1) / selectedItem.questions.length) * 100}%`,
                background: selectedItem.color 
              }}
            />
          </div>

          <p className="question-counter">
            {currentIndex + 1} / {selectedItem.questions.length}
          </p>

          <div className="question-card">
            <p className="question-level">{selectedItem.title} — {selectedItem.subtitle}</p>
            <h2 className="question-text">{question}</h2>
          </div>

          <button 
            className="btn btn-primary next-btn"
            onClick={() => {
              if (currentIndex + 1 < selectedItem.questions.length) {
                setCurrentIndex(currentIndex + 1)
              } else {
                setIsFinished(true)
              }
            }}
          >
            {currentIndex + 1 < selectedItem.questions.length ? 'Дальше' : 'Завершить'}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default App