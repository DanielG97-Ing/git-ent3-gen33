import { useState } from "react"
import axios from "axios"

const useFetch = (url) => {

  const [infoApi, setInfoApi] = 
  useState()

  const [isLoading, setIsLoading] = useState(true)

  const [hasError, setHasError] = useState(false)

  const getApi = () => {
    axios.get(url)
        .then(res => {
            setInfoApi(res.data)
            setHasError(false)
        })
        .catch(e => {
            console.log(e)
            setHasError(true)
        })
        .finally(() => setIsLoading(false))
  }

  return [ infoApi, getApi, isLoading, hasError ]

}
export default useFetch