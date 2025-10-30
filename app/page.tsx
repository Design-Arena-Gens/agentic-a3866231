'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'agent' | 'user' | 'system'
  content: string
  timestamp: Date
}

export default function Home() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    if (isCallActive && messages.length === 0) {
      addMessage('agent', 'Good day! Thank you for calling Zaph & Zoe Agro Export Company. My name is Zara, your virtual assistant. How may I help you today?')
    }
  }, [isCallActive])

  const addMessage = (role: 'agent' | 'user' | 'system', content: string) => {
    setMessages(prev => [...prev, { role, content, timestamp: new Date() }])
  }

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsCallActive(true)
      addMessage('system', 'Call connected')

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        audioChunksRef.current = []
        await processAudio(audioBlob)
      }
    } catch (error) {
      alert('Unable to access microphone. Please grant permission and try again.')
    }
  }

  const endCall = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
    setIsCallActive(false)
    setIsRecording(false)
    addMessage('system', 'Call ended')
  }

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      audioChunksRef.current = []
      mediaRecorderRef.current.start()
      setIsRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true)

    // Simulate transcription
    addMessage('user', 'I would like to inquire about your dried hibiscus flower products.')

    // Simulate agent processing and response
    setTimeout(() => {
      const response = generateAgentResponse(messages.length)
      addMessage('agent', response)
      setIsProcessing(false)
    }, 1500)
  }

  const generateAgentResponse = (messageCount: number): string => {
    const responses = [
      "Excellent! We specialize in premium quality dried hibiscus flowers. Our hibiscus is sourced directly from African farmers and is perfect for teas, beverages, and food applications. Would you like to know about our pricing, minimum order quantities, or shipping options?",
      "We offer competitive pricing based on order volume. Our minimum order quantity is 500kg, and we provide worldwide shipping with full export documentation. Where would you like the products shipped to?",
      "Perfect! We handle all export documentation including phytosanitary certificates and certificates of origin. Our typical lead time is 2-3 weeks from order confirmation. Would you like me to have our sales team send you a formal quotation?",
      "Wonderful! I'll have our sales manager reach out to you within the next business day with a detailed quote and product specifications. Can I have your email address and company name please?",
      "Thank you for that information. Our team will be in touch shortly. We also offer blackstone flower if you're interested. Is there anything else I can help you with today?"
    ]

    const index = Math.min(Math.floor(messageCount / 2), responses.length - 1)
    return responses[index]
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🌺 ZZ Exports Voice Agent</h1>
        <p>AI-Powered Call Assistant for Zaph & Zoe Agro Export Company</p>
      </div>

      <div className="agent-card">
        <div className="agent-status">
          <div className="status-indicator"></div>
          <div>
            <strong>Agent Status:</strong> {isCallActive ? 'On Call' : 'Ready'}
            {isProcessing && ' - Processing...'}
          </div>
        </div>

        {isCallActive && (
          <div className="audio-visualizer">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="audio-bar"></div>
            ))}
          </div>
        )}

        <div className="controls">
          {!isCallActive ? (
            <button onClick={startCall} className="btn btn-primary">
              📞 Start Call
            </button>
          ) : (
            <>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="btn btn-primary"
                disabled={isProcessing}
              >
                {isRecording ? '⏸️ Stop Speaking' : '🎤 Start Speaking'}
              </button>
              <button onClick={endCall} className="btn btn-danger">
                📵 End Call
              </button>
            </>
          )}
        </div>

        {messages.length > 0 && (
          <div className="conversation">
            <h3>Conversation Log</h3>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message message-${msg.role}`}>
                <strong>{msg.role === 'agent' ? '🤖 Agent' : msg.role === 'user' ? '👤 Caller' : '📋 System'}:</strong>
                <br />
                {msg.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <h4>🎯 Smart Call Handling</h4>
          <p>Intelligent responses based on company knowledge about dried hibiscus and blackstone flower products.</p>
        </div>
        <div className="feature-card">
          <h4>🌍 Export Expertise</h4>
          <p>Handles inquiries about international shipping, certifications, and export documentation.</p>
        </div>
        <div className="feature-card">
          <h4>💼 Sales Support</h4>
          <p>Provides product information, pricing guidance, and connects callers with sales team.</p>
        </div>
        <div className="feature-card">
          <h4>⚡ 24/7 Availability</h4>
          <p>Always ready to handle calls and capture leads even outside business hours.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>About ZZ Exports Call Agent</h2>
        <ul>
          <li><strong>Company:</strong> Zaph & Zoe Agro Export Company</li>
          <li><strong>Products:</strong> Dried Hibiscus Flower, Blackstone Flower</li>
          <li><strong>Specialization:</strong> Quality African Agricultural Exports</li>
          <li><strong>Agent Capabilities:</strong> Product inquiries, pricing information, export documentation, order processing, lead capture</li>
          <li><strong>Integration:</strong> Can connect with CRM systems and forward leads to sales team</li>
        </ul>
      </div>
    </div>
  )
}
