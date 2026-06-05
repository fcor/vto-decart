import styles from './CategoryNav.module.css'

function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <nav className={styles.nav}>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`${styles.tab} ${activeCategory === cat.id ? styles.active : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  )
}

export default CategoryNav
