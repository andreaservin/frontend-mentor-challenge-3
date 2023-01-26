import './App.css'
import { Dice5Fill } from 'react-bootstrap-icons'
import {
  Alert,
  Button,
  Card,
  OverlayTrigger,
  Spinner,
  Tooltip,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const API_URL = 'https://api.adviceslip.com/advice' // this must be into .env file
  const [advice, setAdvice] = useState(null)
  const [error, setError] = useState(null)

  const handleGetAdvice = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setAdvice(response.data.slip)
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  useEffect(() => {
    handleGetAdvice()
  }, [])

  return (
    <div className='App'>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Card style={{ width: '24rem', backgroundColor: 'hsl(217, 19%, 24%)' }}>
        {advice ? (
          <Card.Body className='text-center'>
            <Card.Subtitle className='mb-3 subcolor'>
              A D V I C E # {advice.id}
            </Card.Subtitle>
            <Card.Text className='advice'>"{advice.advice}"</Card.Text>
          </Card.Body>
        ) : (
          <div className='spinner'>
            <Spinner size='sm' animation='grow' variant='light' />
            <Spinner size='sm' animation='grow' variant='success' />
            <Spinner size='sm' animation='grow' variant='light' />
          </div>
        )}
        <Card.Footer className='d-flex justify-content-center'>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip>Reload</Tooltip>}
          >
            <Button
              className='d-flex justify-content-center'
              variant='success'
              onClick={handleGetAdvice}
            >
              <Dice5Fill size={18} color='black' />
            </Button>
          </OverlayTrigger>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default App
