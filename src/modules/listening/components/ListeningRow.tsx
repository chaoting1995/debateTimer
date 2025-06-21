import React from 'react'
import { css, cx } from '@emotion/css';
import { Input, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import { styleSettingColor } from 'styles/variables.style';
import { EnumArgumentStatus } from 'modules/listening/enums/enumArgumentStatus';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { ListeningRowStatus, argumentStatusWording } from 'modules/listening';

type Option = { 
  value: EnumArgumentStatus; 
  label: string;
};

const options: Array<Option> = Object.keys(EnumArgumentStatus).map(item => {
  return {
    value: item as EnumArgumentStatus,
    label: argumentStatusWording[item as EnumArgumentStatus],
  }
});

type Prpos = {
  className?: string;
  index: number;
  listeningRow: TypeListeningRow;
  onChangeListeningRow: (listeningRow: TypeListeningRow) => void;
  onSelectListeningRow: (listeningRow: TypeListeningRow) => void;
}

const ListeningRow: React.FC<Prpos> = (props) => {
  const handleFocus = () => {
    props.onSelectListeningRow(props.listeningRow);
  };

  const handeChangeRowColumn1 = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newListeningRow: TypeListeningRow = {
      ...props.listeningRow,
      column1: event.target.value,
    }
    props.onChangeListeningRow(newListeningRow)
  },[props]);

  const handeChangeRowColumn2 = React.useCallback((event: SelectChangeEvent<EnumArgumentStatus>) => {
    const newListeningRow: TypeListeningRow = {
      ...props.listeningRow,
      column2: event.target.value as EnumArgumentStatus,
    }
    props.onChangeListeningRow(newListeningRow)
  },[props]);

  return <div 
    style={{ backgroundColor: props.listeningRow.bg }} 
    className={cx('DT-ListeningRow', style, props.className)}
  >
    <Input
      multiline
      id={`listening-row-column-title-${props.listeningRow.id}`}
      className='column column-1'
      value={props.listeningRow.column1} 
      onChange={handeChangeRowColumn1}
      onFocus={handleFocus}
    />
    <Select
      className='column column-2'
      name={`listening-row-column-status-${props.listeningRow.id}`}
      value={props.listeningRow.column2}
      onChange={handeChangeRowColumn2}
      onFocus={handleFocus}
    >
      {options.map((option) =>
        <MenuItem key={option.value} value={option.value} sx={{ minHeight: 'unset' }}>
          <ListeningRowStatus className='status-tag' status={option.value}>
            {option.label}
          </ListeningRowStatus>
        </MenuItem>
      )}
    </Select>
  </div>;
}

const areEqual = (prevProps: Prpos, nextProps: Prpos): boolean => {
  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.listeningRow.id !== nextProps.listeningRow.id) return false;
  if (prevProps.listeningRow.column1 !== nextProps.listeningRow.column1) return false;
  if (prevProps.listeningRow.column2 !== nextProps.listeningRow.column2) return false;
  if (prevProps.listeningRow.bg !== nextProps.listeningRow.bg) return false;
  // if (prevProps.onChangeListeningRow !== nextProps.onChangeListeningRow) return false
  return true;
}

export default React.memo(ListeningRow, areEqual);

export const style = css`
  width: 100%;
  display: flex;
  position: relative;
  gap: 1px;

  .column.column-head {
    font-size: 16px;
    padding: 8px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-weight: bold;
  }

  &:not(:has(.Mui-focused)):focus-within {
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      outline: 1px solid ${styleSettingColor.background.dark};
      z-index: 1;
    }
  }

  .column {
    min-height: 35px;
    box-sizing: border-box;
    outline: 1px solid ${styleSettingColor.disabled};
    border-radius: 0;
    vertical-align: middle;
    
    &.column-1 {
      width: 100%;
    }
    
    &.column-2 {
      white-space: nowrap;
      min-width: 130px;
      flex-shrink: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
    
    &.MuiInputBase-root {
      font-size: 16px;
      padding: 8px 10px;
      box-sizing: border-box;

      &:after {
        border-bottom: unset;
      }

      &:hover:before,
      &:before {
        border-bottom: unset;
      }

      fieldset {
        border-width: 0;
      }
      
      &.Mui-focused {
        z-index: 1;
        border-radius: 0;
        outline: 1px solid ${styleSettingColor.background.dark};
      }

      .MuiInputBase-input {
        padding: 0;
      }
    }

    &.column-2.MuiInputBase-root {
      align-items: flex-start;
    }

    &.MuiInputBase-root .status-tag {
      width: 100%;
    }

    &.MuiInputBase-root .MuiSvgIcon-root {
      top: 8px;
      right: 10px;
    }

    &.column-2 {
      height: auto;
      
      .status-tag.${EnumArgumentStatus.Unselected} {
        display: none;
      }
    }
  }
`;
