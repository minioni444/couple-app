import { useState } from 'react'
import './App.css'
import { levels, neverHaveIEver, wouldYouRather, modes } from './questions'

function App() {
  const [currentMode, setCurrentMode] = useState(null) // 'levels', 'never', 'wouldYouRather'
  const [selectedItem, setSelectedItem] = useState(null) // выбранный уровень
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // Сброс состояния при переходе в режим
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

  // ===== ГЛАВНЫЙ ЭКРАН (выбор режима) =====
  if (!currentMode) {
    return (
      <div className="app">
        <header className="header">
          <h1>💕 Для нас</h1>
          <p className="subtitle">Выберите режим</p>
        </header>

        <div className="modes">
          {modes.map(mode => (
            <button 
              key={mode.id} 
              className="mode-card"
              style={{ borderColor: mode.color }}
              onClick={() => openMode(mode.id)}
            >
              <span className="mode-emoji">{mode.emoji}</span>
              <span className="mode-info">
                <span className="mode-title" style={{ color: mode.color }}>{mode.title}</span>
                <span className="mode-description">{mode.description}</span>
              </span>
              <span className="mode-arrow">→</span>
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
        
        <header className="header">
          <h1>🌡️ 8 уровней</h1>
          <p className="subtitle">От разминки до абсолютной откровенности</p>
        </header>

        <div className="levels">
          {levels.map(level => (
            <button 
              key={level.id} 
              className="level-card"
              style={{ borderColor: level.color }}
              onClick={() => openItem(level)}
            >
              <span className="level-emoji">{level.emoji}</span>
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
            <span className="finish-emoji">🎉</span>
            <h2>Все карточки пройдены!</h2>
            <p className="finish-subtext">Вы прошли все {neverHaveIEver.length} карточек</p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                🔄 Начать заново
              </button>
              <button className="btn btn-secondary" onClick={goBack}>← Назад</button>
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
              style={{ width: `${((currentIndex + 1) / neverHaveIEver.length) * 100}%`, background: '#FEAAC1' }}
            />
          </div>

          <p className="question-counter">{currentIndex + 1} / {neverHaveIEver.length}</p>

          <div className="question-card" style={{ borderColor: '#7AA2BB' }}>
            <span className="question-emoji">{card.emoji}</span>
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
            {currentIndex + 1 < neverHaveIEver.length ? 'Дальше →' : 'Завершить ✓'}
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
            <span className="finish-emoji">🏆</span>
            <h2>Все дилеммы пройдены!</h2>
            <p className="finish-subtext">Вы прошли все {wouldYouRather.length} дилемм</p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                🔄 Начать заново
              </button>
              <button className="btn btn-secondary" onClick={goBack}>← Назад</button>
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

          <div className="dilemma-card" style={{ borderColor: '#7AA2BB' }}>
            <span className="question-emoji">{dilemma.emoji}</span>
            <p className="question-level">Что ты выберешь?</p>
            <div className="dilemma-options">
              <div className="dilemma-option">
                <span className="option-letter">A</span>
                <span className="option-text">{dilemma.optionA}</span>
              </div>
              <span className="dilemma-or">ИЛИ</span>
              <div className="dilemma-option">
                <span className="option-letter">B</span>
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
            {currentIndex + 1 < wouldYouRather.length ? 'Дальше →' : 'Завершить ✓'}
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
            <span className="finish-emoji">🏆</span>
            <h2>Уровень пройден!</h2>
            <p className="finish-text">
              {selectedItem.emoji} {selectedItem.title} — {selectedItem.subtitle}
            </p>
            <p className="finish-subtext">
              Вы прошли все {selectedItem.questions.length} вопросов этого уровня
            </p>
            <div className="finish-buttons">
              <button className="btn btn-primary" onClick={() => { setCurrentIndex(0); setIsFinished(false); }}>
                🔄 Пройти заново
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                ← К уровням
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

          <div className="question-card" style={{ borderColor: selectedItem.color }}>
            <span className="question-emoji">{selectedItem.emoji}</span>
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
            {currentIndex + 1 < selectedItem.questions.length ? 'Дальше →' : 'Завершить ✓'}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default App