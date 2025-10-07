// Define a type for supported time zone identifiers.
// Includes common IANA time zones, but also allows any custom string via intersection with `string & {}`.
export type TimeZoneId =
  | 'Europe/Stockholm'
  | 'Europe/London'
  | 'Europe/Paris'
  | 'America/New_York'
  | 'America/Los_Angeles'
  | 'Asia/Tokyo'
  | 'Asia/Shanghai'
  | 'Australia/Sydney'
  | (string & {}); // allows custom IANA time zone strings

// Represents a city with an ID, name, time zone, and optional image URL
export interface City {
  id: string;         // Unique identifier for the city
  name: string;       // Display name of the city
  tz: TimeZoneId;     // Time zone identifier
  imageUrl?: string;  // Optional image URL(s) for the city
}

// Defines the available clock display styles
export type ClockStyle = 'digital' | 'analog';

// Represents user-configurable clock settings
export interface ClockSettings {
  style: ClockStyle;     // Clock style: digital or analog
  showSeconds: boolean;  // Whether to display seconds
  use24h: boolean;       // Whether to use 24-hour format
}

// Represents the overall application state
export interface AppState {
  cities: City[];           // List of cities being tracked
  settings: ClockSettings;  // Global clock display settings
}
