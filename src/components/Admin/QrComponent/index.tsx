import React from 'react';
import { QRCode, Button } from 'antd';
import { useStateValue } from '../../../context/StateProvider';
import { HOSTNAME } from '../../../api';
import jsPDF from 'jspdf';

const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(url, 'PNG', 10, 10, 50, 50);
        pdf.save('QRCode.pdf');
    }
};

const QRComponent: React.FC = () => {
    const [{ restaurant_id }] = useStateValue();

    const link = HOSTNAME + 'rest_id:' + restaurant_id;

    return (
        <div id="myqrcode" style={{ display: 'flex', flexDirection: 'column', maxWidth: '150px' }}>
            <QRCode value={link} style={{ marginBottom: 16 }} />
            <Button onClick={downloadQRCode} style={{ background: '#F9812B', color: '#FFF', cursor: 'pointer' }}>
                Загрузить Qr
            </Button>
        </div>
    );
};

export default QRComponent;
