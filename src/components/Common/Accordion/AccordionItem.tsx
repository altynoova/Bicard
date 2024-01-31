import React from 'react'
import {
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem as AccordionItemElement,
} from 'react-accessible-accordion'

interface AccrodionItemProps {
  id: string;
  heading: string;
  text: string;
}

const AccordionItem = ({ id, heading, text }: AccrodionItemProps) => {
  return (
    <AccordionItemElement uuid={id}>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span>{heading}</span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{text}</p>
      </AccordionItemPanel>
    </AccordionItemElement>
  )
}

export default AccordionItem
