import React from 'react';
import { Typography, IconButton, Card, CardHeader, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DashboardStyles } from '../DashboardStyles';

interface Legend {
  readonly name: string;
  readonly colour: string;
}

interface TileProps {
  readonly title: string;
  readonly legends?: Legend[];
  readonly onWidgetRemove: Function;
}

const Tile: React.FC<TileProps> = ({ title, legends, children, onWidgetRemove }) => {
  const classes = DashboardStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (title: string) => {
    onWidgetRemove(title);
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        className={classes.cardHeaderRoot}
        action={
          <span>
            <span className={classes.mapLegend}>
              {legends?.map(legend => {
                return (
                  <div key={legend.name} style={{ display: 'inline' }}>
                    <span
                      style={{
                        backgroundColor: legend.colour,
                        marginRight: 10,
                        paddingLeft: 15,
                      }}
                    ></span>
                    <span
                      style={{
                        marginRight: 10,
                      }}
                    >
                      {legend.name}
                    </span>
                  </div>
                );
              })}
            </span>
            <IconButton aria-controls="widget-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="widget-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleClose(title);
                }}
              >
                <Typography className={classes.removeTile}>Remove</Typography>
              </MenuItem>
            </Menu>
          </span>
        }
        title={<Typography className={classes.cardTitle}>{title}</Typography>}
      />
      {children}
    </Card>
  );
};
export default Tile;
