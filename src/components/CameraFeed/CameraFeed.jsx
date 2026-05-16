import { useRef, useEffect, useState } from 'react'
import styles from './CameraFeed.module.css'

function CameraFeed({ connect, disconnect, status, error: sdkError }) {
  const localVideoRef = useRef(null)
  const outputVideoRef = useRef(null)
  const streamRef = useRef(null)
  const [cameraError, setCameraError] = useState(null)

  useEffect(() => {
    async function startCamera() {
      try {
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

        if (outputVideoRef.current) {
          await connect(stream, outputVideoRef.current)
        }
      } catch (err) {
        setCameraError(err.message)
      }
    }

    startCamera()

    return () => {
      disconnect()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
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
