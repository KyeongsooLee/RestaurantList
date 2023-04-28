import { Button, Card } from "react-bootstrap";

export default function About(){
    return (
    <Card>
      <Card.Header as="h5">About me</Card.Header>
      <Card.Body>
        <Card.Title>Kyeongsoo Lee</Card.Title>
        <Card.Text>
            I want to be a full-stack developer. This is my first small project using React.
            I love learning new things, and enjoy learning languages such as Spanish, French and things like that.
            If you want to know more about me, feel free to contact me via LinkedIn!
        </Card.Text>
        <Button variant="primary" href="https://www.linkedin.com/in/kyeongsoo-lee-012796203/">
          LinkedIn
        </Button>
      </Card.Body>
    </Card>
    )
}