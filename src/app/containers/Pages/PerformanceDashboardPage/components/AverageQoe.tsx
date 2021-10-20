import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { PerformanceDashboardStyles } from '../PerformanceDashboardStyles';

interface AvgQoeProps {
  readonly packetLoss: string;
  readonly latency: string;
  readonly testId: string;
  readonly deleteTest: (testId: string) => void;
  readonly updateTest: (testId: string) => void;
}

const AverageQoe: React.FC<AvgQoeProps> = ({ updateTest, deleteTest, packetLoss, latency, testId }) => {
  const classes = PerformanceDashboardStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleDelete = (testId: string) => {
    deleteTest(testId);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (testId: string) => {
    updateTest(testId);
    setAnchorEl(null);
  };

  return (
    <div className={classes.flexContainer}>
      <div className={classes.averageQoeText}>
        <span>Packet Loss:</span>
        <span className={classes.packetLossValueText}>{`${isNaN(Number(packetLoss)) ? '-' : Number(packetLoss)}%`}</span>
        <span>Latency:</span>
        <span className={classes.latencyValueText}>{`${isNaN(Number(latency)) ? '-' : Number(latency).toFixed(2)}ms`}</span>
      </div>
      <div>
        <IconButton aria-controls="test-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu id="test-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleDelete(testId);
            }}
          >
            <Typography className={classes.deleteTest}>Delete</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleUpdate(testId);
            }}
          >
            <Typography>Update</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
export default AverageQoe;
