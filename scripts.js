document.getElementById('massageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const ipAddress = await getIPAddress();
    const deviceType = getDeviceType();

    const whatsappUrl = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Nama%3A%20${encodeURIComponent(name)}%0ANomor%20Telepon%3A%20${encodeURIComponent(phone)}%0AMessage%3A%20${encodeURIComponent(message)}`;
    const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';

    const discordPayload = {
        embeds: [{
            title: 'New Massage Order',
            fields: [
                { name: 'Name', value: name, inline: true },
                { name: 'Phone Number', value: phone, inline: true },
                { name: 'Message', value: message },
                { name: 'IP Address', value: ipAddress },
                { name: 'Device Type', value: deviceType }
            ],
            color: 65280
        }]
    };

    window.open(whatsappUrl, '_blank');

    try {
        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (response.ok) {
            document.getElementById('statusMessage').innerText = 'Pesanan berhasil dikirim!';
        } else {
            document.getElementById('statusMessage').innerText = 'Gagal mengirim pesanan.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Terjadi kesalahan. Silakan coba lagi.';
    }
});

async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Tidak dapat mendeteksi IP Address';
    }
}

function getDeviceType() {
    if (navigator.userAgent.match(/Mobile|Android|Touch/i)) {
        return 'Mobile';
    } else {
        return 'Desktop';
    }
}
