import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'

export default function Login() {
    const [login, setLogin] = useState({email: '', password: ''})
    const history = useNavigate()

    function handleInput(event) {
        const {value, name} = event.target
        setLogin(prevState => (
            {
            ...prevState,
            [name]: value
            }
        ))
    }

    function onSubmit(event) {
        event.preventDefault()
        //redirect user if 200 http response
        fetch('/api/authenticate', {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status === 200){
                history('/')
            }else{
                const error = new Error(res.error)
                throw error
            }
        })
        .catch(err => {
            console.log(err)
            alert('error loggin in. please try again')
        })
    }

    return(
    <>
        <form onSubmit={onSubmit}>
        <h1>Login below!</h1>
        <input
            type="email"
            name="email"
            placeholder='enter email'
            value={login.email}
            onChange={handleInput}
            required
        />
        <input
            type="password"
            name="password"
            placeholder='enter password'
            value={login.password}
            onChange={handleInput}
            required
        />
        <input type="submit" value="Submit" />
        </form>  
    </>

    )
}