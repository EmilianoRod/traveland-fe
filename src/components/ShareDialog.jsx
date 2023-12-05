import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography } from '@mui/material';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, TelegramShareButton, TelegramIcon, RedditShareButton, RedditIcon } from 'react-share';

function ShareDialog({ title }) {

    const [open, setOpen] = useState(false);
    const [copiado, setCopiado] = useState(false);
    const currentPageUrl = window.location.href;


    return (
        <>
            <Button onClick={() => setOpen(true)}>Compartir</Button>
            <Dialog
                open={open}
                aria-aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                onClose={() => setOpen(false)}
                maxWidth={false}
            >
                <DialogTitle id='dialog-title'>Compartir</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: 2,
                            width: 'auto'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'line',
                                justifyContent: 'center',
                                gap: 2,
                                width: 'auto'
                            }}>
                            <FacebookShareButton url={currentPageUrl} quote={title}>
                                <FacebookIcon size={40} round={true}></FacebookIcon>
                                <Typography fontSize='12px'>
                                    Facebook
                                </Typography>
                            </FacebookShareButton>

                            <TwitterShareButton url={currentPageUrl} title={title}>
                                <TwitterIcon size={40} round={true}></TwitterIcon>
                                <Typography fontSize='12px'>
                                    Twitter
                                </Typography>
                            </TwitterShareButton>

                            <TelegramShareButton url={currentPageUrl} >
                                <TelegramIcon size={40} round={true}></TelegramIcon>
                                <Typography fontSize='12px'>
                                    Telegram
                                </Typography>
                            </TelegramShareButton>

                            <RedditShareButton title={title}>
                                <RedditIcon size={40} round={true}></RedditIcon>
                                <Typography fontSize='12px'>
                                    Reddit
                                </Typography>
                            </RedditShareButton>
                        </Box>


                        <Box>
                            <CopyToClipboard text={currentPageUrl}>
                                <Box>
                                    <input value={currentPageUrl}></input>
                                    <button onClick={() => setCopiado(true)}>Copiar</button>
                                    {copiado && <p>
                                        <br></br>
                                        <span>Copiado!</span>
                                    </p>}
                                </Box>

                            </CopyToClipboard>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>

                </DialogActions>
            </Dialog >
        </>
    )
}

export default ShareDialog;
