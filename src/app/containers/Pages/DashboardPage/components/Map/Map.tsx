import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { DashboardStyles } from '../../DashboardStyles';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

interface Feature {
  readonly type: string;
  readonly geometry: {
    readonly type: string;
    readonly name: string;
    readonly coordinates: [number, number];
  };
  readonly properties: {
    readonly title: string;
    readonly description: string;
  };
}

interface GeoJSON {
  readonly type: string;
  readonly features: Feature[];
}

mapboxgl.accessToken = 'pk.eyJ1IjoiYWpheS10cCIsImEiOiJja3NzamxqM3UweGVvMnZtZGJic3NpNDlmIn0.NGQB4WDQmRsC3B78JVCJQg';
export const Map: React.FC = () => {
  const [longitude] = useState<number>(-36.18);
  const [latitude] = useState<number>(35.46);
  const [zoom] = useState<number>(0);
  const geojson: GeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          name: 'aws',
          coordinates: [-77.032, 38.913],
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          name: 'cisco',
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California',
        },
      },
    ],
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ajay-tp/ckstwed501bvf17qumoukq8gw',
      center: [longitude, latitude],
      zoom: zoom,
      attributionControl: false,
    });

    for (const { geometry, properties } of geojson.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = geometry.name === 'aws' ? 'aws-marker' : 'cisco-marker';
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 40 }) // add popups
            .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`),
        )
        .addTo(map);
    }
  });

  const classes = DashboardStyles();

  return <div id="map" className={classes.mapHeight}></div>;
};
