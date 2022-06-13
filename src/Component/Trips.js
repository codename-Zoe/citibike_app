import { useState, useEffect } from 'react';
import { Badge, Card, Pagination, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Trips(){

  const perPage = 10;
  const [trips, setTrips] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    fetch(`https://lit-cliffs-32912.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`).then(res=>res.json()).then(result=>{
      setTrips(result);
      setPage(page);
      setLoading(false);
    })
  },[page]);

  function previousPage(){
    if(page > 1){
      setPage(page - 1);
    }
  }

  function nextPage(){
    setPage(page + 1);
  }

  if(loading){
    return(
      <>
        <p>Loading Trips...</p>
      </>
    );
  } else{
      return (
        <>
          <Card>
            <Card.Body>
              <h3>Trips List</h3>
              <p>Full list of Citibike Trips.</p>
              <div className='float-right'>
                <Badge bg="Subscribers" className='Subscriber'>Subscribers</Badge>
                <Badge bg="Customer" className='Customer'>Customer</Badge>
              </div>
            </Card.Body>
          </Card>

          <Table hover>
            <thead>
              <tr>
                <th>Bike ID</th>
                <th>Start Station</th>
                <th>End Station</th>
                <th>Duration &#40;Minutes&#41;</th>
              </tr>
            </thead>
            <tbody>
              {
                trips.map((trip, index)=>(
                  <tr key={index} className={trip.usertype} onClick={()=>{navigate(`/trip/${trip._id}`)}}>
                    <td>{trip.bikeid}</td>
                    <td>{trip["start station name"]}</td>
                    <td>{trip["end station name"]}</td>
                    <td>{(trip.tripduration / 60).toFixed(2)}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage}/>
            <Pagination.Item >{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
          </Pagination>
        </>
      )
    }
}