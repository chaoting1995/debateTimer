import React from 'react'
import { css, cx } from '@emotion/css';

import Layout from 'layouts/Layout';
import { styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useInnerHeight from 'hooks/useInnerHeight';
import HeadTags from 'components/HeadTags';
import { PAGE_TITLE, PAGE_DESCRIPTION } from 'routes/route.constants';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import TopicModeComplete from 'modules/topic/components/TopicModeComplete';
import TopicModeCombined from 'modules/topic/components/TopicModeCombined';
import useTopic from 'modules/topic/context/Topic/useTopic';

const TopicCreator: React.FC = () => {
  const [innerHeight] = useInnerHeight();
  const { topicMode } = useTopic();

  const topicCreator: Record<EnumTopicMode, React.ReactNode> = {
    [EnumTopicMode.Complete]: <TopicModeComplete className='topic-mode' />,
    [EnumTopicMode.Combined]: <TopicModeCombined className='topic-mode' />
  }

  return <Layout title={PAGE_TITLE.topicCreator} mainClassName={cx('DT-TopicCreator', style(innerHeight))}>
    <HeadTags title={PAGE_TITLE.topicCreator} description={PAGE_DESCRIPTION.topicCreator} />
    {topicCreator[topicMode]}
  </Layout>;
}

export default TopicCreator;

const style = (_innerHeight: number) => css`
  background-color: ${styleSettingColor.background.default};
  color: ${styleSettingColor.text.primary};

  .topic-mode {
    padding: 20px 0;
    box-sizing: border-box;
    min-height: calc(${_innerHeight}px - ${styleSettingHeight.header});
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;