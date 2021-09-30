import { Box, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Message } from '../../../../../../typings/messages';
import { PictureResponsive } from '../../../../ui/components/PictureResponsive';
import { PictureReveal } from '../../../../ui/components/PictureReveal';
import { useMyPhoneNumber } from '../../../../os/simcard/hooks/useMyPhoneNumber';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:first-child': {
      marginTop: 'auto',
    },
  },
  mySms: {
    float: 'right',
    margin: theme.spacing(1),
    padding: '6px 16px',
    height: 'auto',
    width: 'auto',
    minWidth: '60%',
    maxWidth: '85%',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderRadius: '20px',
    textOverflow: 'ellipsis',
  },
  sms: {
    float: 'left',
    margin: theme.spacing(1),
    padding: '6px 12px',
    width: 'auto',
    minWidth: '60%',
    maxWidth: '85%',
    height: 'auto',
    background: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
    borderRadius: '15px',
    textOverflow: 'ellipsis',
  },
  message: {
    wordBreak: 'break-word',
  },
}));

const isImage = (url) => {
  return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg|gif)/g.test(url);
};

export const MessageBubble = ({
  message,
  onClickDisplay,
}: {
  message: Message;
  onClickDisplay(phoneNumber: string): void;
}) => {
  const classes = useStyles();
  const myNumber = useMyPhoneNumber();

  return (
    <div className={classes.root}>
      <Paper
        className={message.author === myNumber ? classes.mySms : classes.sms}
        variant="outlined"
      >
        <Box className={classes.message}>
          {isImage(message.message) ? (
            <PictureReveal>
              <PictureResponsive src={message.message} alt="message multimedia" />
            </PictureReveal>
          ) : (
            <div>{message.message}</div>
          )}
        </Box>
      </Paper>
    </div>
  );
};
