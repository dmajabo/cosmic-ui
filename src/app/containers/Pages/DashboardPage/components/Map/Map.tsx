import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import './Map.css';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export interface Feature {
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

export interface GeoJSON {
  readonly type: string;
  readonly features: Feature[];
}

mapboxgl.accessToken = process.env['REACT_APP_MAPBOX_TOKEN'];

const LATITUDE = 43.023;
const LONGITUDE = -95.288;
const INITIAL_ZOOM_LEVEL = 3;

interface MapProps {
  readonly features: Feature[];
}

export const Map: React.FC<MapProps> = ({ features }) => {
  useEffect(() => {
    if (features.length) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ajay-tp/ckznsacom001m15r6w0fjjaim',
        center: [LONGITUDE, LATITUDE],
        zoom: INITIAL_ZOOM_LEVEL,
        attributionControl: false,
        dragRotate: false,
      });

      for (const { geometry } of features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'cisco-marker';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker({
          element: el,
        })
          .setLngLat(geometry.coordinates)
          // .setPopup(
          //   new mapboxgl.Popup({ offset: 40 }) // add popups
          //     .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`),
          // )
          .addTo(map);
      }
    }
  }, [features]);

  const classes = DashboardStyles();

  return <div id="map" className={classes.mapHeight}></div>;
};
