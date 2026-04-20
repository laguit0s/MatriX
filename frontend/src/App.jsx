import { useEffect, useState } from 'react'
import api from './services/api'

function App() {
  const [mensagem, setMensagem] = useState('Carregando...')

  useEffect(() => {
    api.get('/').then(response => {
      setMensagem(response.data)
    })
  }, [])

  return (
    <div>
      <h1>ERP MatriX</h1>
      <p>Status do Backend: {mensagem}</p>
    </div>
  )
}

export default App