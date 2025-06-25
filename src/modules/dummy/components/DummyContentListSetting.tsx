import React from 'react'
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import ServiceRoute from 'routes/route.service';
import { pageLinks } from 'routes/route.constants';
import { Dummy } from 'modules/dummy/resources/dummy.type';
import { styleSettingColor } from 'styles/variables.style';
import { BottomDrawerHeader, BottomDrawerBody, Button } from 'components';
import useCopyDummy from 'modules/dummy/hooks/useCopyDummy';

type Props = {
  className?: string;
  onClose: () => void;
  dummy: Dummy;
}

const DummyContentListSetting = (props: Props) => {  
  const onCopyDummy = useCopyDummy();
  const handleCopyDummy = () => onCopyDummy(props.dummy.name, props.dummy.contents);
  
  return (
    <div className={cx('DT-DummyContentListSetting', style, props.className)}>
      <BottomDrawerHeader
        children='進階設定'
        rightSide={
          <IconButton onClick={props.onClose}>
            <XCircle size={28} weight='light' />
          </IconButton>
        }
      />
      <BottomDrawerBody center gap paddingTop paddingHorizental>
        <Button 
          variant='outlined' 
          className='download-button' 
          component={Link} 
          to={ServiceRoute.toPageLinkWithParams(pageLinks.dummyEditID, { id: props.dummy.id })}
        >
          前往編輯
        </Button>
        <Button variant='outlined' className='download-button' onClick={handleCopyDummy}>
          複製全部
        </Button>
      </BottomDrawerBody>
    </div>
  )
}

export default DummyContentListSetting;

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
  
  .download-button.MuiButton-root {
    width: fit-content;
    color: ${styleSettingColor.background.dark};
  }

  .template-button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

