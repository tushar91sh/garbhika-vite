import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MotionConfig } from 'framer-motion'
import { store } from './app/store.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* reducedMotion="user" respects the OS-level prefers-reduced-motion
            setting automatically, disabling scroll/hover animations for
            anyone who has asked for that instead of leaving content stuck
            at opacity 0 for them. */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
