import React from 'react'
import { css, cx } from '@emotion/css';
import { DotsSixVertical, ArrowUp, ArrowDown } from '@phosphor-icons/react';
import { IconButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { BottomDrawer } from 'components';
import useDialog from 'hooks/useDialog';
import useDragClick from 'modules/listening/hooks/useDragClick';
import { styleSettingColor } from 'styles/variables.style';
import { DragDrog, Button } from 'components';
import { ListeningRow as TypeListeningRow } from 'modules/listening/resources/listening.type';
import { style as styleRow } from 'modules/listening/components/ListeningRow';
import { 
  DEFAULT_LISTENING_ROW, 
  LISTENING_ROWS_HEAD,
  ListeningRow,
  ListeningRowSetting
} from 'modules/listening';

type Prpos = {
  className?: string;
  listeningRows: TypeListeningRow[];
  setColumnRows: React.Dispatch<React.SetStateAction<TypeListeningRow[]>>;
}

const ListeningRows: React.FC<Prpos> = (props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);
  const dragClick = useDragClick(handleOpenSetting);
  
  const [currentListeningRow, setCurrentListeningRow] = React.useState<TypeListeningRow>(DEFAULT_LISTENING_ROW);
  
  const handleSelectListeningRow = React.useCallback((listeningRow: TypeListeningRow) => {
    setCurrentListeningRow(listeningRow);
  }, []);

  const handeChangeListeningRow = React.useCallback((listeningRow: TypeListeningRow) => {
    props.setColumnRows(prevState => {
      const newState =[...prevState];
      const index = newState.findIndex(item => item.id ===  listeningRow.id);
      if (index < 0) return newState;
      if (newState[index]) newState[index] = listeningRow;
      return newState;
    });
  },[props]);

  const handleBackgoundColor = (listeningRow: TypeListeningRow) => (bg: string) => () => {
    handeChangeListeningRow({ ...listeningRow, bg });
    handleCloseSetting();
  }

  const handleClearContents = (listeningRow: TypeListeningRow) => () => {
    handeChangeListeningRow({ ...DEFAULT_LISTENING_ROW, id: listeningRow.id });
    handleCloseSetting();
  }

  const handleDragEnd = (sourceIndex: number, destinationIndex: number) => {
    props.setColumnRows(prevState => {
      // 拷貝新的 listData (來自 state) 
      const newState = Array.from(prevState);
      // 從 source.index 剪下被拖曳的元素
      const [removed] = newState.splice(sourceIndex, 1);
      //在 destination.index 位置貼上被拖曳的元素
      newState.splice(destinationIndex, 0, removed);
      
      // 更新狀態
      return newState;
    }); 
  }

  const hadleInsertAbove = (index: number) => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      const newItem = { ...DEFAULT_LISTENING_ROW, id: uuidv4() };
      newState.splice(index, 0, newItem);
      return newState;
    })
    handleCloseSetting();
  }
  
  const hadleInsertBelow = (index: number) => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      const newItem = { ...DEFAULT_LISTENING_ROW, id: uuidv4() };
      newState.splice(index + 1, 0, newItem);
      return newState;
    })
    handleCloseSetting();
  }

  const hadleDuplicate = (index: number) => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      const newItem = { ...prevState[index], id: uuidv4() };
      newState.splice(index + 1, 0, newItem);
      return newState;
    })
    handleCloseSetting();
  }
  
  const handleDelete = (index: number) => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    })
    handleCloseSetting();
  }

  const handleChangeRowAmount = (key: 'add' | 'minus') => () => {
    props.setColumnRows(prevState => {
      const newState = [...prevState];
      if(key === 'add') newState.push({ ...DEFAULT_LISTENING_ROW, id: uuidv4()});
      if(key === 'minus') newState.pop();
      return newState;
    })
  }

  return <div className={cx('DT-ListeningRows', style, props.className)}>
    <div className='listening-table'>
      <div className={styleRow} style={{ backgroundColor: LISTENING_ROWS_HEAD.bg || 'unset' }}>
        <div className='column column-head column-1'>{LISTENING_ROWS_HEAD.column1}</div>
        <div className='column column-head column-2'>{LISTENING_ROWS_HEAD.column2}</div>
      </div>
      <div className='listening-table-body'>
        <DragDrog
          className='listening-drag-drog'
          onDragEnd={handleDragEnd}
          list={props.listeningRows}
          renderRow={(item, index, dragHandleProps) => (
            <div className={styleWrapListeningRow}>
              <ListeningRow 
                key={item.id}
                index={index}
                listeningRow={item}
                onChangeListeningRow={handeChangeListeningRow}
                onSelectListeningRow={handleSelectListeningRow}
              />
              <div className='row-setting-buttons'>
                <IconButton onClick={hadleInsertAbove(index)}>
                  <ArrowUp />
                </IconButton>
                <IconButton onClick={hadleInsertBelow(index)}>
                  <ArrowDown />
                </IconButton>
                <IconButton onClick={handleOpenSetting}>
                  設定
                </IconButton>
              </div>
              <div 
                className='row-selector' 
                {...dragHandleProps}
                onMouseDown={dragClick.onMouseDown}
                onMouseUp={dragClick.onMouseUp}
                onTouchStart={dragClick.onTouchStart}
                onTouchEnd={dragClick.onTouchEnd}  
              >
                <DotsSixVertical size={16} weight='bold' />
              </div>
              {item.id === currentListeningRow.id &&
                <BottomDrawer open={openSetting} onOpen={handleOpenSetting} onClose={handleCloseSetting}>
                  <ListeningRowSetting 
                    listeningRow={item}
                    onInsertAbove={hadleInsertAbove(index)}
                    onInsertBelow={hadleInsertBelow(index)}
                    onDuplicate={hadleDuplicate(index)}
                    onDelete={handleDelete(index)}
                    onBackgoundColor={handleBackgoundColor(item)}
                    onClearContents={handleClearContents(item)}
                  />
                </BottomDrawer>
              }
            </div>
          )}
        />
      </div>
    </div>
    <div className='row-amount-button-group'>
      {[
        { label: '-', action: handleChangeRowAmount('minus') },
        { label: '+', action: handleChangeRowAmount('add') },
      ].map(item => (
        <Button key={item.label} variant='contained' color='secondary' onClick={item.action}>
          {item.label}
        </Button>
      ))}
    </div>
  </div>
};

