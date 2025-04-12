import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'

// Redux
import { Provider } from 'react-redux'
import store from './redux/store.js'  // Adjust path if different

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
