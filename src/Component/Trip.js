import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Button, Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Trip(){

  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let {id} = useParams();

  useEffect(()=>{
    setLoading(true);
    fetch(`https://lit-cliffs-32912.herokuapp.com/api/trips/${id}`).then(res=>res.json()).then(data=>{
    if(data.hasOwnProperty("_id")){
        setTrip(data);
      }else{
        setTrip(null);
      }
      setLoading(false);
    })
  },[id]);

  function handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    setTrip(data => {
        return {...data, [name]:value}; 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://lit-cliffs-32912.herokuapp.com/api/trips/${id}`,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    }).then(res=>res.json()).then(()=>{
      navigate(`/trips`);
    });
  }

  if(loading){
    return (
      <>
        <p>Loading Trip data...</p>
      </>
    )
  } else{
    if(trip){
      return (
        <>
        <Card>
          <Card.Body>
            <h4>Bike: {trip.bikeid} &#40;{trip.usertype}&#41;</h4>
            {trip["start station name"]} - {trip["end station name"]}
          </Card.Body>
        </Card>
    
        <MapContainer style={{ "height": "400px" }} center={[trip["start station location"].coordinates[1], trip["start station location"].coordinates[0]]} zoom={15}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[trip["start station location"].coordinates[1], trip["start station location"].coordinates[0]]}>
              <Tooltip permanent direction='right'>Start: {trip["start station name"]}</Tooltip>
            </Marker>
            <Marker position={[trip["end station location"].coordinates[1], trip["end station location"].coordinates[0]]}>
              <Tooltip permanent direction='right'>End: {trip["end station name"]}</Tooltip>
            </Marker>
        </MapContainer>
        <br />
        <Form>
        <Form.Group>
            <Form.Label>Bike ID</Form.Label>
            <Form.Control type="number" name="bikeid" value={trip.bikeid} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Birth Year</Form.Label>
            <Form.Control type="number" name="birth year" value={trip["birth year"]} onChange={handleChange} />
        </Form.Group>
        <Form.Check
            type="radio"
            label="Subscriber"
            name="usertype"
            value="Subscriber"
            id="subscriber"
            checked={trip.usertype === "Subscriber"}
            onChange={handleChange}
        />
        <Form.Check
            type="radio"
            label="Customer"
            name="usertype"
            value="Customer"
            id="customer"
            checked={trip.usertype === "Customer"}
            onChange={handleChange}
        />
        <hr />
        <Link to="/Trips" className="btn btn-secondary float-right ml-1">Back to Trips</Link>
        <Button type="submit" className="float-right" onClick={handleSubmit}>Update Trip User</Button>
        </Form>     
        </>
      )
    } else{
      return (
        <>
        <Card>
          <Card.Body>
            <Card.Text>
            Unable to find Trip with id: {id}
            </Card.Text>
          </Card.Body>
        </Card>
        </>
      )
    }
  }
}