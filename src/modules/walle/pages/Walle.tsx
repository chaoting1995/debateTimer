import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText, Info } from '@phosphor-icons/react';

import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Walle as TypeWalle } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE, WALLE_LABEL } from 'modules/walle/resources/walle.constant';
import { WalleModeComplete, WalleModeCombined } from 'modules/walle';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { HeadTags, ListEmptyBox } from 'components';
import useWalles from 'modules/walle/context/Walles/useWalles';
import useInnerHeight from 'hooks/useInnerHeight';
import usePopup from 'context/Popup/usePopup';
import Layout from 'layouts/Layout';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const Walle: React.FC = () => {
  const popup = usePopup();
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const wallesProvider = useWalles();
  // list 有資料，則預設顯示第一個；無資料，則預設顯示預設值
  const [walle, setWalle] = React.useState<TypeWalle>(DEFAULT_WALLE);

  const creator: Record<EnumWalleMode, React.ReactNode> = {
    [EnumWalleMode.Combined]: <WalleModeCombined className='walle-mode' walle={walle} />,
    [EnumWalleMode.Complete]: <WalleModeComplete className='walle-mode' walle={walle} />,
  }

  const trackingHeaderButtonToList = () => ServiceGA4.event(GA_EVENT.Header_Button_To_Walles);
  const trackingHeaderButtonAdd = () => ServiceGA4.event(GA_EVENT.Header_Button_Add_Walle);
  
  const handleInfo = () => {
     popup.dialog({
      title: '簡介',
      message: <>
        「瓦力計畫」源自東吳大學吳子申學長的奇想，用來將學弟妹培訓成祕密武器，即自願參加的學弟妹一整年不對外出賽，閉關練功只鑽研一道辯題以上通天道，等出關之時必可一鳴驚人。因為培訓期間孤單寂寞，有如電影《瓦力》中的瓦力獨自在地球收垃圾七百年，故命名為「瓦力計畫」。後因此計畫過於侵害人權、匪夷所思，無疾而終。
        <br/><br/>
        現在的「瓦力二號」是東吳大學張哲耀學長記取了歷史教訓所研發的實用訓練方式，不需閉關便可練功，而且獨樂樂不如眾樂樂，有如瓦力飛向宇宙廣交朋友，又結伴回家建設地球，再加上為了紀念前人的苦心，所以命名為「瓦力二號」。
      </>,
      hideCloseButton: true,
    });
  }
  React.useEffect(() => {
    const _walle = !id 
      ? wallesProvider.getFixedWalle('debate-fixed-walle-combined')
      : wallesProvider.getFixedWalle(id) || wallesProvider.getItem(id);
    if (!_walle) return;
    setWalle(_walle);
  }, [id, wallesProvider]);

  return <Layout 
    title={<div className='walle-title'>
      {PAGE_TITLE.walle}
      <IconButton onClick={handleInfo}>
        <Info size={20} weight='light' />
      </IconButton>
    </div>} 
    layoutClassName={layoutStyle}
    mainClassName={cx('DT-Walle', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.walles} onClick={trackingHeaderButtonToList}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.walle} description={PAGE_DESCRIPTION.walle} />
    {wallesProvider.list.length === 0 && !wallesProvider.getFixedWalle('debate-fixed-walle-combined') ? (
      <ListEmptyBox label={WALLE_LABEL} mode='empty' pageLink={pageLinks.walleAdd} onTrack={trackingHeaderButtonAdd} />
    ) : id && !walle.id ? (
      <ListEmptyBox label={WALLE_LABEL} mode='error' pageLink={pageLinks.walles} onTrack={trackingHeaderButtonToList} />
    ) : (
      creator[walle.mode]
    )}
  </Layout>;
}

export default Walle;
const layoutStyle = css`
  .walle-title {
    display: flex;
    align-items: center;
    gap: 5px;
    
    svg {
      color: ${styleSettingColor.text.primary};
    }
  }
`;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .walle-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

/*
需測試情境：
id 缺乏 -> 取「列表中，第一個」
id 錯誤 -> 秀「網址錯誤」
id 正確 -> 取「列表中，合id者」
列表為空 -> 秀「尚無XX」
全閉眼+重整 -> 正確顯示
*/