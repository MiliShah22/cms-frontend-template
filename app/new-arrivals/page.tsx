import { PRODUCTS } from "@/lib/products";
import NewArrivalsClient from "./NewArrivalsClient";

export default function NewArrivalsPage() {
  const newProducts = PRODUCTS.filter((p) => p.isNew || p.badge === "new");
  return <NewArrivalsClient products={newProducts} />;
}
