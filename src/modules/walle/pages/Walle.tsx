import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Walle as TypeWalle } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE, WALLE_LABEL } from 'modules/walle/resources/walle.constant';
import { WalleModeComplete, WalleModeCombined } from 'modules/walle';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { HeadTags, ListEmptyBox } from "components";
import useWalles from 'modules/walle/context/Walles/useWalles';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import ServiceGA4, { GA_EVENT } from 'modules/ga4/services/ga4.service';

const Walle: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const wallesProvider = useWalles();
  // list 有資料，則預設顯示第一個；無資料，則預設顯示預設值
  const [walle, setWalle] = React.useState<TypeWalle>(DEFAULT_WALLE);

  const creator: Record<EnumWalleMode, React.ReactNode> = {
    [EnumWalleMode.Combined]: <WalleModeCombined className='walle-mode' walle={walle} />,
    [EnumWalleMode.Complete]: <WalleModeComplete className='walle-mode' walle={walle} />,
  }

  const trakingHeaderButtonToList = () => {
    ServiceGA4.event(GA_EVENT.Header_Button_Timers);
  };

  React.useEffect(() => {
    const _walle = !id 
      ? wallesProvider.getFixedWalle('debate-fixed-walle-combined')
      : wallesProvider.getFixedWalle(id) || wallesProvider.getItem(id);
    if (!_walle) return;
    setWalle(_walle);
  }, [id, wallesProvider]);

  return <Layout 
    title={PAGE_TITLE.walle} 
    mainClassName={cx('DT-Walle', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.walles} onClick={trakingHeaderButtonToList}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.walle} description={PAGE_DESCRIPTION.walle} />
    {wallesProvider.list.length === 0 && !wallesProvider.getFixedWalle('debate-fixed-walle-combined') ? (
      <ListEmptyBox label={WALLE_LABEL} mode='empty' pageLink={pageLinks.walleAdd} />
    ) : id && !walle.id ? (
      <ListEmptyBox label={WALLE_LABEL} mode='error' pageLink={pageLinks.walles} />
    ) : (
      creator[walle.mode]
    )}
  </Layout>;
}

export default Walle;

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