import { automationIcon } from 'app/components/SVGIcons/pagesIcons/automation';
import { dashboardIcon } from 'app/components/SVGIcons/pagesIcons/dashboard';
import { topologyIcon } from 'app/components/SVGIcons/pagesIcons/topology';
import { performanceDashboard } from 'app/components/SVGIcons/pagesIcons/performanceDashboard';
import { settingsIcon } from 'app/components/SVGIcons/pagesIcons/settings';
import { analyticsIcon } from 'app/components/SVGIcons/pagesIcons/analytics';
import { sessionsIcon } from 'app/components/SVGIcons/pagesIcons/sessions';
import { accountsIcon } from 'app/components/SVGIcons/pagesIcons/accounts';
import { edgesIcon } from 'app/components/SVGIcons/pagesIcons/edgesIcon';
export const ROUTE = {
  base: '/',
  login: '/login',
  app: '/app',
  topology: '/topology',
  transit: '/transit',
  dashboard: '/dashboard',
  performanceDashboard: '/performanceDashboard',
  analytics: '/analytics',
  accounts: '/accounts',
  settings: '/settings',
  automation: '/automation',
  signUp: '/sign-up',
  sessions: '/sessions',
  notFound: '*',
};

export enum BreadCrumbTypes {
  AUTOMATIONS = 'automations',
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
  { id: 'transit', path: ROUTE.transit, pageName: 'Transit', icon: edgesIcon, breadcrumb: BreadCrumbTypes.TRANSIT },
  { id: 'performanceDashboard', path: ROUTE.performanceDashboard, pageName: 'Performance Dashboard', icon: performanceDashboard, breadcrumb: null },
  { id: 'sessions', path: ROUTE.sessions, pageName: 'Sessions', icon: sessionsIcon, breadcrumb: null },
  { id: 'analytics', path: ROUTE.analytics, pageName: 'Analytics', icon: analyticsIcon, breadcrumb: null },
  { id: 'automation', path: ROUTE.automation, pageName: 'Automation', icon: automationIcon, breadcrumb: BreadCrumbTypes.AUTOMATIONS },
  { id: 'accounts', path: ROUTE.accounts, pageName: 'Accounts', icon: accountsIcon, breadcrumb: null },
  { id: 'settings', path: ROUTE.settings, pageName: 'Settings', icon: settingsIcon, breadcrumb: null },
];
