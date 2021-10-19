import React from 'react';
import Pagination from '@mui/material/Pagination';
import { PagingWrapper, SelectLabel, SelectWrapper } from './styles';
import DisplayRange from './DisplayRange';
import Dropdown from 'app/components/Inputs/Dropdown';

interface Props {
  count: number;
  disabled: boolean;
  pageSize: number;
  currentPage: number;
  onChangePage: (_page: number) => void;
  onChangePageSize: (_size: number, _page?: number) => void;
}

const Paging: React.FC<Props> = (props: Props) => {
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
    <PagingWrapper>
      <Pagination
        onChange={onChangePage}
        disabled={!props.count}
        count={Math.ceil(props.count / props.pageSize)}
        boundaryCount={1}
        page={props.currentPage}
        defaultPage={1}
        siblingCount={1}
        showFirstButton
        showLastButton
      />
      <SelectWrapper>
        <Dropdown
          wrapStyles={{ width: '100px', flexShrink: 0 }}
          selectStyles={{ borderColor: 'var(--_primaryButtonBorder)' }}
          labelBefore={<SelectLabel margin="auto 12px auto 0">View</SelectLabel>}
          labelAfter={<SelectLabel margin="auto 0 auto 12px">items per page</SelectLabel>}
          disabled={props.disabled}
          selectedValue={props.pageSize}
          values={[20, 50, 100]}
          onSelectValue={onPageSizeChange}
          position="above"
        />
      </SelectWrapper>
      <DisplayRange count={props.count} currentPage={props.currentPage} pageSize={props.pageSize} />
    </PagingWrapper>
  );
};

export default React.memo(Paging);
