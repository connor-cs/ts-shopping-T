import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";
import { Row } from "react-bootstrap";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3}>
        {storeItems.map((item) => (
          <StoreItem {...item} key={item.id} />
        ))}
      </Row>
    </>
  );
}
