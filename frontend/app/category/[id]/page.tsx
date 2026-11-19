
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

async function getProducts(id: string) {
    try {
        const response = await fetch(
            `${process.env.API_URL}/api/categories/${id}/products`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        return data.data?.products || [];
    } catch (error) {
        console.log("Product fetch error:", error);
        return [];
    }
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products = await getProducts(id);

    return (
        <main className={styles.container}>
            <h1>Category Products</h1>
            <p className={styles.subtitle}>Explore our products</p>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className={styles.productList}>
                    {products.map((product: any, index: number) => (
                        <Link
                            href={`/products/${product.product_id}`}
                            className={styles.productCard}
                            key={`${product.product_id}-${index}`}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.descriptions?.["1"]?.name || "Product"}
                                    fill
                                    sizes="(max-width: 600px) 50vw, 220px"
                                    className={styles.productImage}
                                />
                            </div>

                            <h3>{product.descriptions?.["1"]?.name || "Product"}</h3>

                            <p>£{product.calculated_price}</p>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
