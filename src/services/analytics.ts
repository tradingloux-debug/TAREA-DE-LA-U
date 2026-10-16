export type AnalyticsEventName =
  | 'home_view'
  | 'search_used'
  | 'filter_used'
  | 'experience_view'
  | 'booking_started'
  | 'booking_form_completed'
  | 'booking_confirmed'
  // New Sprint 2 Events
  | 'virtual_tour_opened'
  | 'route_viewed'
  | 'route_personalization_started'
  | 'local_experience_viewed'
  | 'trip_planner_opened'
  | 'trip_preferences_completed'
  | 'trip_generated'
  | 'trip_modified'
  | 'trip_saved'
  | 'referral_page_viewed'
  | 'referral_code_copied'
  | 'referral_code_used'
  | 'auto_reservation_created'
  | 'payment_completed'
  | 'scrollytelling_stage_viewed'
  | 'scrollytelling_cta_clicked';


export interface AnalyticsEventPayload {
  eventName: AnalyticsEventName;
  properties?: Record<string, any>;
  timestamp: string;
}

/**
 * Centralized telemetry & event logging layer.
 * In development / Sprint 1 MVP, records in-memory & logs cleanly for validation metrics.
 * Prepared to connect to Google Analytics 4 (gtag) or Mixpanel without altering component code.
 */
class AnalyticsService {
  private eventsLog: AnalyticsEventPayload[] = [];

  track(eventName: AnalyticsEventName, properties?: Record<string, any>) {
    const payload: AnalyticsEventPayload = {
      eventName,
      properties,
      timestamp: new Date().toISOString(),
    };

    this.eventsLog.push(payload);

    // Development diagnostic trace (kept discreet, non-intrusive)
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[GIA Analytics] ${eventName}`, properties || {});
    }

    // Window gtag hook if Google Analytics is present
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', eventName, properties);
      } catch (e) {
        // Silent fail
      }
    }
  }

  getRecentEvents(): AnalyticsEventPayload[] {
    return [...this.eventsLog];
  }
}

export const analytics = new AnalyticsService();

export function trackEvent(name: AnalyticsEventName, properties?: Record<string, any>) {
  analytics.track(name, properties);
}
