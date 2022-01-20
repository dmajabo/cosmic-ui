import React from 'react';
import { AbsLoaderWrapper } from 'app/components/Loading/styles';
import LoadingIndicator from 'app/components/Loading';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { ISegmentSegmentP } from 'lib/api/ApiModels/Policy/Segment';
import { ErrorMessage } from 'app/components/Basic/ErrorMessage/ErrorMessage';
import { ModalContent, ModalFooter } from '../../Edges/Editor/Components/styles';

interface IProps {
  data: ISegmentSegmentP;
  loading: boolean;
  error: string;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const DeleteModal: React.FC<IProps> = (props: IProps) => {
  const onClose = () => {
    props.onClose();
  };
  const onDelete = () => {
    props.onDelete(props.data.id);
  };
  return (
    <>
      <ModalContent style={{ height: 'calc(100% - 60px)', display: 'flex', flexDirection: 'column' }}>
        <ErrorMessage margin="auto" fontSize={20} color="var(--_primaryTextColor)">
          Are you sure you want to delete {props.data.name} segment?
        </ErrorMessage>
        {props.error && <ErrorMessage margin="auto">{props.error}</ErrorMessage>}
      </ModalContent>
      <ModalFooter style={{ height: '60px' }}>
        <SecondaryButton styles={{ width: 'calc(50% - 5px)', margin: 'auto 5px auto 0', height: '100%' }} label="Cancel" onClick={onClose} />
        <PrimaryButton styles={{ width: 'calc(50% - 5px)', margin: 'auto 0 auto 5px', height: '100%' }} label="Delete segment" onClick={onDelete} />
      </ModalFooter>
      {props.loading && (
        <AbsLoaderWrapper width="100%" height="100%">
          <LoadingIndicator margin="auto" />
        </AbsLoaderWrapper>
      )}
    </>
  );
};

export default React.memo(DeleteModal);
