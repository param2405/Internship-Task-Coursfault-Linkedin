(function () {
  // Simple tracker for CasualFunel Analytics
  // Drops a global `CasualFunnelTracker` object that can be included on any page.

  const API_URL = window.CASUALFUNNEL_API_URL || (location.origin + '/api/events');

  function generateSession() {
    let id = localStorage.getItem('casualfunel_session');
    if (!id) {
      id = 'sf_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('casualfunel_session', id);
    }
    return id;
  }

  function detectBrowser() {
    const ua = navigator.userAgent;
    if (/firefox/i.test(ua)) return 'Firefox';
    if (/chrome|chromium/i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
    if (/edge/i.test(ua)) return 'Edge';
    return 'Other';
  }

  function detectDevice() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) return 'Mobile';
    return 'Desktop';
  }

  async function sendEvent(payload) {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      // silent fail - tracker should not break host page
      console.warn('Tracker: failed to send event', err.message);
    }
  }

  function trackPageView() {
    const sessionId = generateSession();
    const payload = {
      sessionId,
      eventType: 'pageview',
      pageUrl: location.pathname + location.search,
      timestamp: new Date().toISOString(),
      device: detectDevice(),
      browser: detectBrowser(),
    };
    sendEvent(payload);
  }

  function trackClicks() {
    document.addEventListener('click', function (e) {
      const sessionId = generateSession();
      const x = e.clientX;
      const y = e.clientY;
      const percentX = Math.round((x / window.innerWidth) * 1000) / 10; // 1 decimal percent
      const percentY = Math.round((y / window.innerHeight) * 1000) / 10;
      const payload = {
        sessionId,
        eventType: 'click',
        pageUrl: location.pathname + location.search,
        timestamp: new Date().toISOString(),
        device: detectDevice(),
        browser: detectBrowser(),
        clickData: { x: percentX, y: percentY },
      };
      sendEvent(payload);
    }, true);
  }

  // expose API
  window.CasualFunnelTracker = {
    generateSession,
    sendEvent,
    trackPageView,
    trackClicks,
    detectBrowser,
    detectDevice,
  };

  // Auto start
  try {
    trackPageView();
    trackClicks();
  } catch (err) {
    console.warn('Tracker init error', err.message);
  }
})();
