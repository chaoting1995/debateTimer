import { ErrorCreateObjectByEmpty } from 'api/errors/errorCreateObjectByEmpty.class';
import { ErrorCreateObjectByColumnEnum } from 'api/errors/errorCreateObjectByColumnEnum.class';
import ServiceFormat from 'services/format.service';
import { Topic, TopicSetting, TopicCategoryGroup } from 'modules/topic/resources/topic.type';
import { EnumTopicMode, IsEnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode, IsEnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';

const createTopiSetting = (response: TopicSetting): TopicSetting => {
  const objectName = 'TopicSetting';

  if (!response) {
    throw new ErrorCreateObjectByEmpty(objectName);
  }

  if (!IsEnumTopicMode(response['topicMode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'topicMode',
      response['topicMode'],
      Object.values(EnumTopicMode),
    );
  }

  if (!IsEnumTopicMiddleItemMode(response['topicMiddleItemMode'])) {
    throw new ErrorCreateObjectByColumnEnum(
      objectName,
      'topicMiddleItemMode',
      response['topicMiddleItemMode'],
      Object.values(EnumTopicMiddleItemMode),
    );
  }

  return {
    topicMode: response['topicMode'],
    topicMiddleItemMode: response['topicMiddleItemMode'],
    topicDisabled: ServiceFormat.toArray<string>(response['topicDisabled'])
  };
};


export const topicCategoryGroups = (topics: Topic[]): TopicCategoryGroup[] => {
  return topics.reduce((acc: TopicCategoryGroup[], topicItem: Topic) => {
    // Find if there's already an object with the same category
    let categoryGroup = acc.find(group => group.category === topicItem.category);
    
    // If not, create a new category group
    if (!categoryGroup) {
      categoryGroup = { category: topicItem.category, topics: [] };
      acc.push(categoryGroup);
    }
    
    // Add the current topic to the appropriate category group
    categoryGroup.topics.push(topicItem);
    
    return acc;
  }, []);
};

export const createTopicCategoryGroups = (topics: Topic[]): TopicCategoryGroup[] => {
  return topics.reduce((acc: TopicCategoryGroup[], topicItem: Topic) => {
    // 尋找是否已有相同類別的物件
    let categoryGroup = acc.find(group => group.category === topicItem.category);

    // 如果沒有，則建立一個新的類別組
    if (!categoryGroup) {
      categoryGroup = { category: topicItem.category, topics: [] };
      acc.push(categoryGroup);
    }

    // 將辯題加入對應的類別群組中
    categoryGroup.topics.push(topicItem);

    return acc;
  }, []);
};

const FactoryTopic = {
  createTopiSetting,
  createTopicCategoryGroups
};

export default FactoryTopic;
