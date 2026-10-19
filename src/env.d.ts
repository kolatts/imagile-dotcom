/// <reference path="../.astro/types.d.ts" />

/** Consent gate installed by src/components/TrackingConsent.astro. */
interface ImagileConsent {
  readonly state: 'granted' | 'denied' | 'pending';
  whenGranted(fn: () => void): void;
  grant(): void;
  deny(): void;
}

interface Window {
  imagileConsent: ImagileConsent;
}
