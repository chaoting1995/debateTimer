import { Topic, TopicSetting } from 'modules/topic/resources/topic.type';
import { EnumTopicMode } from 'modules/topic/enums/enumTopicMode';
import { EnumTopicMiddleItemMode } from 'modules/topic/enums/enumTopicMiddleItemMode';
import { 
  DEFAULT_TOPIC_COMPLETE_FROM_CSV, 
  DEFAULT_TOPIC_COMBINED_FROM_CSV
} from "modules/topic/resources/topic.generate";

export const DT_LOCALSTORAGE_KEY_TOPIC_SETTING = 'DT_LOCALSTORAGE_KEY_TOPIC_SETTING';

export const DEFAULT_TOPIC_SETTING : TopicSetting = {
  topicMode: EnumTopicMode.Combined,
  topicMiddleItemMode: EnumTopicMiddleItemMode.Causal,
  topicDisabled: []
};

export const DEFAULT_TOPIC_COMPLETE: Topic[] = DEFAULT_TOPIC_COMPLETE_FROM_CSV;
export const DEFAULT_TOPIC_COMBINED: Topic[] = DEFAULT_TOPIC_COMBINED_FROM_CSV;

export const EMPTY_TOPIC: Topic = {
  id: '',
  name: '(無可選辯題)',
  category: '',
};

export const TOPIC_GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/19Kq4FNRxRojCDajOtSCdS38d_cSB_MZnXRY0Od-tDig'