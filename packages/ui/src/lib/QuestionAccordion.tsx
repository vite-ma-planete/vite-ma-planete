'use client';

import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Icon } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
type CustomizedAccordionProps = {
  id: string;
  question: string;
  answer: string;
  isIdea?: boolean;
};

export default function QuestionAccordion(props: CustomizedAccordionProps) {
  const isIdea = props?.isIdea || false;

  return (
    <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
      <Accordion key={'accordion_' + props.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
          aria-controls={`panel_${props.id}_a-content`}
          id={`panel_${props.id}_a-header`}
          sx={{
            boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isIdea && (
              <Icon
                sx={{
                  marginRight: '10px',
                }}
              >
                <LightbulbIcon sx={{ color: 'yellow' }} />{' '}
              </Icon>
            )}
            <Typography>{props.question}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '30px' }}>
          <Typography>{props.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
