import React from 'react';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { CellContent } from './styles';
import { DeploymentTypes } from 'lib/api/ApiModels/Edges/apiModel';
import { wedgeIcon } from 'app/components/SVGIcons/topologyIcons/wedge';
import { INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';

interface Props {
  type: DeploymentTypes;
  wedges: INetworkwEdge[];
  selectedWedgesIds: string[];
  regions: IAwsRegion[];
  selectedRegions: string[];
}

const TransitionTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  const [selectedList, setSelectedList] = React.useState<IAwsRegion[] | INetworkwEdge[]>([]);

  React.useEffect(() => {
    if (props.type === DeploymentTypes.NEW_REGIONS && Array.isArray(props.selectedRegions)) {
      const _arr: IAwsRegion[] = [];
      props.selectedRegions.forEach(it => {
        const present = props.regions.find(key => key.code === it);
        if (present) {
          _arr.push(present);
        }
      });
      setSelectedList(_arr);
    }
    if (props.type === DeploymentTypes.EXISTING_GWS && Array.isArray(props.selectedWedgesIds)) {
      const _arr: INetworkwEdge[] = [];
      props.selectedWedgesIds.forEach(it => {
        const present = props.wedges.find(wedge => wedge.extId === it);
        if (present) {
          _arr.push(present);
        }
      });
      setSelectedList(_arr);
    }
  }, [props.type, props.selectedRegions, props.selectedWedgesIds]);

  return (
    <TableWrapperStyles>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              {props.type === DeploymentTypes.NEW_REGIONS && (
                <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                  Type
                </TableCell>
              )}
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Name
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                {props.type === DeploymentTypes.EXISTING_GWS ? 'Ext ID' : 'Region'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedList && selectedList.length
              ? selectedList.map((it, rowIndex) => (
                  <TableRow hover tabIndex={-1} key={`tableRow${it.id}${rowIndex}`} className={classes.row}>
                    {props.type === DeploymentTypes.NEW_REGIONS && (
                      <TableCell className={classes.tableCell}>
                        <CellContent>
                          <IconWrapper width="20px" height="20px" styles={{ margin: '0 12px 0 0' }} icon={awsIcon(20)} />
                          <>AWS</>
                        </CellContent>
                      </TableCell>
                    )}
                    <TableCell className={classes.tableCell}>
                      <CellContent>
                        {props.type === DeploymentTypes.EXISTING_GWS && <IconWrapper width="16px" height="16px" styles={{ margin: '0 12px 0 0' }} icon={wedgeIcon(16)} />}
                        <>{it.name}</>
                      </CellContent>
                    </TableCell>
                    <TableCell className={classes.tableCell}>{props.type === DeploymentTypes.EXISTING_GWS ? it.extId : it.code}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapperStyles>
  );
};

export default React.memo(TransitionTable);
