import { Card } from "react-bootstrap";

type StoreItemProps = {
  id: number;
  name: string;
  img: string;
  price: number;
};

export function StoreItem({ id, name, price, img }: StoreItemProps) {
  return (
    <Card key={id}>
      <Card.Img variant="top" src={img} style={{objectFit: "cover"}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
