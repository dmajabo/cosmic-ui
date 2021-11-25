import React from 'react';
import { PreviewRow, PreviewTag, PreviewText, PreviewWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';
import { IDeploymentP, INwServicesP, NwServicesVendor, NwServiceT } from 'lib/api/ApiModels/Edges/apiModel';

interface IMapRegion {
  code: string;
  city: string;
}
interface Props {
  deploymentPolicy: IDeploymentP[];
  nwServicesPolicy: INwServicesP[];
}

const TransitPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [selectedRegions, setSelectedRegions] = React.useState<IMapRegion[]>([]);
  React.useEffect(() => {
    if (!props.deploymentPolicy || !props.deploymentPolicy.length) {
      setSelectedRegions([]);
      return;
    }
    // to do
    if (!props.deploymentPolicy[0].regionCode || !props.deploymentPolicy[0].regionCode.length) {
      setSelectedRegions([]);
      return;
    }
    const _arr: IMapRegion[] = [];
    if (edges.regions && edges.regions.length) {
      props.deploymentPolicy[0].regionCode.forEach(it => {
        const _item = edges.regions.find(reg => reg.code === it);
        if (_item) {
          _arr.push({ code: it, city: _item.city });
        } else {
          _arr.push({ code: it, city: null });
        }
      });
    }
    setSelectedRegions(_arr);
  }, [props.deploymentPolicy]);

  if ((!props.deploymentPolicy || !props.deploymentPolicy.length) && (!props.nwServicesPolicy || !props.nwServicesPolicy.length)) return null;
  return (
    <PreviewWrapper>
      {props.nwServicesPolicy[0].serviceType === NwServiceT.FIREWALL && (
        <PreviewRow margin="20px 0 0 0">
          <PreviewText className="label" margin="0 16px 0 0">
            Add Firewall in each edge region:
          </PreviewText>
          <IconWrapper width="20px" height="18px" icon={poloAltoIcon()} />
          {props.nwServicesPolicy[0].serviceVendor === NwServicesVendor.PALO_ALTO_NW && (
            <PreviewText className="label" margin="0 0 0 12px">
              Palo Alto
            </PreviewText>
          )}
        </PreviewRow>
      )}
      {props.deploymentPolicy[0].controllerName && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Account:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{props.deploymentPolicy[0].controllerName}</PreviewText>
        </PreviewRow>
      )}
      {selectedRegions && selectedRegions.length ? (
        <PreviewRow margin="8px 0 0 0">
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
    </PreviewWrapper>
  );
};
export default React.memo(TransitPreview);
