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
import { INetworkwEdge } from 'lib/api/ApiModels/Topology/apiModels';
import { paramBuilder } from 'lib/api/ApiModels/paramBuilders';
import { TopoApi } from 'lib/api/ApiModels/Services/topo';
interface Props {
  selectedRegion: string[];
  selectedWedgeIds: string[];
  onAddTransits: (items: string[], field: DeploymentTypes) => void;
}

const TransitModalWindow: React.FC<Props> = (props: Props) => {
  const userContext = React.useContext<UserContextState>(UserContext);
  const { edges } = useEdgesDataContext();
  const [radioGroupValue, setRadioGroupValue] = React.useState<DeploymentTypes>(DeploymentTypes.EXISTING_GWS);
  const { response, error, loading, onGet } = useGet<IWEdgesRes>();
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>(props.selectedRegion || []);
  const [selectedTransitsIds, setSelectedTransit] = React.useState<string[]>(props.selectedWedgeIds || []);
  const [wedges, setWedges] = React.useState<INetworkwEdge[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  React.useEffect(() => {
    onTryLoadWedges(pageSize, currentPage);
  }, []);

  React.useEffect(() => {
    if (response && response.wEdges && response.wEdges.length) {
      setWedges(response.wEdges);
      setTotalCount(response.totalCount);
    } else {
      setWedges([]);
      setTotalCount(0);
    }
  }, [response]);

  const handleChange = (checked: boolean, value: DeploymentTypes) => {
    if (value === radioGroupValue) return;
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
    if (radioGroupValue === DeploymentTypes.NEW_REGIONS) {
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
    const _param = paramBuilder(pageSize, currentPage);
    await onGet(TopoApi.getWedges(), userContext.accessToken!, _param);
  };

  return (
    <>
      <ModalContent>
        <ModalRow>
          <RadioButton
            wrapstyles={{ margin: '0 30px 0 0' }}
            checked={radioGroupValue === DeploymentTypes.EXISTING_GWS}
            onValueChange={handleChange}
            value={DeploymentTypes.EXISTING_GWS}
            label="Use Existing"
            name="radio-buttons"
          />
          <RadioButton checked={radioGroupValue === DeploymentTypes.NEW_REGIONS} onValueChange={handleChange} value={DeploymentTypes.NEW_REGIONS} name="radio-buttons" label="Create New" />
        </ModalRow>
        {radioGroupValue === DeploymentTypes.NEW_REGIONS && (
          <Map mapWrapStyles={{ height: 'calc(100% - 54px)', margin: '0' }} hideLargeButton regions={edges.regions} selectedRegions={selectedRegions} onSelectRegion={onSelectRegion} />
        )}

        {radioGroupValue === DeploymentTypes.EXISTING_GWS && (
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
          disabled={(radioGroupValue === DeploymentTypes.NEW_REGIONS && !selectedRegions.length) || (radioGroupValue === DeploymentTypes.EXISTING_GWS && !selectedTransitsIds.length)}
          label="Add Edge"
          onClick={onAddTransits}
        />
      </ModalFooter>
    </>
  );
};

export default React.memo(TransitModalWindow);
