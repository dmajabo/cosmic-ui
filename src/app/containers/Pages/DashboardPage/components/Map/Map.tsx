import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect } from 'react';
import { DashboardStyles } from '../../DashboardStyles';
import './Map.css';
import ReactDOMServer from 'react-dom/server';
import { Popup } from './Popup';
import { DeviceMetrics, EscalationData, Uplink } from '../../enum';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export interface Properties {
  readonly title: string;
  readonly uplinks?: Uplink[];
  readonly id?: string;
  readonly ownerId?: string;
  readonly name?: string;
}
export interface Feature {
  readonly type: string;
  readonly geometry: {
    readonly type: string;
    readonly name: string;
    readonly coordinates: [number, number];
    readonly deviceEscalationData?: EscalationData;
  };
  readonly properties: Properties;
}

export interface GeoJSON {
  readonly type: string;
  readonly features: Feature[];
}

interface MapProps {
  readonly features: Feature[];
  readonly deviceMetrics: DeviceMetrics[];
}

mapboxgl.accessToken = process.env['REACT_APP_MAPBOX_TOKEN'];

const MAPBOX_STYLE_URL = 'mapbox://styles/ajay-tp/ckznsacom001m15r6w0fjjaim';
const LATITUDE = 43.023;
const LONGITUDE = -95.288;
const INITIAL_ZOOM_LEVEL = 3;

const getMarkerClassName = (deviceEscalationData: EscalationData) => {
  if (deviceEscalationData) {
    if (deviceEscalationData.activeEscalationsCount) {
      return 'red-cisco-marker';
    } else {
      if (deviceEscalationData.totalEscalations) {
        return 'orange-cisco-marker';
      }
    }
  }
  return 'cisco-marker';
};

export const Map: React.FC<MapProps> = ({ features, deviceMetrics }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: MAPBOX_STYLE_URL,
      center: [LONGITUDE, LATITUDE],
      zoom: INITIAL_ZOOM_LEVEL,
      attributionControl: false,
      dragRotate: false,
    });
    if (features.length) {
      for (const { geometry, properties } of features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = getMarkerClassName(geometry.deviceEscalationData);
        // make a marker for each feature and add to the map
        new mapboxgl.Marker({
          element: el,
        })
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: [-10, -75] }) // add popups
              .setHTML(ReactDOMServer.renderToString(<Popup properties={properties} deviceMetrics={deviceMetrics} />)),
          )
          .addTo(map);
      }
    }
  }, [deviceMetrics]);

  const classes = DashboardStyles();

  return <div id="map" className={classes.mapHeight}></div>;
};
