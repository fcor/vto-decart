import { useState, useCallback } from 'react'
import styles from './App.module.css'
import CameraFeed from './components/CameraFeed/CameraFeed'
import CategoryNav from './components/CategoryNav/CategoryNav'
import ProductCarousel from './components/ProductCarousel/ProductCarousel'
import { products } from './data/products'
import { useDecartTryOn } from './hooks/useDecartTryOn'

function App() {
  const [activeCategory, setActiveCategory] = useState('headwear')
  const [activeProductId, setActiveProductId] = useState(null)
  const [loadingProductId, setLoadingProductId] = useState(null)
  const { connect, disconnect, setGarment, status, error } = useDecartTryOn()

  const handleProductSelect = useCallback(async (product) => {
    setActiveProductId(product.id)
    setLoadingProductId(product.id)
    await setGarment({ prompt: product.prompt, image: product.image || null, enhance: product.enhance || false })
    setLoadingProductId(null)
  }, [setGarment])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Virtual Try-On</h1>
      <CategoryNav
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <CameraFeed
        connect={connect}
        disconnect={disconnect}
        status={status}
        error={error}
      />
      <ProductCarousel
        products={products[activeCategory]}
        activeProductId={activeProductId}
        loadingProductId={loadingProductId}
        onSelect={handleProductSelect}
      />
    </div>
  )
}

export default App
