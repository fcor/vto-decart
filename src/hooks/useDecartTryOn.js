import { useRef, useState, useCallback } from 'react'
import { createDecartClient, models } from '@decartai/sdk'

async function fetchClientToken() {
  const res = await fetch('/.netlify/functions/get-token', { method: 'POST' })
  if (!res.ok) throw new Error('Failed to get client token')
  return res.json()
}

export function useDecartTryOn() {
  const rtClientRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | connecting | connected | error
  const [error, setError] = useState(null)

  const connect = useCallback(async (localStream, outputVideoEl, modelId) => {
    setStatus('connecting')
    setError(null)

    try {
      const { apiKey } = await fetchClientToken()

      const client = createDecartClient({ apiKey })

      const rtClient = await client.realtime.connect(localStream, {
        model: models.realtime(modelId),
        onRemoteStream: (remoteStream) => {
          outputVideoEl.srcObject = remoteStream
          setStatus('connected')
        },
        onError: (err) => {
          setError(err.message || 'Connection error')
          setStatus('error')
        },
        onDisconnect: () => {
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
    const client = rtClientRef.current
    if (!client) {
      console.warn('[decart] setGarment called before client ready')
      return
    }

    try {
      if (image) {
        const res = await fetch(image)
        const imageBlob = await res.blob()
        await client.set({ prompt, image: imageBlob, enhance })
        console.log('[decart] set ok (with image)', { prompt })
      } else {
        await client.setPrompt(prompt)
        console.log('[decart] setPrompt ok', { prompt })
      }
    } catch (err) {
      console.error('[decart] set failed', err)
      setError(err.message || 'set failed')
    }
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
