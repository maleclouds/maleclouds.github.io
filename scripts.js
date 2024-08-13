document.getElementById('massageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const ipAddress = await getIPAddress();
    const deviceType = getDeviceType();

    // Discord Webhook URL
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1272903236910841856/3TacQcRbflDqiC3LfOwlJt1IJjDXEdXLXroZFbyFCRGugfPAubVonYLKnRUlxyj7b2YR';

    // Prepare the payload for Discord
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
            color: 65280 // Green color
        }]
    };

    // Send message to Discord
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

    // Open Instagram DM
    window.open('https://instagram.com/direct/new?username=nfnfrmnsyh', '_blank');
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
