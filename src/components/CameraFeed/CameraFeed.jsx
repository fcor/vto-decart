import { useRef, useEffect, useState } from 'react'
import styles from './CameraFeed.module.css'

function CameraFeed({ connect, disconnect, status, error: sdkError, modelId }) {
  const localVideoRef = useRef(null)
  const outputVideoRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraError, setCameraError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function start() {
      try {
        if (!streamRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user',
            },
            audio: false,
          })
          streamRef.current = stream
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
        }

        if (cancelled) return

        if (outputVideoRef.current) {
          await connect(streamRef.current, outputVideoRef.current, modelId)
        }
      } catch (err) {
        setCameraError(err.message)
      }
    }

    start()

    return () => {
      cancelled = true
      disconnect()
    }
  }, [modelId, connect, disconnect])

  useEffect(() => () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  if (cameraError) {
    return <div className={styles.error}>Camera error: {cameraError}</div>
  }

  return (
    <div className={styles.wrapper}>
      <video
        ref={localVideoRef}
        className={`${styles.video} ${status === 'connected' ? styles.hidden : ''}`}
        autoPlay
        playsInline
        muted
      />
      <video
        ref={outputVideoRef}
        className={`${styles.video} ${status !== 'connected' ? styles.hidden : ''}`}
        autoPlay
        playsInline
        muted
      />
      {status === 'connecting' && (
        <div className={styles.overlay}>Connecting...</div>
      )}
      {sdkError && (
        <div className={styles.overlay}>{sdkError}</div>
      )}
    </div>
  )
}

export default CameraFeed
