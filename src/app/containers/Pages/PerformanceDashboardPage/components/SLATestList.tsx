import { Backdrop, Button, IconButton, Typography } from '@material-ui/core';
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useEffect, useMemo } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';
import ColumnsIcon from '../icons/columns.svg';
import FilterIcon from '../icons/filter.svg';
import Table from './Table';
import { CreateSLATest } from './CreateSLATest';

interface AverageQOE {
  readonly packetLoss: number;
  readonly latency: number;
}

interface RawData {
  readonly name: string;
  readonly sourceOrg: string;
  readonly sourceNetwork: string;
  readonly sourceDevice: string;
  readonly destination: string;
  readonly description: string;
  readonly averageQoe: AverageQOE;
}

interface SLATestListProps {
  readonly rawData: RawData[];
  readonly addSlaTest: Function;
}

export const SLATestList: React.FC<SLATestListProps> = ({ rawData, addSlaTest }) => {
  const classes = PerformanceDashboardStyles();

  const [createToggle, setCreateToggle] = React.useState(false);

  const handleClose = () => {
    setCreateToggle(false);
  };
  const handleToggle = () => {
    setCreateToggle(!createToggle);
  };

  const addTest = (value: RawData) => {
    addSlaTest(value);
    handleClose();
  };

  const columns = useMemo(
    () => [
      {
        Header: 'NAME',
        accessor: 'name' as const,
      },
      {
        Header: 'SOURCE ORGANIZATION',
        accessor: 'sourceOrg' as const,
      },
      {
        Header: 'SOURCE NETWORK',
        accessor: 'sourceNetwork' as const,
      },
      {
        Header: 'SOURCE DEVICE',
        accessor: 'sourceDevice' as const,
      },
      {
        Header: 'DESTINATION',
        accessor: 'destination' as const,
      },
      {
        Header: 'AVERAGE QOE',
        accessor: 'averageQoe' as const,
      },
    ],
    [],
  );
  const data = useMemo(
    () =>
      rawData.map(item => {
        return {
          name: item.name,
          sourceOrg: item.sourceOrg,
          sourceNetwork: item.sourceNetwork,
          sourceDevice: item.sourceDevice,
          destination: item.destination,
          averageQoe: (
            <div className={classes.flexContainer}>
              <div className={classes.averageQoeText}>
                <span>Packet Loss:</span>
                <span className={classes.packetLossValueText}>{`${item.averageQoe.packetLoss}%`}</span>
                <span>Latency:</span>
                <span className={classes.latencyValueText}>{`${item.averageQoe.latency}ms`}</span>
              </div>
              <div>
                <IconButton aria-controls="widget-menu" aria-haspopup="true">
                  <MoreVertIcon />
                </IconButton>
              </div>
            </div>
          ),
        };
      }),
    [],
  );

  return (
    <div className={classes.slaTestListContainer}>
      <div className={classes.itemContainer}>
        <div className={classes.flexContainer}>
          <div>
            <Typography className={classes.itemTitle}>SLA Tests</Typography>
          </div>
          <div>
            <Button className={classes.otherButton} variant="contained" disableElevation>
              <Typography className={classes.otherButtonText} noWrap>
                FILTER
              </Typography>
              <img src={FilterIcon} alt="columns" />
            </Button>
            <Button className={classes.otherButton} variant="contained" disableElevation>
              <Typography className={classes.otherButtonText} noWrap>
                COLUMNS
              </Typography>
              <img src={ColumnsIcon} alt="columns" />
            </Button>
            <Button className={classes.slaTestButton} variant="contained" color="primary" disableElevation onClick={handleToggle}>
              <Typography className={classes.slaTestButtonText} noWrap>
                CREATE SLA TEST
              </Typography>
              <AddIcon fontSize="small" />
            </Button>
          </div>
        </div>
        <div>
          <Typography className={classes.subTitleText}>Select sources for wich you want to view data.</Typography>
        </div>
        <div className={classes.tableContainer}>
          <Table columns={columns} data={data} />
        </div>
      </div>
      <Backdrop style={{ color: '#fff', zIndex: 5 }} open={createToggle}>
        <CreateSLATest addSlaTest={addTest} popup={true} closeSlaTest={handleClose} />
      </Backdrop>
    </div>
  );
};
