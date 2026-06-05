import { useState, useCallback } from 'react'
import styles from './App.module.css'
import CameraFeed from './components/CameraFeed/CameraFeed'
import ModeToggle from './components/ModeToggle/ModeToggle'
import CategoryNav from './components/CategoryNav/CategoryNav'
import ProductCarousel from './components/ProductCarousel/ProductCarousel'
import { modes } from './data/products'
import { useDecartTryOn } from './hooks/useDecartTryOn'

function App() {
  const [activeMode, setActiveMode] = useState('tryOn')
  const [activeCategory, setActiveCategory] = useState(modes.tryOn.categories[0].id)
  const [activeProductId, setActiveProductId] = useState(null)
  const [loadingProductId, setLoadingProductId] = useState(null)
  const { connect, disconnect, setGarment, status, error } = useDecartTryOn()

  const handleModeSelect = useCallback((modeId) => {
    setActiveMode(modeId)
    setActiveCategory(modes[modeId].categories[0].id)
    setActiveProductId(null)
  }, [])

  const handleProductSelect = useCallback(async (product) => {
    setActiveProductId(product.id)
    setLoadingProductId(product.id)
    await setGarment({ prompt: product.prompt, image: product.image || null, enhance: product.enhance || false })
    setLoadingProductId(null)
  }, [setGarment])

  const currentMode = modes[activeMode]
  const currentProducts = currentMode.products[activeCategory] ?? []
  const modelId = activeMode === 'restyle' ? 'lucy-restyle-2' : 'lucy-vton-latest'

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Virtual Try-On & Restyle</h1>
      <ModeToggle activeMode={activeMode} onSelect={handleModeSelect} />
      <CategoryNav
        categories={currentMode.categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <CameraFeed
        connect={connect}
        disconnect={disconnect}
        status={status}
        error={error}
        modelId={modelId}
      />
      <ProductCarousel
        products={currentProducts}
        activeProductId={activeProductId}
        loadingProductId={loadingProductId}
        onSelect={handleProductSelect}
      />
    </div>
  )
}

export default App
