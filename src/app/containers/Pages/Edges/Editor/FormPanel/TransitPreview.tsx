import React from 'react';
import { PreviewRow, PreviewTag, PreviewText, PreviewWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { NwServicesVendor, DeploymentTypes, NwServiceT } from 'lib/api/ApiModels/Edges/apiModel';
import { wedgeIcon } from 'app/components/SVGIcons/topologyIcons/wedge';

interface IMapRegion {
  code: string;
  city: string;
}
interface Props {}

const TransitPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [selectedRegions, setSelectedRegions] = React.useState<IMapRegion[]>([]);
  const [selectedWedges, setSelectedWedges] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (!edges.editEdge.deploymentPolicy || !edges.editEdge.deploymentPolicy.length) {
      setSelectedRegions([]);
      setSelectedWedges([]);
      return;
    }
    if (edges.editEdge.deploymentPolicy[0].deploymentType === DeploymentTypes.NEW_REGIONS) {
      if (!edges.editEdge.deploymentPolicy[0].regionCode || !edges.editEdge.deploymentPolicy[0].regionCode.length) {
        setSelectedRegions([]);
        return;
      }
      const _arr: IMapRegion[] = [];
      if (edges.regions && edges.regions.length) {
        edges.editEdge.deploymentPolicy[0].regionCode.forEach(it => {
          const _item = edges.regions.find(reg => reg.code === it);
          if (_item) {
            _arr.push({ code: it, city: _item.city });
          } else {
            _arr.push({ code: it, city: null });
          }
        });
      }
      setSelectedRegions(_arr);
      setSelectedWedges([]);
      return;
    }
    if (edges.editEdge.deploymentPolicy[0].deploymentType === DeploymentTypes.EXISTING_GWS) {
      if (!edges.editEdge.deploymentPolicy[0].wanGwExtIds || !edges.editEdge.deploymentPolicy[0].wanGwExtIds.length) {
        setSelectedWedges([]);
        return;
      }
      const _arr: string[] = [];
      if (edges.wedges && edges.wedges.length) {
        edges.editEdge.deploymentPolicy[0].wanGwExtIds.forEach(it => {
          const _item = edges.wedges.find(reg => reg.extId === it);
          if (_item) {
            _arr.push(_item.name);
          } else {
            _arr.push(it);
          }
        });
      }
      setSelectedWedges(_arr);
      setSelectedRegions([]);
    }
  }, [edges.editEdge.deploymentPolicy]);

  if (!edges.editEdge.deploymentPolicy || !edges.editEdge.deploymentPolicy.length) return null;
  return (
    <PreviewWrapper>
      {edges.editEdge.deploymentPolicy[0].nwServicesPolicy[0].serviceType === NwServiceT.FIREWALL && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 16px 0 0">
            Add Firewall in each edge region:
          </PreviewText>
          <IconWrapper width="20px" height="18px" icon={poloAltoIcon()} />
          {edges.editEdge.deploymentPolicy[0].nwServicesPolicy[0].serviceVendor === NwServicesVendor.PALO_ALTO_NW && (
            <PreviewText className="label" margin="0 0 0 12px">
              Palo Alto
            </PreviewText>
          )}
        </PreviewRow>
      )}
      {edges.editEdge.deploymentPolicy[0].controllerName && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Account:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{edges.editEdge.deploymentPolicy[0].controllerName}</PreviewText>
        </PreviewRow>
      )}
      {edges.editEdge.deploymentPolicy[0].deploymentType === DeploymentTypes.NEW_REGIONS && selectedRegions && selectedRegions.length ? (
        <PreviewRow margin="8px 0 0 0" wrap="wrap">
          {selectedRegions.map(it => (
            <PreviewTag key={`previewTag${it.code}`}>
              <IconWrapper styles={{ margin: 'auto 12px auto 0', verticalAlign: 'top' }} width="20px" height="20px" icon={logoIcon()} />
              {it.city && (
                <PreviewText className="label" margin="auto 4px auto 0">
                  {it.city}
                </PreviewText>
              )}
              <PreviewText margin="auto 0" color="var(--_disabledTextColor)">
                ( {it.code} )
              </PreviewText>
            </PreviewTag>
          ))}
        </PreviewRow>
      ) : null}
      {edges.editEdge.deploymentPolicy[0].deploymentType === DeploymentTypes.EXISTING_GWS && selectedWedges && selectedWedges.length ? (
        <PreviewRow margin="8px 0 0 0" wrap="wrap">
          {selectedWedges.map((it, index) => (
            <PreviewTag key={`previewTagwanGwExtIds${index}`}>
              <IconWrapper styles={{ margin: 'auto 12px auto 0', verticalAlign: 'top' }} width="20px" height="20px" icon={wedgeIcon()} />
              <PreviewText margin="auto 0">{it}</PreviewText>
            </PreviewTag>
          ))}
        </PreviewRow>
      ) : null}
    </PreviewWrapper>
  );
};
export default React.memo(TransitPreview);
