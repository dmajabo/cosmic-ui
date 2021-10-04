import { IEntity } from 'lib/models/entites';
import { IWedgeNode, IVnetNode, IDeviceNode, INetworkGroupNode, ILink, ENTITY_NODE_TYPES, TOPOLOGY_LINKS_TYPES } from 'lib/models/topology';

export const updateEntity = (_entitys: IEntity[], index: number, _selected: boolean) => {
  _entitys[index].selected = _selected;
  if (_entitys[index].id !== ENTITY_NODE_TYPES.WEDGES && _entitys[index].id !== ENTITY_NODE_TYPES.BRANCHES) return;
  const _tNEntitys = _entitys.filter(it => it.id === ENTITY_NODE_TYPES.WEDGES || it.id === ENTITY_NODE_TYPES.BRANCHES);
  const vpnsEntity = _entitys.find(it => it.id === ENTITY_NODE_TYPES.VPNS);
  if (!_tNEntitys[0].selected || !_tNEntitys[1].selected) {
    vpnsEntity.disabled = true;
    return;
  } else if (_tNEntitys[0].selected && _tNEntitys[1].selected) {
    vpnsEntity.disabled = false;
  }
};
export const updateDataByEntity = (_entitys: IEntity[], _entity: IEntity, _nodes: (IWedgeNode | IVnetNode | IDeviceNode | INetworkGroupNode)[], _links: ILink[]) => {
  if (_entity.id === ENTITY_NODE_TYPES.BRANCHES || _entity.id === ENTITY_NODE_TYPES.WEDGES || _entity.id === ENTITY_NODE_TYPES.VNETS) {
    _nodes.forEach(it => {
      if (_entity.types.indexOf(it.nodeType) !== -1) {
        it.visible = _entity.selected;
      }
    });
    _links.forEach(it => {
      if (_entity.types.indexOf(it.targetType) !== -1 || _entity.types.indexOf(it.sourceType) !== -1) {
        const _snode = _nodes.find(n => n.id === it.sourceId);
        const _tnode = _nodes.find(n => n.id === it.targetId);
        it.visible = _snode.visible && _tnode.visible ? true : false;
      }
    });
    return;
  }
  const _tNEntitys = _entitys.filter(it => it.id === ENTITY_NODE_TYPES.WEDGES || it.id === ENTITY_NODE_TYPES.BRANCHES);
  if (!_tNEntitys[0].selected || !_tNEntitys[1].selected) return;
  _links.forEach(it => {
    if (it.type === TOPOLOGY_LINKS_TYPES.NETWORK_BRENCH_LINK) {
      it.visible = _entity.selected;
    }
  });
};
