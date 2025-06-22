import React from 'react'
import { css, cx } from '@emotion/css';
import { Gear } from '@phosphor-icons/react';
import { IconButton } from '@mui/material';

import { BottomDrawerHeader, BottomDrawerBody } from 'components';
import { Dummy, DummyContent } from 'modules/dummy/resources/dummy.type';
import useDialog from 'hooks/useDialog';
import { DummyContentList, DummyContentListSetting } from 'modules/dummy';
// import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

type Props = {
  className?: string;
  open?: boolean;
  children?: React.ReactNode;
  dummy: Dummy;
  onChangeDummyContent: (dummyContent: DummyContent) => void;
}

const DummyContentListDrawer: React.FC<Props> = (props) => {
  const [openSetting, handleOpenSetting, handleCloseSetting] = useDialog(false);

  const handleOpenSettingWithTraking = React.useCallback(() => {
    handleOpenSetting();
    // ServiceGA4.event(GA_EVENT.DummyListDrawer_Button_Settting);
  }, [handleOpenSetting]);

  // 依 props.open 判斷，每次開啟彈窗，就重置 openSetting
  React.useEffect(() => {
    if (props.open) handleCloseSetting();
  },[props.open, handleCloseSetting])

  if (openSetting) {
    return <DummyContentListSetting 
      className={cx(style, props.className)}
      onClose={handleCloseSetting}
      dummy={props.dummy} 
    />
  }

  return (
    <div className={cx('DT-DummyListDrawer', style, props.className)}>
      <BottomDrawerHeader
        children='攻防列表'
        rightSide={
          <IconButton onClick={handleOpenSettingWithTraking}>
            <Gear size={28} weight='light'/>
          </IconButton>
        }
      />
      <BottomDrawerBody>
        <DummyContentList 
          hideEmptyBox 
          dummyContents={props.dummy.contents} 
          onChangeDummyContent={props.onChangeDummyContent} 
          />
      </BottomDrawerBody>
    </div>
  )
}

export default DummyContentListDrawer;

const style = css`
  overflow: hidden;
  border-radius: inherit;
`;