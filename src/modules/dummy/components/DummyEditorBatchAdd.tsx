import React from 'react'
import { css, cx } from '@emotion/css';
import { TextField, IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { v4 as uuidv4 } from 'uuid';

import useFormColumn from 'modules/form/useFormColumn';
import { styleSettingColor } from 'styles/variables.style';
import { DummyContent } from 'modules/dummy/resources/dummy.type';
import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';

type Props = {
  className?: string;
  onClose: () => void;
  onSave: (columnContents: DummyContent[]) => void;
}

const DummyEditorBatchAdd = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const columnContentsBatch = useFormColumn<string>({
    value: '',
    defaultValue: '',
    placeholder: '請輸入攻防',
    verifyRules: { require: true },
  });
  
  const handleChangeContentsBatch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnContentsBatch.onChange(event.target.value);
  },[columnContentsBatch]);

  const handleInsertCut = () => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const currentValue = columnContentsBatch.value;

    // 插入 ✂ 符號
    const newValue = currentValue.slice(0, start) + '✂' + currentValue.slice(end);
    input.value = newValue;

    // 重設游標位置到 ✂ 後面
    columnContentsBatch.onChange(newValue);
    
    // 必須等更新完成後重設 caret 位置
    // 用 setTimeout 等 TextField 更新完畢
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + 1, start + 1);
    }, 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // 避免按鈕奪走 focus
    e.preventDefault();
  };
  
  const handleSave = React.useCallback(() => {
    let isValid = true;
    if (!columnContentsBatch.onVarify()) isValid = false;
    if (!isValid) return;

    // columnContentsBatch，轉換成 DummyContent 陣列
    const contents: string[] = columnContentsBatch.value.split(/✂️?/);
    const newDummyContent: DummyContent[] = contents.map(item => ({
      id: `debate-dummy-content-${uuidv4()}`,
      disabled: false,
      content: item,
    } as DummyContent))

    props.onSave(newDummyContent);
    props.onClose();
  }, [columnContentsBatch, props]);
  
  return (
    <div className={cx('DT-DummyEditorBatchAdd', style, props.className)}>
      <BottomDrawerHeader
        children='批量新增'
        rightSide={
          <IconButton onClick={props.onClose}>
            <XCircle size={28} weight='light' />
          </IconButton>
        }
      />
      <BottomDrawerBody paddingTop paddingHorizental>
        <TextField
          inputRef={inputRef}
          variant='outlined'
          multiline
          fullWidth
          margin='normal'
          placeholder={columnContentsBatch.placeholder}
          value={columnContentsBatch.value}
          onChange={handleChangeContentsBatch}
          error={columnContentsBatch.status.hasError}
          helperText={columnContentsBatch.status.message}
        />
        <Button variant='outlined' fullWidth className='cut-button' color='secondary' disabled={!columnContentsBatch.value} onMouseDown={handleMouseDown} onClick={handleInsertCut}>
          插入剪裁符 ✂
        </Button>
        <Button variant='outlined' fullWidth className='save-button' onClick={handleSave}>
          新增
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default DummyEditorBatchAdd;

const style = css`    
  .setting-title {
    margin-bottom: 10px;
    font-size: 18px;
    color: ${styleSettingColor.background.dark};
  }
  
  .setting-subtitle {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${styleSettingColor.text.secondary};
  }
  
  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cut-button.MuiButton-root,
  .cut-button.MuiButton-root:hover {
    margin-top: 20px;
    font-size: 18px;
  }

  .save-button.MuiButton-root,
  .save-button.MuiButton-root:hover {
    margin-top: 20px;
    font-size: 18px;
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;

