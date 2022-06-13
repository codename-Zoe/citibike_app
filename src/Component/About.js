import { Card } from 'react-bootstrap';

export default function About(){
  return (
    <>
    <Card>
      <Card.Body>
        <h3>About</h3>
        <Card.Subtitle className="mb-2 text-muted">
          <h4>Nozomi Tsuchiya</h4>
        </Card.Subtitle>
        <Card.Text>
        Seneca college student / Developer
        </Card.Text>
        <Card.Link href="https://github.com/codename-Zoe">GitHub</Card.Link>
        <Card.Link href="https://www.linkedin.com/in/nozomi-tsuchiya/">LinkedIn</Card.Link>
      </Card.Body>
    </Card>
    </>
  )
}