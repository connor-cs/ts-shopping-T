import { Card, Button } from "react-bootstrap";

type StoreItemProps = {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const quantity = 2;
  return (
    <Card key={id}>
      <Card.Img variant="top" src={imgUrl} style={{ objectFit: "cover" }} />
      <Card.Body className="d-flex justify-content-between flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-muted">{price}</Card.Text>
        <div className="m-auto">
          {quantity === 0 ? (
            <Button>+ Add to Cart</Button>
          ) : (
            <div>
              <div className="d-flex align-items-center flex-row">
                <Button>-</Button>
                <div className="fs-3">{quantity}</div>
                <Button>+</Button>
              </div>
              <Button className="danger">Remove from cart</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
