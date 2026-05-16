import { useRef, useState, useCallback } from 'react'
import { createDecartClient, models } from '@decartai/sdk'

const model = models.realtime('lucy-vton-latest')

async function fetchClientToken() {
  const res = await fetch('/.netlify/functions/get-token', { method: 'POST' })
  if (!res.ok) throw new Error('Failed to get client token')
  return res.json()
}

export function useDecartTryOn() {
  const rtClientRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | connecting | connected | error
  const [error, setError] = useState(null)

  const connect = useCallback(async (localStream, outputVideoEl) => {
    setStatus('connecting')
    setError(null)

    try {
      const { apiKey } = await fetchClientToken()

      const client = createDecartClient({ apiKey })

      const rtClient = await client.realtime.connect(localStream, {
        model,
        onRemoteStream: (remoteStream) => {
          outputVideoEl.srcObject = remoteStream
          setStatus('connected')
        },
        onError: (err) => {
          setError(err.message || 'Connection error')
          setStatus('error')
        },
        onDisconnect: (reason) => {
          setStatus('idle')
        },
      })

      rtClientRef.current = rtClient
    } catch (err) {
      setError(err.message || 'Failed to connect')
      setStatus('error')
    }
  }, [])

  const setGarment = useCallback(async ({ prompt, image, enhance = false }) => {
    if (!rtClientRef.current) return

    let imageBlob = null
    if (image) {
      const res = await fetch(image)
      imageBlob = await res.blob()
    }

    await rtClientRef.current.set({
      prompt,
      image: imageBlob,
      enhance,
    })
  }, [])

  const disconnect = useCallback(() => {
    if (rtClientRef.current) {
      rtClientRef.current.disconnect()
      rtClientRef.current = null
    }
    setStatus('idle')
  }, [])

  return { connect, disconnect, setGarment, status, error }
}
