import {Navigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

function WithAuth({ children }) {
    const [state, setState] = useState({redirect: false})
        
        useEffect(() => {
            fetch('/checkToken')
            .then(res => {
                if(res.status === 200){
                    setState({redirect: false})
                }else{
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                console.error(err)
                setState({redirect: true})
            })
        },[state])
    let isAuthenticated = state
    return isAuthenticated.redirect == false ? children : <Navigate to='/login' />;
    }
export default WithAuth
