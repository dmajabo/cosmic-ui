import { Button, FormControl, MenuItem, Typography, Select, CardContent } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { ReactNode, useEffect } from 'react';
import { useState } from 'react';
import { CardTitle } from './enum/CardTitle';
import { DashboardStyles } from './DashboardStyles';
import { NetworkValueTrend } from './enum/NetworkValueTrend';
import NetworkTile from './components/NetworkTile';
import Tile from './components/Tile';
import './react-grid-layout.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { BarChart } from './components/BarChart';
import { PieChart } from './components/PieChart';
import { TroubleshootingCounter } from './components/TroubleshootingCounter';
import { Map } from './components/Map/Map';
import { useLocation } from 'react-router';
import { Backdrop } from '@mui/material';
import { AddSourcePopup } from './components/AddSourcePopup';
const ResponsiveGridLayout = WidthProvider(Responsive);

interface IProps {}

interface Legend {
  readonly name: string;
  readonly colour: string;
}

interface Widget {
  readonly title: string;
  readonly legends?: Legend[];
  readonly cardContentcss: string;
  readonly component?: ReactNode;
  readonly layout: Layout;
}

interface Layout {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

interface DemoInterface {
  readonly isDemoEnviornment: boolean;
}

const DashboardPage: React.FC<IProps> = (props: IProps) => {
  const classes = DashboardStyles();

  const defaultWidgets = [
    {
      title: CardTitle.map,
      legends: [
        { name: 'Cisco Meraki', colour: '#437fec' },
        { name: 'AWS', colour: '#f9a825' },
      ],
      cardContentcss: classes.mapWidth,
      layout: { x: 0, y: 0, w: 7, h: 2 },
      component: <Map />,
    },
    {
      title: CardTitle.onPremise,
      cardContentcss: classes.statTile,
      layout: { x: 7, y: 0, w: 2.5, h: 1 },
      component: <NetworkTile value={5} change={1} arrowDirection={NetworkValueTrend.Up} />,
    },
    {
      title: CardTitle.cloud,
      cardContentcss: classes.statTile,
      layout: { x: 9.5, y: 0, w: 2.5, h: 1 },
      component: <NetworkTile value={3} change={5} arrowDirection={NetworkValueTrend.Down} />,
    },
    {
      title: CardTitle.topology,
      cardContentcss: classes.statTile,
      layout: { x: 7, y: 1, w: 2.5, h: 1 },
      component: <NetworkTile value={3} change={50} arrowDirection={NetworkValueTrend.Up} />,
    },
    {
      title: CardTitle.policy,
      cardContentcss: classes.statTile,
      layout: { x: 9.5, y: 1, w: 2.5, h: 1 },
      component: <NetworkTile value={3} change={5} arrowDirection={NetworkValueTrend.Up} />,
    },
    {
      title: CardTitle.topEdges,
      cardContentcss: classes.chartWidth,
      layout: { x: 0, y: 2, w: 4, h: 2 },
      component: (
        <BarChart
          categories={['A1', 'A2', 'A3', 'A4', 'A5']}
          yAxisTitle="Speed (mbps)"
          dataValueSuffix="mbps"
          borderRadius={7}
          width={15}
          colours={['#437FEC', '#F69442', '#F69442', '#F9A825', '#F9A825']}
          data={[750, 300, 240, 175, 150]}
        />
      ),
    },
    {
      title: CardTitle.topApplication,
      cardContentcss: classes.chartWidth,
      layout: { x: 4, y: 2, w: 4, h: 2 },
      component: (
        <PieChart
          data={[
            {
              name: 'Application 1',
              y: 40,
            },
            {
              name: 'Application 2',
              y: 32,
            },
            {
              name: 'Application 3',
              y: 20,
            },
            {
              name: 'Application 4',
              y: 8,
            },
          ]}
          labelFormat="{point.percentage:.1f} %"
          labelPosition={-30}
          colours={['#437FEC', '#F69442', '#F9A825', '#DC4545']}
          innerCircleArea="60%"
        />
      ),
    },
    {
      title: CardTitle.connectivityTroubleshooting,
      cardContentcss: classes.chartWidth,
      layout: { x: 8, y: 2, w: 4, h: 2 },
      component: (
        <div className={classes.troubleshootContainer}>
          <div className={classes.troubleshootElementContainer}>
            <TroubleshootingCounter title={20} subtitle="Unreachable" data={[80, 20]} colours={['white', 'red']} innerCircleArea="80%" />
          </div>
          <div className={classes.troubleshootElementContainer}>
            {' '}
            <TroubleshootingCounter title={80} subtitle="Reachable" data={[80, 20]} colours={['green', 'white']} innerCircleArea="80%" />
          </div>
        </div>
      ),
    },
  ];

  const [networkDetailDuration, setNetwokDetailDuration] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => setNetwokDetailDuration(event.target.value as string);

  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [layouts, setLayouts] = useState({});

  const onWidgetRemove = (title: string) => {
    const newWidgetsList = widgets.filter(widget => {
      return widget.title !== title;
    });
    setWidgets(newWidgetsList);
  };

  const onLayoutChange = (layout, layouts) => {
    setLayouts({ layouts });
  };

  const location = useLocation<DemoInterface>();

  return (
    <div>
      <div className={classes.flexContainer}>
        <div>
          <Typography className={classes.network} noWrap>
            Network
          </Typography>
          <Button className={classes.widgetButton} variant="contained" color="primary" disableElevation>
            <Typography className={classes.widgetButtonText} noWrap>
              ADD WIDGET
            </Typography>
            <AddIcon fontSize="small" />
          </Button>
        </div>
        <div className={classes.endFlexContainer}>
          <Typography className={classes.showText} noWrap>
            Show:
          </Typography>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select labelId="show dropdown" id="dropdown" classes={{ root: classes.dropdown }} value={networkDetailDuration} onChange={handleChange} label="show">
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Item 1</MenuItem>
              <MenuItem value={2}>Item 2</MenuItem>
              <MenuItem value={3}>Item 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        compactType={'vertical'}
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
        rowHeight={240}
      >
        {widgets.map(widget => {
          return (
            <div key={widget.title} data-grid={widget.layout}>
              <Tile title={widget.title} legends={widget.legends} onWidgetRemove={onWidgetRemove}>
                <CardContent className={widget.cardContentcss}>{widget.component}</CardContent>
              </Tile>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default React.memo(DashboardPage);
