import { Card, Button, Col } from "react-bootstrap";
import { ShoppingCartState, useShoppingCart } from "../context/ShoppingContext";

type StoreItemProps = {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { state, dispatch } = useShoppingCart();

  // set quantity to 0 if item is not in cart
  const quantity = getQuantityOfItemById(id, state);

  const handleIncreaseItemQuantity = () => {
    dispatch({ type: "increaseQuantity", id });
  };
  const handleDecreaseItemQuantity = () => {
    dispatch({ type: "decreaseQuantity", id });
  };
  const handleRemoveItem = () => {
    dispatch({ type: "removeFromCart", id });
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={imgUrl} style={{ objectFit: "cover" }} />
        <Card.Body className="d-flex justify-content-between flex-column">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="text-muted">{price}</Card.Text>
          <div className="m-auto">
            {quantity === 0 ? (
              <Button onClick={handleIncreaseItemQuantity}>
                + Add to Cart
              </Button>
            ) : (
              <div>
                <div className="d-flex align-items-center flex-row">
                  <Button onClick={handleDecreaseItemQuantity}>-</Button>
                  <div className="fs-3">{quantity}</div>
                  <Button onClick={handleIncreaseItemQuantity}>+</Button>
                </div>
                <Button className="danger" onClick={handleRemoveItem}>
                  Remove from cart
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

function getQuantityOfItemById(
  id: number,
  currState: ShoppingCartState
): number {
  const currItem = currState.find((item) => item.id === id);
  return currState.length === 0 || !currItem ? 0 : currItem.quantity;
}
