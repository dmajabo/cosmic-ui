import React from 'react';
import { PreviewRow, PreviewTag, PreviewText, PreviewWrapper } from './styles';
import { useEdgesDataContext } from 'lib/hooks/Edges/useEdgesDataContext';
import IconWrapper from 'app/components/Buttons/IconWrapper';
import { logoIcon } from 'app/components/SVGIcons/pagesIcons/logo';
import { poloAltoIcon } from 'app/components/SVGIcons/edges/poloAlto';

interface IMapRegion {
  code: string;
  city: string;
}
interface Props {
  firewall: boolean;
  firewallRegion: string;
  regionCodes: string[];
  selectedAccount: string;
}

const TransitPreview: React.FC<Props> = (props: Props) => {
  const { edges } = useEdgesDataContext();
  const [selectedRegions, setSelectedRegions] = React.useState<IMapRegion[]>([]);
  React.useEffect(() => {
    if (!props.regionCodes || !props.regionCodes.length) {
      setSelectedRegions([]);
      return;
    }
    if (props.regionCodes && props.regionCodes.length) {
      const _arr: IMapRegion[] = [];
      if (edges.regions && edges.regions.length) {
        props.regionCodes.forEach(it => {
          const _item = edges.regions.find(reg => reg.code === it);
          if (_item) {
            _arr.push({ code: it, city: _item.city });
          } else {
            _arr.push({ code: it, city: null });
          }
        });
      }
      setSelectedRegions(_arr);
    }
  }, [props.regionCodes]);

  if (!props.firewall && (!props.regionCodes || !props.regionCodes.length) && !props.selectedAccount) return null;
  return (
    <PreviewWrapper>
      {props.firewall && (
        <PreviewRow margin="20px 0 0 0">
          <PreviewText className="label" margin="0 16px 0 0">
            Add Firewall in each edge region:
          </PreviewText>
          <IconWrapper width="20px" height="18px" icon={poloAltoIcon} />
          <PreviewText className="label" margin="0 0 0 12px">
            {props.firewallRegion || 'Polo Alto'}
          </PreviewText>
        </PreviewRow>
      )}
      {props.selectedAccount && (
        <PreviewRow margin="8px 0 0 0">
          <PreviewText className="label" margin="0 4px 0 0">
            Account:
          </PreviewText>
          <PreviewText color="var(--_disabledTextColor)">{props.selectedAccount}</PreviewText>
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
