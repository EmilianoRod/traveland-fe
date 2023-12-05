import { WhatsApp } from "@mui/icons-material";


function WhatsAppLink(){
    return (
        <a target="_blank"
        rel="noreferrer"
        href={`https://wa.me/59897958952?text=${decodeURIComponent('Hola! necesito ayuda')}`}
        style={{
            position: 'fixed',
            right: 25,
            bottom: 25,
            background: '#00a884',
            color: '#eee',
            borderRadius: '100%',
            width: 49,
            height: 49,
            padding: 7
        }}><WhatsApp fontSize="large" /></a>
    )
}

export default WhatsAppLink;