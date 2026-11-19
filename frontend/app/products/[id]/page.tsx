
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/products/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return await response.json();
  } catch (error) {
    console.log("Product details error:", error);
    return null;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className={styles.container}>
        <p>Product not found.</p>
        <Link href="/">Back to Home</Link>
      </main>
    );
  }

  const name = product.descriptions?.["1"]?.name || "Product";
  const price = product.calculated_price || product.base_price;

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <div className={styles.productDetails}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(max-width: 600px) 100vw, 450px"
            className={styles.productImage}
          />
        </div>

        <div className={styles.info}>
          <h1>{name}</h1>

          <h2>
            {product.currency} {price}
          </h2>

          <p>SKU: {product.sku}</p>
          <p>Available Quantity: {product.quantity}</p>

          <p className={styles.description}>
            {product.descriptions?.["1"]?.name
              ? product.descriptions["1"].name
              : "Product details"}
          </p>
        </div>
      </div>
    </main>
  );
}
