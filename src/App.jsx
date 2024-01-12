import { useEffect, useState, useRef } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import InfoLocation from './components/InfoLocation'
import CardResident from './components/CardResident'

function App() {

  const randomIdLocation = Math.floor(Math.random()*126) + 1

  const [locationIde, setLocationIde] = useState(randomIdLocation)

  const url = `https://rickandmortyapi.com/api/location/${locationIde}`

  const [ location, getLocation, isLoading, hasError] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [locationIde])

  const searchLocation = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setLocationIde(searchLocation.current.value.trim())
  }

  console.log(location)

  console.log(randomIdLocation)

  console.log(locationIde)
  
  return (
    <div className='app'>
      <h1 className='app__title'>Rick and Morty</h1>
      <form className='app__form' onSubmit={handleSubmit}>
        <input className='app__input' ref={searchLocation} type="text" />
        <button className='app__btn'>Search</button>
      </form>
      {
        isLoading
        ? <h2>Loading...</h2>
        :(
          hasError || locationIde === '0'
          ?<h2>❌ Hey! you must provide an id from 1 to 126</h2>
          :(
            
          <>
          <InfoLocation location = { location }/>
          <div className='app__card-container'>
            {
              location?.residents.map(url => (
                <CardResident 
                key = {url}
                url = {url}
                />
                ))
              }
          </div>
          </>
         )
         )
      }
      </div>
      )
}

export default App
