const API_ENDPOINT = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '') + '/events'

function generateSession() {
  let sessionId = localStorage.getItem('casualfunel_session')
  if (!sessionId) {
    sessionId = 'cf_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('casualfunel_session', sessionId)
  }
  return sessionId
}

function detectBrowser() {
  const ua = navigator.userAgent
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/edg/i.test(ua)) return 'Edge'
  if (/chrome|chromium/i.test(ua)) return 'Chrome'
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari'
  return 'Other'
}

function detectDevice() {
  const ua = navigator.userAgent
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return 'Mobile'
  return 'Desktop'
}

async function sendEvent(eventData) {
  try {
    await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
  } catch (error) {
    console.warn('Tracker sendEvent failed', error)
  }
}

export function trackPageView(path) {
  const sessionId = generateSession()
  sendEvent({
    sessionId,
    eventType: 'pageview',
    pageUrl: path || window.location.pathname + window.location.search,
    timestamp: new Date().toISOString(),
    device: detectDevice(),
    browser: detectBrowser(),
  })
}

export function trackClicks() {
  const sessionId = generateSession()
  document.addEventListener(
    'click',
    (event) => {
      const x = Math.round((event.clientX / window.innerWidth) * 100)
      const y = Math.round((event.clientY / window.innerHeight) * 100)
      sendEvent({
        sessionId,
        eventType: 'click',
        pageUrl: window.location.pathname + window.location.search,
        timestamp: new Date().toISOString(),
        device: detectDevice(),
        browser: detectBrowser(),
        x,
        y,
      })
    },
    true,
  )
}

export function initializeTracker() {
  trackPageView()
  trackClicks()
}
