import { useEffect, useState } from "react";
import { Card, Pagination, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Restaurants(){
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const navigate = useNavigate();

    let location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    let borough = urlParams.get("borough");
    
    useEffect(()=>{ 
        let url;
        if (borough) {
        url = `https://restaurantdb.onrender.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`;
        } else {
         url = `https://restaurantdb.onrender.com/api/restaurants?page=${page}&perPage=${perPage}`;
        }
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setRestaurants(data);
        })
        .catch((error) => console.log(error));
    }, [page, borough]);

    const previousPage = () => {
        if (page > 1)
            setPage(page - 1);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    if (restaurants === null){
        return (
            <>
              <Card style={{ backgroundColor: '#F5F5F5' }}>
                <Card.Body>
                  <Card.Text>Loading Restaurants...</Card.Text>
                </Card.Body>
              </Card>
            </>
        );
    } 
    
    if(restaurants.length === 0){

        return (
            <>
                <Card style={{ backgroundColor: '#F5F5F5' }}>
                    <Card.Body>
                        <Card.Text>No Restaurants Found</Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Restaurant List</Card.Title>
                    <Card.Text>Full list of restaurants. Optionally sorted by borough</Card.Text>
                </Card.Body>
            </Card>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Borough</th>
                    <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant)=>(
                        <tr onClick={()=>{ navigate(`/restaurant/${restaurant._id}`)}}
                        key={restaurant._id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.address.building} {restaurant.address.street}</td>
                            <td>{restaurant.borough}</td>
                            <td>{restaurant.cuisine}</td>
                        </tr>
                    ))}
                </tbody> 
            </Table>
            <Pagination>
                <Pagination.Prev onClick={() => previousPage()} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => nextPage()} />
            </Pagination>
        </>
    );
}