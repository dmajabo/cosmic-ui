import React from 'react';
import { IEdgeP } from 'lib/api/ApiModels/Edges/apiModel';
import { DataItemsRow, EdgeContent, EdgeFooter, EdgeListItemWrapper, EdgeNameWrapper, ValueItem, ItemLabel, ItemValue, StatusCircle } from './styles';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { appsIcon, deployedSuccessIcon, sitesIcon, trafficIcon, transitIcon } from 'app/components/SVGIcons/edges/edgeIcons';
import Tag from 'app/components/Basic/Tag';
import SettingsButton from 'app/components/Buttons/SettingsButton';
import { PopupContent } from 'app/components/Buttons/SettingsButton/PopupItemStyles';
import PopupItem from 'app/components/Buttons/SettingsButton/PopupItem';
import { editIcon } from 'app/components/SVGIcons/edit';
import { deleteIcon } from 'app/components/SVGIcons/delete';

interface Props {
  dataItem: IEdgeP;
  onEdit: (_item: IEdgeP) => void;
  onDelete: (_item: IEdgeP) => void;
}

const EdgeItem: React.FC<Props> = ({ dataItem, onEdit, onDelete }) => {
  const handlerEdit = () => {
    onEdit(dataItem);
  };
  const handlerDelete = () => {
    onDelete(dataItem);
  };
  return (
    <EdgeListItemWrapper>
      <EdgeContent>
        <EdgeNameWrapper onClick={handlerEdit}>{dataItem.name}</EdgeNameWrapper>
        <SettingsButton buttonStyles={{ top: '10px', right: '20px' }} id={`settingsButton${dataItem.id}`} width="24px" height="40px" hoverIconColor="var(--_hoverButtonBg)">
          <PopupContent>
            <PopupItem label="Edit" icon={editIcon} onClick={handlerEdit} />
            <PopupItem color="var(--_errorColor)" label="Delete" icon={deleteIcon()} onClick={handlerDelete} />
          </PopupContent>
        </SettingsButton>
        <DataItemsRow wrap="wrap" justify="flex-start" margin="12px 0 auto 0">
          {dataItem.tags && dataItem.tags.length ? dataItem.tags.map((it, index) => <Tag hideClearButton index={index} key={`${dataItem.id}value${index}`} text={it} />) : null}
        </DataItemsRow>
        <DataItemsRow padding="12px 0 0 0" margin="auto 0 0 0">
          {dataItem.siteGroupIds && dataItem.siteGroupIds.length ? (
            <ValueItem margin="auto 6px auto 0">
              <IconWrapper width="30px" height="30px" icon={sitesIcon} styles={{ margin: '0 6px 0 0' }} />
              <ItemLabel fontSize="16px" lineHeight="21px" color="var(--_disabledTextColor)" margin="0 4px 0 0">
                Sites:
              </ItemLabel>
              <ItemValue fontSize="16px" lineHeight="21px" color="var(--_primaryColor)" fontWeight="500">
                {dataItem.siteGroupIds.length}
              </ItemValue>
            </ValueItem>
          ) : null}
          {dataItem.deploymentPolicy && dataItem.deploymentPolicy.length ? (
            <ValueItem margin="auto 6px">
              <IconWrapper width="30px" height="30px" icon={transitIcon} styles={{ margin: '0 6px 0 0' }} />
              <ItemLabel fontSize="16px" lineHeight="21px" color="var(--_disabledTextColor)" margin="0 4px 0 0">
                Transits:
              </ItemLabel>
              <ItemValue fontSize="16px" lineHeight="21px" color="var(--_primaryColor)" fontWeight="500">
                {dataItem.deploymentPolicy[0].regionCode.length}
              </ItemValue>
            </ValueItem>
          ) : null}
          {dataItem.appGroupIds && dataItem.appGroupIds.length ? (
            <ValueItem margin="auto 0 auto 6px">
              <IconWrapper width="30px" height="30px" icon={appsIcon} styles={{ margin: '0 6px 0 0' }} />
              <ItemLabel fontSize="16px" lineHeight="21px" color="var(--_disabledTextColor)" margin="0 4px 0 0">
                Apps:
              </ItemLabel>
              <ItemValue fontSize="16px" lineHeight="21px" color="var(--_primaryColor)" fontWeight="500">
                {dataItem.appGroupIds.length}
              </ItemValue>
            </ValueItem>
          ) : null}
        </DataItemsRow>
      </EdgeContent>
      <EdgeFooter>
        <ValueItem margin="6px 6px 6px 0">
          <ItemLabel fontSize="16px" lineHeight="21px" color="var(--_primaryColor)" fontWeight="500">
            Traffic:
          </ItemLabel>
          <IconWrapper icon={trafficIcon} styles={{ margin: '0 6px 0 0' }} />
          <ItemValue fontSize="14px" lineHeight="18px" color="var(--_disabledTextColor)">
            8 Mbit/s
          </ItemValue>
        </ValueItem>
        <ValueItem margin="6px 6px 6px 0">
          <ItemLabel fontSize="16px" lineHeight="21px" color="var(--_primaryColor)" fontWeight="500">
            Status:
          </ItemLabel>
          <StatusCircle />
          <ItemValue fontSize="14px" lineHeight="18px" color="var(--_successColor)">
            Acive
          </ItemValue>
        </ValueItem>
        <ValueItem margin="6px 0">
          <IconWrapper icon={deployedSuccessIcon} styles={{ margin: '0 6px 0 0' }} />
          <ItemValue fontSize="14px" lineHeight="18px" color="var(--_successColor)">
            Deployed
          </ItemValue>
        </ValueItem>
      </EdgeFooter>
    </EdgeListItemWrapper>
  );
};

export default React.memo(EdgeItem);
