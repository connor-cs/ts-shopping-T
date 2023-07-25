import { Card } from "react-bootstrap";

type StoreItemProps = {
  id: number
  name: string
  img: string
  price: number
}

export function StoreItem({id, name, price, img}: StoreItemProps) {
  return (
    <Card>
      <Card.Img src={img} />
    </Card>
  )
}