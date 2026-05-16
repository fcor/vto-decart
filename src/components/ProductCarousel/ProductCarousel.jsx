import styles from './ProductCarousel.module.css'

function ProductCarousel({ products, activeProductId, loadingProductId, onSelect }) {
  return (
    <div className={styles.carousel}>
      {products.map(product => (
        <button
          key={product.id}
          className={`${styles.card} ${activeProductId === product.id ? styles.active : ''}`}
          onClick={() => onSelect(product)}
        >
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={product.thumbnail}
              alt={product.name}
            />
            {loadingProductId === product.id && (
              <div className={styles.spinner} />
            )}
          </div>
          <span className={styles.name}>{product.name}</span>
        </button>
      ))}
    </div>
  )
}

export default ProductCarousel
