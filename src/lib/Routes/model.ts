import { automationIcon } from 'app/components/SVGIcons/pagesIcons/automation';
import { dashboardIcon } from 'app/components/SVGIcons/pagesIcons/dashboard';
import { policyIcon } from 'app/components/SVGIcons/pagesIcons/policy';
import { topologyIcon } from 'app/components/SVGIcons/pagesIcons/topology';
import { performanceDashboard } from 'app/components/SVGIcons/pagesIcons/performanceDashboard';
import { settingsIcon } from 'app/components/SVGIcons/pagesIcons/settings';
import { analyticsIcon } from 'app/components/SVGIcons/pagesIcons/analytics';
import { sessionsIcon } from 'app/components/SVGIcons/pagesIcons/sessions';
export const ROUTE = {
  base: '/',
  login: '/login',
  app: '/app',
  topology: '/topology',
  dashboard: '/dashboard',
  policy: '/policy',
  performanceDashboard: '/performanceDashboard',
  analytics: '/analytics',
  settings: '/settings',
  automation: '/automation',
  signUp: '/sign-up',
  sessions: '/sessions',
  notFound: '*',
};

export interface IPage {
  id: string;
  path: string;
  pageName: string;
  icon: any;
}

export const APP_PAGES: IPage[] = [
  { id: 'dashboard', path: ROUTE.dashboard, pageName: 'Dashboard', icon: dashboardIcon },
  { id: 'topology', path: ROUTE.topology, pageName: 'Topology', icon: topologyIcon },
  { id: 'performanceDashboard', path: ROUTE.performanceDashboard, pageName: 'Performance Dashboard', icon: performanceDashboard },
  { id: 'sessions', path: ROUTE.sessions, pageName: 'Sessions', icon: sessionsIcon },
  { id: 'policy', path: ROUTE.policy, pageName: 'Policy', icon: policyIcon },
  { id: 'analytics', path: ROUTE.analytics, pageName: 'Analytics', icon: analyticsIcon },
  { id: 'automation', path: ROUTE.automation, pageName: 'Automation', icon: automationIcon },
  { id: 'settings', path: ROUTE.settings, pageName: 'Settings', icon: settingsIcon },
];
