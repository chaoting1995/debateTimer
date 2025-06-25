import React from 'react'
import { css, cx } from '@emotion/css';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { CaretDown } from '@phosphor-icons/react'; 

import { styleSettingColor } from 'styles/variables.style';
import { WalleContent } from 'modules/walle/resources/walle.type';
import { FactoryWalle } from 'modules/walle';

type Props = {
  className?: string;
  children?: React.ReactNode;
  walleContents: WalleContent[];
  renderWalleContentList: (walleContents: WalleContent[]) => React.ReactNode;
}

const WalleContentCategoryGroups: React.FC<Props> = (props) => {
  
  if (props.walleContents.length === 0) {
    return (
      <div className={cx('DT-WalleContentCategoryGroups', style, props.className)}>
        <div className='empty-box'>
          <div>尚無辯題選項</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cx('DT-WalleContentCategoryGroups', style, props.className)}>
      {FactoryWalle.createWalleContentCategoryGroups(props.walleContents).map(item => (
        <Accordion key={item.category} defaultExpanded disableGutters square>
          <AccordionSummary 
            className='walle-category' 
            expandIcon={<CaretDown size={26} className='icon-button' />}>
            <div >{item.category}</div>
          </AccordionSummary>
          <AccordionDetails>
            {props.renderWalleContentList(item.walleContents)}
          </AccordionDetails>
      </Accordion>
      ))}
    </div>
  )
}

export default WalleContentCategoryGroups;

const style = css`
  .empty-box {
    padding: 8px 16px;
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
  }

  .walle-category,
  .walle-category.MuiAccordionSummary-root {
    padding: 8px 16px;
    box-sizing: border-box;
    font-size: 18px;
    color: ${styleSettingColor.background.dark};
    border-bottom: 1px solid ${styleSettingColor.disabled};
    background-color: ${styleSettingColor.gray}69;
  }
  
  // MuiAccordion reset stye
  .MuiAccordion-root {
    box-shadow: unset;

    .MuiAccordionSummary-root {
      min-height: unset;
  
      .MuiAccordionSummary-content {
        margin: 0;
      }
  
      .icon-button {
        padding: 0 8px;
        color: rgba(0, 0, 0, 0.2);
      }
    }

    .MuiAccordionDetails-root {
      padding: 0;
    }
  }
`;