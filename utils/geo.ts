import { geoEquirectangular, geoContains, GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import { Point } from '../types';

// Approximate grid resolution
const COLS = 140;
const ROWS = 70;

export const generateMapPoints = async (): Promise<Point[]> => {
  try {
    // Fetch simplified world topology
    const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json');
    if (!response.ok) throw new Error('Failed to load map data');
    const topology = await response.json();
    
    // Convert TopoJSON to GeoJSON
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const landGeoJSON: any = feature(topology, topology.objects.land);

    const points: Point[] = [];
    const projection: GeoProjection = geoEquirectangular()
      .fitSize([COLS, ROWS], { type: "Sphere" }); // Map sphere to grid coordinates

    // We invert the projection logic slightly:
    // We want a regular grid in Cartesian space (screen dots), 
    // and we need to know if that dot represents land.
    // Since Equirectangular is linear, we can iterate lat/lon directly.

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        // Map grid (col, row) to Lat/Lon
        // Longitude: -180 to 180
        const lon = (col / COLS) * 360 - 180;
        // Latitude: 90 to -90 (Top to Bottom)
        const lat = 90 - (row / ROWS) * 180;

        // Shift lon by half a grid cell for center sampling
        const centerLon = lon + (360 / COLS) / 2;
        const centerLat = lat - (180 / ROWS) / 2;

        // Determine UTC Offset based on longitude (15 degrees = 1 hour)
        // Normalizing -180...180 to offsets -12...+12
        const utcOffset = Math.round(centerLon / 15);

        // Check if this coordinate is inside a land polygon
        // geoContains takes [lon, lat]
        const isLand = geoContains(landGeoJSON, [centerLon, centerLat]);

        points.push({
          x: col,
          y: row,
          lat: centerLat,
          lon: centerLon,
          isLand,
          utcOffset: utcOffset === -0 ? 0 : utcOffset // Handle -0
        });
      }
    }

    return points;

  } catch (error) {
    console.error("Error generating map:", error);
    return [];
  }
};

export const getOffsetLabel = (offset: number): string => {
  if (offset === 0) return 'UTC';
  return offset > 0 ? `+${offset}` : `${offset}`;
};
