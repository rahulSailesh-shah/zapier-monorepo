import Login from 'screens/Login'

function App() {
  const handleClick = async () => {
    try {
      await fetch('http://localhost:8000/api/zap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // This is the correct way to include credentials
        body: JSON.stringify({ test: 'test' })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Login />
      <button onClick={handleClick}>Check</button>
    </div>
  )
}

export default App
