import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import './Map.css';
import ReactDOMServer from 'react-dom/server';
import { Popup } from './Popup';
import { DeviceMetrics, Uplink } from '../../enum';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export interface Properties extends DeviceMetrics {
  readonly title: string;
  readonly uplinks: Uplink[];
}
export interface Feature {
  readonly type: string;
  readonly geometry: {
    readonly type: string;
    readonly name: string;
    readonly coordinates: [number, number];
  };
  readonly properties: Properties;
}

export interface GeoJSON {
  readonly type: string;
  readonly features: Feature[];
}

interface MapProps {
  readonly features: Feature[];
}

mapboxgl.accessToken = process.env['REACT_APP_MAPBOX_TOKEN'];

const MAPBOX_STYLE_URL = 'mapbox://styles/ajay-tp/ckznsacom001m15r6w0fjjaim';
const LATITUDE = 43.023;
const LONGITUDE = -95.288;
const INITIAL_ZOOM_LEVEL = 3;

export const Map: React.FC<MapProps> = ({ features }) => {
  useEffect(() => {
    if (features.length) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: MAPBOX_STYLE_URL,
        center: [LONGITUDE, LATITUDE],
        zoom: INITIAL_ZOOM_LEVEL,
        attributionControl: false,
        dragRotate: false,
      });

      for (const { geometry, properties } of features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'cisco-marker';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker({
          element: el,
        })
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: [-10, -75] }) // add popups
              .setHTML(ReactDOMServer.renderToString(<Popup properties={properties} />)),
          )
          .addTo(map);
      }
    }
  }, [features]);

  const classes = DashboardStyles();

  return <div id="map" className={classes.mapHeight}></div>;
};
