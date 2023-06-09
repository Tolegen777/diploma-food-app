import React from 'react';
import {Button, QRCode} from 'antd';
import {useStateValue} from '../../../context/StateProvider';
import {HOSTNAME} from '../../../api';
import jsPDF from 'jspdf';
import {userService} from "../../../services/userService";

const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(url, 'PNG', 80, 50, 50, 50);
        pdf.save('QRCode.pdf');
    }
};

const QRComponent: React.FC = () => {

    const restaurant_id = userService.getRestId()

    console.log(restaurant_id, 'REST')
    const link = HOSTNAME + 'rest_id:' + restaurant_id;

    return (
        <div id="myqrcode" style={{display: 'flex', flexDirection: 'column', maxWidth: '150px'}}>
            <QRCode value={link} style={{marginBottom: 16}}/>
            <Button onClick={downloadQRCode} style={{background: '#F9812B', color: '#FFF', cursor: 'pointer'}}>
                Загрузить Qr
            </Button>
        </div>
    );
};

export default QRComponent;
