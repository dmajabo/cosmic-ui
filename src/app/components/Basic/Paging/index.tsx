import React from 'react';
import Pagination from '@mui/material/Pagination';
import { PagingWrapper, SelectLabel, SelectWrapper } from './styles';
import DisplayRange from './DisplayRange';
import Dropdown from 'app/components/Inputs/Dropdown';
import { PagingStyles } from './PagingStyles';

interface Props {
  count: number;
  disabled: boolean;
  pageSize: number;
  currentPage: number;
  pageSizeValues?: number[];
  onChangePage: (_page: number) => void;
  onChangePageSize: (_size: number, _page?: number) => void;
  hideLabelAfter?: boolean;
  boundaryCount?: number;
  siblingCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  pagingWrapStyles?: Object;
  selectWrapStyles?: Object;
  hideRange?: boolean;
}

const Paging: React.FC<Props> = (props: Props) => {
  const classes = PagingStyles();
  const onChangePage = (_e: any, page: number) => {
    if (props.disabled || !page || page === props.currentPage) return;
    props.onChangePage(page);
  };

  const onPageSizeChange = (size: number) => {
    if (props.disabled || size === props.pageSize) return;
    if (size > props.pageSize) {
      const max = Math.ceil(props.count / size);
      if (max < props.currentPage) {
        props.onChangePageSize(size, max);
        return;
      }
    }
    props.onChangePageSize(size);
  };

  return (
    <PagingWrapper style={props.pagingWrapStyles}>
      <Pagination
        className={classes.root}
        onChange={onChangePage}
        disabled={!props.count}
        count={Math.ceil(props.count / props.pageSize)}
        boundaryCount={props.boundaryCount || props.boundaryCount === 0 ? props.boundaryCount : 1}
        page={props.currentPage}
        defaultPage={1}
        siblingCount={props.siblingCount || props.siblingCount === 0 ? props.siblingCount : 1}
        showFirstButton={props.showFirstButton !== undefined ? props.showFirstButton : true}
        showLastButton={props.showLastButton !== undefined ? props.showLastButton : true}
      />
      <SelectWrapper style={props.selectWrapStyles}>
        <Dropdown
          wrapStyles={{ width: '100px', flexShrink: 0 }}
          selectStyles={{ borderColor: 'var(--_primaryButtonBorder)' }}
          labelBefore={<SelectLabel margin="auto 12px auto 0">View</SelectLabel>}
          labelAfter={!props.hideLabelAfter ? <SelectLabel margin="auto 0 auto 12px">items per page</SelectLabel> : null}
          disabled={props.disabled}
          selectedValue={props.pageSize}
          values={props.pageSizeValues || [20, 50, 100]}
          onSelectValue={onPageSizeChange}
          position="above"
        />
      </SelectWrapper>
      {!props.hideRange && <DisplayRange count={props.count} currentPage={props.currentPage} pageSize={props.pageSize} />}
    </PagingWrapper>
  );
};

export default React.memo(Paging);
