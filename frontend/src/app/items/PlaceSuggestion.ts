import { GeocodingFeatureProperties } from "./GeocodingFeatureProperties";

export interface PlaceSuggestion {
  shortAddress: string;
  fullAddress: string;
  data: GeocodingFeatureProperties;
}
