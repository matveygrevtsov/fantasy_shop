import { Product } from "../../types";

import s from "./ProductsList.module.css";

interface Props {
  products: Product[];
  className?: string;
}

export function ProductsList({ products, className }: Props) {
  return <h2>Здесь должен отображаться список продуктов</h2>;
}
