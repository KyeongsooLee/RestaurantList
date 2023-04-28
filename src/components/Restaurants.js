import { Card, Table } from "react-bootstrap";

export default function Restaurants(){
    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Restaurant List</Card.Title>
                    <Card.Text>Full list of restaurants. Optionally sorted by borough</Card.Text>
                </Card.Body>
            </Card>
            
        </>
    );
}