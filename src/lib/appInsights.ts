import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let appInsights: ApplicationInsights | null = null;

/**
 * Initialize Application Insights with the provided connection string.
 * This should only be called on the client side.
 * @param connectionString - The Application Insights connection string
 */
export function initializeAppInsights(connectionString: string): void {
  if (typeof window === 'undefined') {
    // Don't initialize on the server
    return;
  }

  if (appInsights) {
    // Already initialized
    return;
  }

  if (!connectionString) {
    console.warn('Application Insights connection string not provided');
    return;
  }

  appInsights = new ApplicationInsights({
    config: {
      connectionString: connectionString,
      enableAutoRouteTracking: true, // Automatically track page views
    }
  });

  appInsights.loadAppInsights();
}

/**
 * Track a custom event with optional properties
 * @param eventName - Name of the event
 * @param properties - Optional custom properties
 */
export function trackEvent(eventName: string, properties?: Record<string, string>): void {
  if (appInsights) {
    appInsights.trackEvent({ name: eventName, properties });
  }
}
