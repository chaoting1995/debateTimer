import React from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { css, cx } from '@emotion/css';
import { IconButton } from '@mui/material';
import { FileText } from '@phosphor-icons/react';

import { DummyEditor } from 'modules/dummy';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import { pageLinks, PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { Dummy as TypeDummy } from 'modules/dummy/resources/dummy.type';
import { DEFAULT_DUMMY } from 'modules/dummy/resources/dummy.constant';
import useInnerHeight from 'hooks/useInnerHeight';
import Layout from 'layouts/Layout';
import HeadTags from 'components/HeadTags';
import useDummys from 'modules/dummy/context/Dummys/useDummys';

const DummyEdit: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigae = useNavigate();
  const dummysProvider = useDummys();
  const [dummy, setDummy] = React.useState<TypeDummy>(DEFAULT_DUMMY);

  const handleSave =  React.useCallback((_dummy: TypeDummy) => {
    if (!dummy.id) {
      dummysProvider.addItem(_dummy);
    } else {
      dummysProvider.editItem(_dummy);
    };

    navigae(pageLinks.dummys);
  }, [navigae, dummysProvider, dummy]);
  
  React.useEffect(() => {
    if (!id) return;
    const _dummy = dummysProvider.getItem(id);
    if (!_dummy) return;
    setDummy(_dummy);
  }, [id, dummysProvider, location.pathname]);

  return <Layout 
    title={PAGE_TITLE.dummyEdit} 
    mainClassName={cx('DT-DummyEdit', style(innerHeight))}
    renderButtons={
      <IconButton component={Link} to={pageLinks.dummys}>
        <FileText size={28} weight='light'/>
      </IconButton>
    }>
    <HeadTags 
      title={`${PAGE_TITLE.dummy} | ${!dummy.id ? PAGE_TITLE.dummyAdd : PAGE_TITLE.dummyEdit}`} 
      description={PAGE_DESCRIPTION.dummy}
    />
    <DummyEditor dummy={dummy} className='dummy-mode' onSave={handleSave} />
  </Layout>;
}

export default DummyEdit;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.gray};
  color: ${styleSettingColor.text.secondary};

  .dummy-mode {
    padding: 20px 16px 20px;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;