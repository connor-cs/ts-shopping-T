
const FORMATTER = new Intl.NumberFormat(undefined, {currency: "USD", style: "currency"})

export function formatPrice(price: number) {
  return FORMATTER.format(price)
}