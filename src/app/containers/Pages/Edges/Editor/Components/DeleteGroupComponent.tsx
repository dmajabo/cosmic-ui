import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import { IconStyles } from 'app/components/Modal/styles';
import { IDeleteDataModel } from '../model';
import { edgesLogo } from 'app/components/SVGIcons/edges/edgesLogo';
import { DeleteWrapper, DialogHeader, DialogText, ModalFooter, ModalRow } from './styles';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import CheckBox from 'app/components/Inputs/Checkbox/CheckBox';
import { closeSmallIcon } from 'app/components/SVGIcons/close';
import IconWrapper from 'app/components/Buttons/IconWrapper';

interface IProps {
  data: IDeleteDataModel;
  loading?: boolean;
  onDelete: (id: string, all: boolean) => void;
  onClose: () => void;
}

const DeleteGroupComponent: React.FC<IProps> = (props: IProps) => {
  const [deleteAll, setDeleteAll] = React.useState<boolean>(false);
  const onClose = () => {
    props.onClose();
  };
  const onDelete = () => {
    props.onDelete(props.data.id, deleteAll);
  };
  const onCheckBoxChange = (v: boolean) => {
    setDeleteAll(v);
  };
  return (
    <DeleteWrapper>
      <DialogHeader>
        <IconStyles>{edgesLogo}</IconStyles>
        <IconWrapper styles={{ position: 'absolute', top: '-10px', right: '-10px' }} icon={closeSmallIcon} onClick={onClose} />
      </DialogHeader>

      <DialogText margin="0 15px 14px 15px">{props.data.message}</DialogText>
      <DialogText color="var(--_disabledTextColor)" margin="0 15px 30px 15px" fontSize="14px" fontWeight="normal" lineHeight="22px">
        If you want to delete this group from all Edges, please select checkbox below.
      </DialogText>
      <ModalRow margin="0 auto 30px auto">
        <CheckBox label="Delete from all Edges" isChecked={deleteAll} toggleCheckboxChange={onCheckBoxChange} />
      </ModalRow>
      <ModalFooter>
        <SecondaryButton styles={{ width: 'calc(50% - 5px)', margin: 'auto 5px auto 0', height: '100%' }} label="Cancel" onClick={onClose} />
        <PrimaryButton styles={{ width: 'calc(50% - 5px)', margin: 'auto 0 auto 5px', height: '100%' }} label="Delete group" onClick={onDelete} />
      </ModalFooter>
      {props.loading && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </DeleteWrapper>
  );
};

export default React.memo(DeleteGroupComponent);
