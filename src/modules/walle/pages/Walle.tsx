import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Walle as TypeWalle } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE } from 'modules/walle/resources/walle.constant';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useWalles from 'modules/walle/context/Walles/useWalles';
import { EnumWalleMode } from 'modules/walle/enums/enumWalleMode';
import { WalleModeComplete, WalleModeCombined } from 'modules/walle';

const Walle: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const wallesProvider = useWalles();
  // list 有資料，則預設顯示第一個；無資料，則預設顯示預設值
  const [walle, setWalle] = React.useState<TypeWalle>(DEFAULT_WALLE);

  const walleCreator = React.useCallback((_walle: TypeWalle): React.ReactNode  => {
    const reactNodeByEnumWalleMode: Record<EnumWalleMode, React.ReactNode> = {
      [EnumWalleMode.Combined]: <WalleModeCombined className='walle-mode' walle={_walle} />,
      [EnumWalleMode.Complete]: <WalleModeComplete className='walle-mode' walle={_walle} />,
    }
    return reactNodeByEnumWalleMode[_walle.mode];
  }, []);

  // 若沒有 id，預設為 walles 第一個物件
  React.useEffect(() => {
    if (id) return;
    if (wallesProvider.list.length === 0) return;
    setWalle(wallesProvider.list[0]);
  }, [id, wallesProvider.list]);

  React.useEffect(() => {
    if (!id) return;
    const _walle = wallesProvider.getFixedWalle(id) || wallesProvider.getItem(id);
    if (!_walle) return;
    setWalle(_walle);
  }, [id, wallesProvider]);

  return <Layout 
    title={PAGE_TITLE.walle} 
    mainClassName={cx('DT-Walle', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.walles}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags title={PAGE_TITLE.walle} description={PAGE_DESCRIPTION.walle} />
    {walleCreator(walle)}
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