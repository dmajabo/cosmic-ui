import React from 'react';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';

interface Props {
  regions: IAwsRegion[];
  selectedRegions: string[];
}

const TransitionTable: React.FC<Props> = (props: Props) => {
  const classes = TableStyles();
  const [selectedList, setSelectedList] = React.useState<IAwsRegion[]>([]);

  React.useEffect(() => {
    if (Array.isArray(props.selectedRegions)) {
      const _arr: IAwsRegion[] = [];
      props.selectedRegions.forEach(it => {
        const present = props.regions.find(key => key.code === it);
        if (present) {
          _arr.push(present);
        }
      });
      setSelectedList(_arr);
    }
  }, [props.selectedRegions]);

  return (
    <TableWrapperStyles>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Type
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Name
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Region
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedList && selectedList.length
              ? selectedList.map((it, rowIndex) => (
                  <TableRow hover tabIndex={-1} key={`tableRow${it.id}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{awsIcon(20)} AWS</TableCell>
                    <TableCell className={classes.tableCell}>{it.name}</TableCell>
                    <TableCell className={classes.tableCell}>{it.code}</TableCell>
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