export default React.memo(ListeningRows);

const style = css`
  width: 100%;

  .listening-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .listening-table-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .MuiInput-root {
    font-size: 16px;
  }
  
  .listening-drag-drog {
    .dd-droppable {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
  
      .dd-drappable {
        width: 100%;
      }
    }
  }

  .row-amount-button-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    .MuiButton-root {
      margin-top: 8px;
      width: 100%;
      margin-bottom: 16px;
      font-weight: bold;
      
      &:not(.Mui-disabled) {
        background-color: ${styleSettingColor.disabled};
      }
    }
  }
`;

const styleWrapListeningRow = css`
  width: 100%;
  position: relative;

  // row 表單未聚焦時，.row-selector 隱藏
  .row-setting-buttons,
  .row-selector {
    opacity: 0;
    pointer-events: none;
  }

  // row 表單被聚焦時，.row-selector, .row-setting-buttons 出現
  &:focus-within .row-setting-buttons,
  &:focus-within .row-selector {
    opacity: 1;
    pointer-events: auto;
  }

  // row-selector 未點擊時，白色
  .row-selector {
    background-color: #FFFFFF;
    color: ${styleSettingColor.text.gray};

    // row-selector 被點擊時，藍色
    &:active {
      background-color: ${styleSettingColor.background.default};
      color: #FFFFFF;
    }
  }

  .row-setting-buttons,
  .row-setting-buttons:hover {
    transition: opacity 150ms;
    position: absolute;
    right: 5px;
    top: -35px;
    z-index: 1; 
    display: flex;
    gap: 8px;

    .MuiButtonBase-root {
      padding: 3px 10px;
      box-sizing: border-box;
      background-color: #FFFFFF;
      border-radius: 5px;
      cursor: pointer;
      white-space: nowrap;
      font-size: 16px;
      outline: 1px solid ${styleSettingColor.disabled};
      box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
    }
  }

  .row-selector {
    width: 16px;
    height: 24px;
    padding: 4px 2px;
    box-sizing: border-box;
    border-radius: 5px;
    outline: 1px solid ${styleSettingColor.disabled};
    transition: opacity 150ms;
    cursor: pointer;

    position: absolute;
    left: -9px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    
    display: flex;
    justify-content: center;
    align-items: center;

    .drag-handle {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

`;