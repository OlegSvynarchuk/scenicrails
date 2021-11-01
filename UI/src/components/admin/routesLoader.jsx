import React, {useState, useEffect} from 'react'
import axios from 'axios'


export default function RoutesLoader() {
    const [fileName, setFilename] = useState('')
    const [routes, setRoutes] = useState([])
    const [countries, setCountries] = useState('')
    
    const onFileLoadSubmit = (e) => {
        let fileName = e.target.value.split("\\")[2]
        setFilename(fileName)
    }

    const handleaddRoute = () => {
        axios({
            method: 'post',
            url: '/api/route',
            data: {
             routeName: fileName
            }
          }).then(res => setRoutes(routes => [...routes, res.data ]));
       
    }

    useEffect(() => {
        axios.get('/api/getroutes').then(res => setRoutes(res.data))
    }, [])


  
    
    return (
        <div>
            <h1>Add a route to database</h1>
            <fieldset>
                 <label htmlFor='country'>Specify route's country('s')</label>
            <input type='text' id='country' onChange={e => setCountries(e.target.value)} value={countries}></input>
            </fieldset>
            <fieldset>
            <label htmlFor='file'>Pick a file with route info</label>
            <input type='file' id='file'
                    onChange={onFileLoadSubmit}
            ></input>
            </fieldset>
           
            <button onClick={handleaddRoute}>
                insert route to database
            </button>
            {routes.length > 0 &&  <ul>
                {routes.map(route => {
                return(
                   <li key={route._id}>{route.name}</li> 
                )
                })
        }</ul>}
        </div>
    )
}
