import React from 'react';
import { TableWrapperStyles } from 'app/components/Basic/Table/styles';
import { TableStyles } from 'app/components/Basic/Table/TableStyles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ciscoMerakiLogoIcon } from 'app/components/SVGIcons/topologyIcons/ciscoMerakiLogo';
import { awsIcon } from 'app/components/SVGIcons/topologyIcons/aws';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { CellContent } from './styles';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';
import { IEdgeGroup, PolicySources } from 'lib/api/ApiModels/Edges/apiModel';
interface Props {
  data: IEdgeGroup[];
  onEditGroup: (item: IEdgeGroup, index: number) => void;
  onDeleteGroup: (index: number) => void;
}

const FormTable: React.FC<Props> = ({ data, onEditGroup, onDeleteGroup }) => {
  const classes = TableStyles();

  const onEdit = (dataItem: IEdgeGroup, index: number) => {
    onEditGroup(dataItem, index);
  };

  const onDelete = (index: number) => {
    onDeleteGroup(index);
  };

  const getTypeIcon = (type: PolicySources) => {
    if (type === PolicySources.MERAKI) {
      return (
        <CellContent>
          <IconWrapper width="24px" height="24px" styles={{ margin: '0 12px 0 0' }} icon={ciscoMerakiLogoIcon(24)} />
          Cisco Meraki
        </CellContent>
      );
    }
    if (type === PolicySources.AWS) {
      return (
        <CellContent>
          <IconWrapper width="24px" height="24px" styles={{ margin: '0 12px 0 0' }} icon={awsIcon(24)} />
          AWS
        </CellContent>
      );
    }
    return <CellContent>{type}</CellContent>;
  };
  return (
    <TableWrapperStyles>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Name
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Connectors
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ minWidth: 100 }}>
                Sites
              </TableCell>
              <TableCell className={classes.tableHeadCell} style={{ width: 40 }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length
              ? data.map((row, rowIndex) => (
                  <TableRow hover tabIndex={-1} key={`tableRow${rowIndex}`} className={classes.row}>
                    <TableCell className={classes.tableCell}>{row.name}</TableCell>
                    <TableCell className={classes.tableCell}>{getTypeIcon(row.type)}</TableCell>
                    <TableCell className={classes.tableCell}>{row.items.map(it => it).join(', ')}</TableCell>
                    <TableCell className={classes.tableCell}>
                      <CellContent>
                        <SettingsButton buttonStyles={{ position: 'static', width: '20px', height: '100%', margin: 'auto' }} id={`tableRow${rowIndex}`} hoverIconColor="var(--_sHoverButtonColor)">
                          <PopupContent>
                            <PopupItem label="Edit" icon={editIcon} onClick={() => onEdit(row, rowIndex)} />
                            <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={() => onDelete(rowIndex)} />
                          </PopupContent>
                        </SettingsButton>
                      </CellContent>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapperStyles>
  );
};
export default React.memo(FormTable);
