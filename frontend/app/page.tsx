
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

type Category = {
  category_id: string;
  name: string;
  image: string;
};

async function getCategories() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/categories`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return data.response || [];
  } catch (error) {
    console.log("Category fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className={styles.container}>
      <div className={styles.heading}>
        <h1>Our Category</h1>
        <p>Explore our product collections</p>
      </div>

      {categories.length === 0 ? (
        <p className={styles.message}>Unable to load categories.</p>
      ) : (
        <div className={styles.categoryList}>
          {categories.map((category: Category) => (
            <Link
              href={`/category/${category.category_id}`}
              className={styles.categoryCard}
              key={category.category_id}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 600px) 100vw, 200px"
                  className={styles.categoryImage}
                />
              </div>

              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
