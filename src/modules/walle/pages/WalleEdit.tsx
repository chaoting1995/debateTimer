import React from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { WalleEditor } from 'modules/walle';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Walle as TypeWalle } from 'modules/walle/resources/walle.type';
import { DEFAULT_WALLE, WALLE_LABEL } from 'modules/walle/resources/walle.constant';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useWalles from 'modules/walle/context/Walles/useWalles';

const WalleEdit: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigae = useNavigate();
  const wallesProvider = useWalles();
  const [walle, setWalle] = React.useState<TypeWalle>(DEFAULT_WALLE);

  const handleSave =  React.useCallback((_walle: TypeWalle) => {
    if (!walle.id) {
      wallesProvider.addItem(_walle);
    } else {
      wallesProvider.editItem(_walle);
    };

    navigae(pageLinks.walles);
  }, [navigae, wallesProvider, walle]);
  
  React.useEffect(() => {
    if (!id) return;
    const _walle = wallesProvider.getItem(id);
    if (!_walle) return;
    setWalle(_walle);
  }, [id, wallesProvider, location.pathname]);

  return <Layout 
    title={!walle.id ? `新增${WALLE_LABEL}` : `編輯${WALLE_LABEL}`} 
    mainClassName={cx('DT-WalleEdit', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.walles}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.walle} | ${!walle.id ? `新增${WALLE_LABEL}` : `編輯${WALLE_LABEL}`}`} 
      description={PAGE_DESCRIPTION.walle}
    />
    <WalleEditor walle={walle} className='walle-mode' onSave={handleSave} />
  </Layout>;
}

export default WalleEdit;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};

  .walle-mode {
    padding: 20px 16px;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;