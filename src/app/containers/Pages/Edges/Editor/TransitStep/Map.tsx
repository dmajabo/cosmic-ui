import React from 'react';
import { IAwsRegion } from 'lib/api/ApiModels/Accounts/apiModel';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ButtonsGroup, MapBg, MapWrapper, SelectdLabel, SelectedTagRow } from './styles';
import IconButton from 'app/components/Buttons/IconButton';
import { zoomFullScreenIcon, zoomInIcon, zoomOutIcon } from 'app/components/SVGIcons/zoom';
import MarkerNode from './MarkerNode';
import { jsonClone } from 'lib/helpers/cloneHelper';
import Tag from 'app/components/Basic/Tag';
import SecondaryButton from 'app/components/Buttons/SecondaryButton';
import { closeSmallIcon } from 'app/components/SVGIcons/close';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYWpheS10cCIsImEiOiJja3NzamxqM3UweGVvMnZtZGJic3NpNDlmIn0.NGQB4WDQmRsC3B78JVCJQg';

interface Props {
  regions: IAwsRegion[];
  selectedRegions: string[];
  onSelectRegion: (regions: string[]) => void;
  zoom?: number;
  hideLargeButton?: boolean;
  onOpenLargeWindow?: () => void;
  mapWrapStyles?: Object;
  showFooterRow?: boolean;
}

const Map: React.FC<Props> = (props: Props) => {
  const [viewport, setViewport] = React.useState({
    latitude: 40.43645231880299,
    longitude: -100.83270785871042,
    zoom: props.zoom || props.zoom === 0 ? props.zoom : 2.5,
  });

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

  const onViewportChange = e => {
    setViewport({ zoom: e.zoom, latitude: e.latitude, longitude: e.longitude });
  };

  const handlerMarkerClick = (r: IAwsRegion, index: number) => {
    const _arr: IAwsRegion[] = selectedList && selectedList.length ? jsonClone(selectedList) : [];
    let _items = [];
    const _index = _arr.findIndex(it => it.id === r.id);
    if (_index === -1) {
      _items = [...props.selectedRegions, r.code];
      _arr.push(r);
    } else {
      _items = props.selectedRegions.filter(it => it !== r.code);
      _arr.splice(_index, 1);
    }
    if (!_items.length) {
      setSelectedList([]);
    } else {
      setSelectedList(_arr);
    }
    props.onSelectRegion(_items);
  };

  const handlerMarkerRemove = (r: IAwsRegion, index: number) => {
    const _arr: IAwsRegion[] = selectedList && selectedList.length ? jsonClone(selectedList) : [];
    const _items = props.selectedRegions.filter(it => it !== r.code);
    const _selectedList = _arr.filter(it => it.id !== r.id);
    if (!_items.length) {
      setSelectedList([]);
    } else {
      setSelectedList(_selectedList);
    }
    props.onSelectRegion(_items);
  };

  const onClearAll = () => {
    setSelectedList([]);
    props.onSelectRegion([]);
  };

  const onZoomIn = () => {
    const _newZoom = viewport.zoom + 0.1;
    setViewport({ ...viewport, zoom: _newZoom });
  };

  const onZoomOut = () => {
    const _newZoom = viewport.zoom - 0.1;
    setViewport({ ...viewport, zoom: _newZoom });
  };

  const onOpenModal = () => {
    props.onOpenLargeWindow();
  };

  return (
    <>
      <MapWrapper style={props.mapWrapStyles}>
        <MapBg />
        <MapGL
          mapStyle="mapbox://styles/ajay-tp/ckstwed501bvf17qumoukq8gw"
          accessToken={MAPBOX_ACCESS_TOKEN}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          doubleClickZoom={false}
          onViewportChange={onViewportChange}
          style={{ width: '100%', height: '100%', pointerEvents: 'all', touchAction: 'initial' }}
        >
          {props.regions.map((it, index) => (
            <Marker key={`regionMarker${index}`} longitude={it.long} latitude={it.lat} draggable={false}>
              <MarkerNode index={index} region={it} onClick={handlerMarkerClick} selectedList={selectedList} />
            </Marker>
          ))}
        </MapGL>
        <ButtonsGroup>
          <IconButton styles={{ margin: '10px 0 0 0' }} icon={zoomInIcon} title="Zoom in" onClick={onZoomIn} />
          <IconButton iconStyles={{ verticalAlign: 'middle', height: '4px' }} styles={{ margin: '10px 0 0 0' }} icon={zoomOutIcon} title="Zoom out" onClick={onZoomOut} />
          {!props.hideLargeButton && <IconButton styles={{ margin: '30px 0 0 0' }} icon={zoomFullScreenIcon} title="Open fullscreen mode" onClick={onOpenModal} />}
        </ButtonsGroup>
      </MapWrapper>
      {props.showFooterRow && (
        <SelectedTagRow>
          <SelectdLabel>Selected Transits:</SelectdLabel>
          {selectedList && selectedList.length
            ? selectedList.map((it, index) => (
                <Tag
                  styles={{ margin: '0 6px 0 0' }}
                  bgColor="var(--_tableBg)"
                  opacity="1"
                  textColor="var(--_primaryColor)"
                  subTextColor="var(--_disabledTextColor)"
                  index={index}
                  key={`selectedTag${it.id}`}
                  text={it.name}
                  onRemove={(i, v) => handlerMarkerRemove(it, index)}
                />
              ))
            : null}
          {selectedList && selectedList.length ? (
            <SecondaryButton
              iconWidth="10px"
              iconHeight="10px"
              styles={{ display: 'flex', alignItems: 'center', height: '30px', padding: '4px 12px' }}
              withoutBorder
              label="Clear all"
              icon={closeSmallIcon}
              onClick={onClearAll}
            />
          ) : null}
        </SelectedTagRow>
      )}
    </>
  );
};

export default React.memo(Map);
