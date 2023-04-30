import { useEffect, useState } from "react";
import { ListGroup, Card, CardDeck } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";

export default function Restaurants(){
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://restaurantdb.onrender.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <Card style={{ backgroundColor: '#F5F5F5' }}>
          <Card.Body>
            <Card.Text>Loading Restaurant Data...</Card.Text>
          </Card.Body>
        </Card>
      </>
      );
    } else {
      if(restaurant){
        return (
          <>
            <Card>
              <Card.Header>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Subtitle>
                  {restaurant.address.building + " " + restaurant.address.street}
                </Card.Subtitle>
              </Card.Header>
            </Card>
            <br />
            <MapContainer 
              style={{"height": "400px"}} 
              center={[restaurant.address.coord[1], restaurant.address.coord[0]]} 
              zoom={13} 
              scrollWheelZoom={false}> 
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
              <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>            
            </MapContainer>
            <br />
            <h4>Ratings</h4>
            <hr />
            <CardDeck>
              {restaurant.grades.map((grade, index) =>
                <Card key={index} style={{ backgroundColor: '#F5F5F5' }}>
                  <Card.Header>Grade: {grade.grade}</Card.Header>
                  <ListGroup.Item>Completed: {Intl.DateTimeFormat("en-US").format(new Date(grade.date))}</ListGroup.Item>                             
                </Card> )}
            </CardDeck>
          </>
        );
      } else {
        return (
          <>
            <Card style={{ backgroundColor: '#F5F5F5' }}>
              <Card.Body>
                <Card.Text>Unable to find restaurant with id: {id}</Card.Text>
              </Card.Body>
            </Card>
          </>
        );
      }
    }
}
