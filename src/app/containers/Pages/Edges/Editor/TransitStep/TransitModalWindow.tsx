import React from 'react';
import RadioButton from 'app/components/Inputs/RadioButton';
import { ModalContent, ModalFooter, ModalRow } from '../Components/styles';
import { UserContext, UserContextState } from 'lib/Routes/UserProvider';
import { useGet } from 'lib/api/http/useAxiosHook';
import PrimaryButton from 'app/components/Buttons/PrimaryButton';
import { DeploymentTypes, IWEdgesRes } from 'lib/api/ApiModels/Edges/apiModel';
import Map from './Map';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import WedgesGridWrapper from '../Components/WedgesGridWrapper';
import { buildPagingParam, EdgesApi } from 'lib/api/ApiModels/Edges/edpoints';
import { INetworkwEdge } from 'lib/models/topology';
interface Props {
  selectedRegion: string[];
  selectedWedgeIds: string[];
  onAddTransits: (items: string[], field: DeploymentTypes) => void;
}

const TransitModalWindow: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { edges } = useEdgesDataContext();
  const [radioGroupValue, setRadioGroupValue] = React.useState<DeploymentTypes>(DeploymentTypes.Wedge);
  const { response, error, loading, onGet } = useGet<IWEdgesRes>();
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>(props.selectedRegion || []);
  const [selectedTransitsIds, setSelectedTransit] = React.useState<string[]>(props.selectedWedgeIds || []);
  const [wedges, setDevices] = React.useState<INetworkwEdge[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  React.useEffect(() => {
    onTryLoadWedges(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.wEdges) {
      setDevices(response.wEdges);
      setTotalCount(response.totalCount);
    }
  }, [response]);

  const handleChange = (checked: boolean, value: DeploymentTypes) => {
    if (value === radioGroupValue) return;
    setSelectedRegions(props.selectedRegion);
    setRadioGroupValue(value);
  };

  const onSelectRegion = (r: string[]) => {
    setSelectedRegions(r);
  };

  const onSelectRowChange = (item: INetworkwEdge) => {
    const _arr: string[] = selectedTransitsIds.slice();
    const _i = _arr.findIndex(it => it === item.extId);
    if (_i === -1) {
      _arr.push(item.extId);
    } else {
      _arr.splice(_i, 1);
    }
    setSelectedTransit(_arr);
  };

  const onSelectAll = (items: INetworkwEdge[]) => {
    setSelectedTransit(items.map(it => it.extId));
  };

  const onAddTransits = () => {
    if (radioGroupValue === DeploymentTypes.Regions) {
      if (!selectedRegions || !selectedRegions.length) return;
      props.onAddTransits(selectedRegions, radioGroupValue);
      return;
    }
    if (!selectedTransitsIds || !selectedTransitsIds.length) return;
    props.onAddTransits(selectedTransitsIds, radioGroupValue);
  };

  const onChangeCurrentPage = (_page: number) => {
    setCurrentPage(_page);
    onTryLoadWedges(pageSize, _page);
  };

  const onChangePageSize = (size: number, page?: number) => {
    if (page) {
      setCurrentPage(page);
      setPageSize(size);
      onTryLoadWedges(size, page);
      return;
    }
    setPageSize(size);
    onTryLoadWedges(size, currentPage);
  };

  const onTryLoadWedges = async (pageSize: number, currentPage: number) => {
    const _param = buildPagingParam(pageSize, currentPage);
    await onGet(EdgesApi.getWedges(), userContext.accessToken!, _param);
  };

  return (
    <>
      <ModalContent>
        <ModalRow>
          <RadioButton
            wrapstyles={{ margin: '0 30px 0 0' }}
            checked={radioGroupValue === DeploymentTypes.Wedge}
            onValueChange={handleChange}
            value={DeploymentTypes.Wedge}
            label="Use Existing"
            name="radio-buttons"
          />
          <RadioButton checked={radioGroupValue === DeploymentTypes.Regions} onValueChange={handleChange} value={DeploymentTypes.Regions} name="radio-buttons" label="Create New" />
        </ModalRow>
        {radioGroupValue === DeploymentTypes.Regions && (
          <Map mapWrapStyles={{ height: 'calc(100% - 54px)', margin: '0' }} hideLargeButton regions={edges.regions} selectedRegions={selectedRegions} onSelectRegion={onSelectRegion} />
        )}

        {radioGroupValue === DeploymentTypes.Wedge && (
          <WedgesGridWrapper
            pageSize={pageSize}
            currentPage={currentPage}
            onSelectChange={onSelectRowChange}
            onSelectAll={onSelectAll}
            onChangeCurrentPage={onChangeCurrentPage}
            onChangePageSize={onChangePageSize}
            data={wedges}
            totalCount={totalCount}
            selectedIds={selectedTransitsIds}
            loading={loading}
            error={error && error.message ? error.message : null}
          />
        )}
      </ModalContent>
      <ModalFooter>
        <PrimaryButton
          styles={{ width: '100%', height: '100%' }}
          disabled={(radioGroupValue === DeploymentTypes.Regions && !selectedRegions.length) || (radioGroupValue === DeploymentTypes.Wedge && !selectedTransitsIds.length)}
          label="Add Transit"
          onClick={onAddTransits}
        />
      </ModalFooter>
    </>
  );
};

export default React.memo(TransitModalWindow);
