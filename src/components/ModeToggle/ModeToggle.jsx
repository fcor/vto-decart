import styles from './ModeToggle.module.css'

const modes = [
  { id: 'tryOn', label: 'Try clothes' },
  { id: 'restyle', label: 'Restyle' },
]

function ModeToggle({ activeMode, onSelect }) {
  return (
    <div className={styles.toggle} role="tablist" aria-label="Mode">
      {modes.map(m => (
        <button
          key={m.id}
          role="tab"
          aria-selected={activeMode === m.id}
          className={`${styles.option} ${activeMode === m.id ? styles.active : ''}`}
          onClick={() => onSelect(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export default ModeToggle
