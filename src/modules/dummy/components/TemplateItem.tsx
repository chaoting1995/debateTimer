import React from 'react'
import { css, cx } from '@emotion/css';

type Prpos = {
  className?: string;
}
const TemplateItem: React.FC<Prpos> = (props) => {

  return <div className={cx('DT-TemplateItem', style, props.className)}>
  </div>;
}

export default TemplateItem;

const style = css``;