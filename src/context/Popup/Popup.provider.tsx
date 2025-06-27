import React from 'react';
import { css, cx } from '@emotion/css';
import { Snackbar, Alert, Dialog, DialogContent, DialogActions, DialogTitle, IconButton } from '@mui/material';
import { X } from '@phosphor-icons/react';

import { styleSettingZIndex, styleSettingColor, styleSettingHeight } from 'styles/variables.style';
import useDialog from 'hooks/useDialog';
import { Button } from 'components';
import { ContextPopup, ParamsConfirm, ParamsDialog, ParamsNotice } from './Popup.context';

import {
  BUTTON_CANCEL,
  BUTTON_CONFIRM,
  DEFAULT_CONFIG_NOTICE,
  DEFAULT_CONFIG_CONFIRM,
  DEFAULT_CONFIG_DIALOG,
} from './Popup.constant';

type ConfirmDialogResolverCurrent = (result: boolean) => void;

type Props = {
  children?: JSX.Element;
};

const PopupProvider = (props: Props) => {
  const [openNotice, handleOpenNotice, handleCloseNotice] = useDialog(false);
  const [configNotice, setConfigNotice] = React.useState<ParamsNotice>(DEFAULT_CONFIG_NOTICE);

  const [openConfirm, handleOpenConfirm, handleCloseConfirm] = useDialog(false);
  const [configConfirm, setConfigConfirm] = React.useState<ParamsDialog>(DEFAULT_CONFIG_CONFIRM);

  const [openDialog, handleOpenDialog, handleCloseDialog] = useDialog(false);
  const [configDialog, setConfigDialog] = React.useState<ParamsConfirm>(DEFAULT_CONFIG_CONFIRM);

  const notice = React.useCallback(
    (params: ParamsNotice) => {
      const _configNotice = { ...DEFAULT_CONFIG_NOTICE };
      if (params.message) _configNotice.message = params.message;
      if (params.severity) _configNotice.severity = params.severity;
      if (params.duration) _configNotice.duration = params.duration;
      if (params.className) _configNotice.className = params.className;
      setConfigNotice(_configNotice);

      handleOpenNotice();
    },
    [handleOpenNotice]
  );

  const handleCloseNoticeWithReset = () => {
    handleCloseNotice();
    // setTimeout(() => {
    //   setConfigNotice(DEFAULT_CONFIG_NOTICE);
    // }, 1000);
  };

  const dialog = React.useCallback(
    (params: ParamsDialog) => {
      const _configDialog = { ...DEFAULT_CONFIG_DIALOG };
      if (params.img) _configDialog.img = params.img;
      if (params.title) _configDialog.title = params.title;
      if (params.message) _configDialog.message = params.message;
      if (params.hideCloseButton) _configDialog.hideCloseButton = params.hideCloseButton;
      if (params.className) _configDialog.className = params.className;
      setConfigDialog(_configDialog);

      handleOpenDialog();
    },
    [handleOpenDialog]
  );

  const resolver = React.useRef<ConfirmDialogResolverCurrent>();
  const confirm = React.useCallback(
    (params: ParamsConfirm): Promise<boolean> => {
      const _configConfirm = { ...DEFAULT_CONFIG_CONFIRM };
      if (params.img) _configConfirm.img = params.img;
      if (params.title) _configConfirm.title = params.title;
      if (params.message) _configConfirm.message = params.message;
      if (params.hideCloseButton) _configConfirm.hideCloseButton = params.hideCloseButton;
      if (params.className) _configConfirm.className = params.className;
      setConfigConfirm(_configConfirm);

      handleOpenConfirm();
      return new Promise((resolve) => (resolver.current = resolve));
    },
    [handleOpenConfirm]
  );

  const handleConfirm = React.useCallback(() => {
    if(resolver.current) resolver.current(true);
    handleCloseConfirm();
  }, [handleCloseConfirm]);

  const handleCancel = React.useCallback(() => {
    if(resolver.current) resolver.current(false);
    handleCloseConfirm();
  }, [handleCloseConfirm]);

  const popup = React.useMemo(() => ({ notice, dialog, confirm }), [notice, dialog, confirm]);

  return (
    <ContextPopup.Provider value={popup}>
      <Snackbar
        className={cx(styleNotice, 'hint-under-header', configNotice.className)}
        open={openNotice}
        autoHideDuration={configNotice.duration}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleCloseNoticeWithReset}>
        <Alert
          onClose={handleCloseNoticeWithReset}
          severity={configNotice.severity}
          variant='filled'
          icon={false}>
          {configNotice.message}
        </Alert>
      </Snackbar>
      <Dialog open={openConfirm} onClose={handleCloseConfirm} className={cx(styleDialog, configConfirm.className)}>
        {configConfirm.img && <div className='dialog-img'>{configConfirm.img}</div>}
        {configConfirm.title && <DialogTitle>{configConfirm.title}</DialogTitle>}
        {configConfirm.message && <DialogContent>{configConfirm.message}</DialogContent>}
        <DialogActions>
          <Button onClick={handleCancel} variant='outlined' color='secondary'>{BUTTON_CANCEL}</Button>
          <Button onClick={handleConfirm} variant='outlined' color='error' autoFocus>
            {BUTTON_CONFIRM}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={handleCloseDialog} className={cx(styleDialog, configDialog.className)}>
        {!configDialog.hideCloseButton && (
          <IconButton className='close-button' title='close' onClick={handleCloseDialog}>
            <X size={20} />
          </IconButton>
        )}
        {configDialog.img && <div className='dialog-img'>{configDialog.img}</div>}
        {configDialog.title && <DialogTitle>{configDialog.title}</DialogTitle>}
        <DialogContent>{configDialog.message}</DialogContent>
      </Dialog>
      {props.children}
    </ContextPopup.Provider>
  );
};

export default PopupProvider;

const styleDialog = css`
  &.MuiDialog-root {
    z-index: ${styleSettingZIndex.popup};
  }

  &.MuiDialog-root .MuiPaper-root {
    min-height: 150px;
    min-width: 300px;
    max-width: 100%;
    border-radius: 25px;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;

    border-radius: 999px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
  }

  .MuiDialogTitle-root {
    text-align: center;
  }

  .dialog-img {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    margin-left: auto;
  }

  .MuiDialogActions-root {
    margin-top: auto;
    padding: 0 24px 16px;
    justify-content: center;

    button {
      min-width: 50%;
    }
  }
`;

const styleNotice = css`
  &.MuiSnackbar-root {
    z-index: ${styleSettingZIndex.popup};

    &.hint-under-header {
      width: 100%;
      right: 0;
      left: 0;
      top: calc(${styleSettingHeight.header} + 10px);
      transform: unset;

      .MuiAlert-root {
        border-radius: unset;
      }
    }
  }

  & .MuiAlert-message {
    word-break: break-all;
  }

  & .MuiAlert-filledWarning {
    background-color: ${styleSettingColor.warning};
    color: ${styleSettingColor.text.secondary};
    
    a, .button {
      color: ${styleSettingColor.text.secondary};
      text-decoration: underline;
    }
  }
`;
