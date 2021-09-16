import React, { useEffect, useState } from 'react';
import { Drawer, FormControl, List, MenuItem, Select, Typography } from '@material-ui/core';
import { MetricsData } from './SharedTypes';
import { TopologyStyles } from './TopologyStyles';
import { createApiClient } from './apiClient';
import CloseIcon from './close.svg';
import { LineChart } from './LineChart';

export interface LineChartDataType {
  title: string;
  data: MetricsData[];
}

export const Topology: React.FC = () => {
  const classes = TopologyStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  const [networkDetailDuration, setNetwokDetailDuration] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => setNetwokDetailDuration(event.target.value as string);

  //const userContext = useContext<UserContextState>(UserContext);
  const apiClient = createApiClient();

  const [CPUUtilizationMetrics, setCPUUtilizationMetrics] = useState<MetricsData[]>([]);

  useEffect(() => {
    const getMetrics = async () => {
      const responseData = await apiClient.getMetrics('i-04132d5ce454c2569', 'CPUUtilization');
      responseData.metrics.keyedmap.forEach(item => {
        if (item.key === 'CPUUtilization') {
          setCPUUtilizationMetrics(item.ts);
        }
      });
    };
    getMetrics();
  }, []);

  const LineChartData: LineChartDataType[] = [
    {
      title: 'CPU utilization',
      data: CPUUtilizationMetrics,
    },
  ];

  return (
    <div>
      <div>
        <h4>Topology View</h4>
        <button onClick={handleDrawerOpen}>Open Drawer</button>
        <Drawer
          className={classes.deviceDataDrawer}
          elevation={0}
          variant="persistent"
          anchor="right"
          classes={{
            paper: classes.deviceDrawerPaper,
          }}
          open={isOpen}
        >
          <List>
            <div className={classes.flexContainer}>
              <Typography className={classes.deviceName}>Device Name</Typography>
              <div>
                <div onClick={handleDrawerClose}>
                  <img alt="close" src={CloseIcon} />
                </div>
              </div>
            </div>
            <div className={classes.startFlexContainer}>
              <Typography className={classes.showText} noWrap>
                Time Range:
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
            {LineChartData.map(item => {
              return (
                <div className={classes.deviceDataChartContainer}>
                  <div className={classes.startFlexContainer}>
                    <Typography className={classes.cardTitle}>{item.title}</Typography>
                  </div>
                  <div className={classes.textFlexContainer}>
                    <Typography className={classes.showText}>Open in</Typography>
                    <a href="" className={classes.linkText}>
                      Metrics Explorer
                    </a>
                  </div>
                  <div className={classes.chartContainer}>
                    <LineChart dataValueSuffix="Mbps" inputData={item.data} />
                  </div>
                </div>
              );
            })}
            <div className={classes.drawerGap} />
          </List>
        </Drawer>
      </div>
    </div>
  );
};
