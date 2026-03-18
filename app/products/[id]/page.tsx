import { PRODUCTS } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props) {
  const product = PRODUCTS.find((p) => p.id === Number(params.id));
  return {
    title: product ? `${product.name} — LUXE` : "Product — LUXE",
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.id === Number(params.id));
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
