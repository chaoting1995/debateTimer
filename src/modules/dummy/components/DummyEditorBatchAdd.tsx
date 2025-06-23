import React from 'react'
import { css, cx } from '@emotion/css';
import { TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import usePopup from 'context/Popup/usePopup';
import useFormColumn from 'modules/form/useFormColumn';
import { styleSettingColor } from 'styles/variables.style';
import { DummyContent } from 'modules/dummy/resources/dummy.type';
import { Button } from 'components';

type Props = {
  className?: string;
  name: string;
  onClose: () => void;
  onSave: (columnContents: DummyContent[]) => void;
}

const DummyEditorBatchAdd = (props: Props) => {
  const popup = usePopup();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isEdited, setIsEdited] = React.useState(false);

  const columnContentsBatch = useFormColumn<string>({
    value: '',
    defaultValue: '',
    placeholder: '請輸入攻防',
    verifyRules: { require: true },
  });
  
  const handleChangeContentsBatch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    columnContentsBatch.onChange(event.target.value);
    setIsEdited(true);
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
  
  const handleCancel = React.useCallback(async () => {
    const hasContents = columnContentsBatch.value.trim();
    if (!isEdited || !hasContents) {
      props.onClose();
      return;
    }

    const isConfirm = await popup.confirm({ 
      title: `編輯尚未儲存，確定放棄編輯?`,
    });

    if (!isConfirm) return;

    props.onClose();
  }, [isEdited, popup, props, columnContentsBatch]);

  const handleSave = React.useCallback(() => {
    let isValid = true;
    if (!columnContentsBatch.onVarify()) isValid = false;
    if (!isValid) return;

    // columnContentsBatch，轉換成 DummyContent 陣列
    const contents: string[] = columnContentsBatch.value
      .split(/✂️?/)
      .map(item => item.trim()); // 去除每段前後空白;

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
      <TextField
        variant='standard'
        fullWidth
        multiline
        margin='normal'
        placeholder='未命名攻防群組'
        value={props.name}
        disabled
      />
      <TextField
        inputRef={inputRef}
        variant='outlined'
        multiline
        fullWidth
        margin='normal'
        InputProps={{
          sx: { backgroundColor: 'white' },
        }}
        placeholder={columnContentsBatch.placeholder}
        value={columnContentsBatch.value}
        onChange={handleChangeContentsBatch}
        error={columnContentsBatch.status.hasError}
        helperText={columnContentsBatch.status.message}
      />
      <Button variant='outlined' fullWidth className='cut-button' color='secondary' disabled={!columnContentsBatch.value} onMouseDown={handleMouseDown} onClick={handleInsertCut}>
        插入剪裁符 ✂
      </Button>
      <div className='buttons-group'>
        <Button variant='outlined' fullWidth className='back-button' color='secondary' onClick={handleCancel}>
          返回
        </Button>
        <Button variant='outlined' fullWidth className='save-button' onClick={handleSave}>
          批量新增
        </Button>
      </div>
    </div>
  )
}

export default DummyEditorBatchAdd;

const style = css`
  .MuiInput-root {
    font-size: 18px;
  }

  .cut-button.MuiButton-root,
  .cut-button.MuiButton-root:hover {
    margin-top: 15px;
    font-size: 18px;
  }

  .buttons-group {
    width: 100%;
    margin: 15px 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    .MuiButton-root,
    .MuiButton-root:hover {
      width: 100%;
      font-size: 18px;
    }
  }

  .save-button.MuiButton-root,
  .save-button.MuiButton-root:hover {
    font-size: 18px;
    background-color: ${styleSettingColor.background.dark}1a;
  }
`;

