import { automationIcon } from 'app/components/SVGIcons/pagesIcons/automation';
import { dashboardIcon } from 'app/components/SVGIcons/pagesIcons/dashboard';
import { topologyIcon } from 'app/components/SVGIcons/pagesIcons/topology';
// import { performanceDashboard } from 'app/components/SVGIcons/pagesIcons/performanceDashboard';
import { settingsIcon } from 'app/components/SVGIcons/pagesIcons/settings';
import { analyticsIcon } from 'app/components/SVGIcons/pagesIcons/analytics';
import { policyIcon } from 'app/components/SVGIcons/pagesIcons/policyIcon';
// import { sessionsIcon } from 'app/components/SVGIcons/pagesIcons/sessions';
// import { edgesIcon } from 'app/components/SVGIcons/pagesIcons/edgesIcon';
import { metricsIcon } from 'app/components/SVGIcons/pagesIcons/metrics';
import { trafficIcon } from 'app/components/SVGIcons/pagesIcons/trafficIcon';
import { troubleshootingIcon } from 'app/components/SVGIcons/pagesIcons/troubleshooting';
export const ROUTE = {
  base: '/',
  login: '/login',
  app: '/app',
  topology: '/topology',
  policy: '/policy',
  traffic: '/traffic',
  transit: '/transit',
  dashboard: '/dashboard',
  analytics: '/analytics',
  troubleshooting: '/troubleshooting',
  settings: '/settings',
  workflow: '/workflow',
  signUp: '/sign-up',
  metrics: '/metrics',
  // sessions: '/sessions',
  notFound: '*',
};

export enum BreadCrumbTypes {
  WORK_FLOW = 'workflow',
  NETWORKS = 'networks',
  TRANSIT = 'transit',
}

export interface IPage {
  id: string;
  path: string;
  pageName: string;
  breadcrumb: BreadCrumbTypes | null;
  icon: any;
}

export const APP_PAGES: IPage[] = [
  { id: 'dashboard', path: ROUTE.dashboard, pageName: 'Dashboard', icon: dashboardIcon, breadcrumb: null },
  { id: 'topology', path: ROUTE.topology, pageName: 'Topology', icon: topologyIcon, breadcrumb: null },
  { id: 'policy', path: ROUTE.policy, pageName: 'Policy', icon: policyIcon, breadcrumb: null },
  { id: 'traffic', path: ROUTE.traffic, pageName: 'Traffic', icon: trafficIcon, breadcrumb: null },
  // { id: 'transit', path: ROUTE.transit, pageName: 'Transit', icon: edgesIcon, breadcrumb: BreadCrumbTypes.TRANSIT },
  // { id: 'performanceDashboard', path: ROUTE.performanceDashboard, pageName: 'Performance Dashboard', icon: performanceDashboard, breadcrumb: null },
  // { id: 'sessions', path: ROUTE.sessions, pageName: 'Sessions', icon: sessionsIcon, breadcrumb: null },
  { id: 'metrics', path: ROUTE.metrics, pageName: 'Metrics', icon: metricsIcon, breadcrumb: null },
  // { id: 'analytics', path: ROUTE.analytics, pageName: 'Analytics', icon: analyticsIcon, breadcrumb: null },
  //{ id: 'troubleshooting', path: ROUTE.troubleshooting, pageName: 'Troubleshooting', icon: troubleshootingIcon, breadcrumb: null },
  { id: 'workflow', path: ROUTE.workflow, pageName: 'Automation', icon: automationIcon, breadcrumb: BreadCrumbTypes.WORK_FLOW },
  { id: 'settings', path: ROUTE.settings, pageName: 'Settings', icon: settingsIcon, breadcrumb: null },
];
