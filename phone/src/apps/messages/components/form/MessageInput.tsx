import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { useNuiRequest } from 'fivem-nui-react-lib';
import { MessageEvents } from '../../../../../../typings/messages';
import { TextField } from '../../../../ui/components/Input';

interface IProps {
  onAddImageClick(): void;
  messageConversationId: string | undefined;
  messageGroupName: string | undefined;
}

const useStyles = makeStyles({
  root: { width: '100%' },
});

const MessageInput = ({ messageConversationId, onAddImageClick }: IProps) => {
  const Nui = useNuiRequest();
  const { t } = useTranslation();
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      // don't allow the user to submit white space

      Nui.send(MessageEvents.SEND_MESSAGE, {
        conversationId: messageConversationId,
        message,
      });
      setMessage('');
    }
  };

  if (!messageConversationId) return null;

  return (
    <Paper variant="outlined" className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <Box pl={1} flexGrow={1}>
            <TextField
              multiline
              aria-multiline="true"
              fullWidth
              inputProps={{ style: { fontSize: '1.3em' } }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('APPS_MESSAGES_NEW_MESSAGE')}
            />
          </Box>
          <Box>
            <Button onClick={onAddImageClick}>
              <ImageIcon />
            </Button>
            <Button type="submit">
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default MessageInput;
