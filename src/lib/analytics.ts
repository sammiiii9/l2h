import { AnalyticsEvent } from '@/types';

/**
 * Client-side event dispatcher sending events to /api/analytics/events
 */
export async function trackEvent(
  name: AnalyticsEvent['name'],
  payload: Record<string, any> = {}
) {
  if (typeof window === 'undefined') return;

  try {
    const sessionId = localStorage.getItem('l2h_session_id') || `sess-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    localStorage.setItem('l2h_session_id', sessionId);

    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        payload,
        sessionId,
        path: window.location.pathname
      })
    });
  } catch (err) {
    // Non-blocking fire-and-forget
    console.debug('Analytics event failed to dispatch:', err);
  }
}
