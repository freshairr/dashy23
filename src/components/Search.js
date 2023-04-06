import {useState} from 'react'
import {Button, Input } from '@mantine/core';

export default function Search(props) {
    const key = "c780a91248e3be3e73863ef5b1be9e7590202068"
    //autocomplete: https://api.geocodify.com/v2/autocomplete?api_key=c780a91248e3be3e73863ef5b1be9e7590202068&q=900

    const googleKey="AIzaSyD79sw00Kx6064Osv6wma3Wf6JiAZCE9sA"
    const googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=60607&key=AIzaSyD79sw00Kx6064Osv6wma3Wf6JiAZCE9sA"
    
    const [zipcode, setZipcode] = useState("")

    async function getLocation(event) {
        event.preventDefault();
        console.log("captured zip code", zipcode)
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyD79sw00Kx6064Osv6wma3Wf6JiAZCE9sA`)
        const data = await res.json()
        return data.results.map(item => (
            props.setCoord(item.geometry.location)
        ))
    }

    function handleChange(event) {
        setZipcode(event.target.value)
    }

    return (
    <>
    <form onSubmit={getLocation}>
        <Input type="search" maxLength="5" placeholder="enter zipcode" onChange={handleChange}></Input> 
        <Button type="submit" variant="light" color="blue" style={{ marginTop: 14 }}>
        {/* <Input type="submit" value={props.value}></Input>  */}
        Set Location
        </Button>
    </form>
    </>
    )
}