import {useState, useEffect} from 'react'

export default function Secret() {
    const [secret, setSecret] = useState({message: "loading..."})

    useEffect(() => {
        fetch('/api/secret')
        .then(res => res.text())
        .then(res => setSecret({message: res}))             
    },[secret])
    return(
        <div>
            <h1>This is the secret</h1>
            <p>{secret.message}</p>
        </div>
    )
}