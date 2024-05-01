let audioUrl;

async function post() {
    const audio = document.querySelector('#audio');
    const loading = document.querySelector('#loading');
    const errorText = document.querySelector('#error');
    const downloadButton = document.querySelector('#download');

    loading.style.display = 'block';
    audio.style.display = 'none';
    errorText.style.display = 'none';
    downloadButton.style.display = 'none';

    try {
        const response = await axios.post('https://text-to-speech-api-qezi5s2rqq-uc.a.run.app/text-to-speech',
            { input: document.querySelector('#input').value, voice: document.querySelector('#voice').value },
            { responseType: 'arraybuffer' });
        const generatedAudio = new Blob([response.data], { type: 'audio/mpeg' });
        audioUrl = URL.createObjectURL(generatedAudio);
        audio.src = audioUrl;
        audio.style.display = 'block';
        downloadButton.style.display = 'block';
    }
    catch (error) {
        errorText.innerHTML = 'Um erro aconteceu 😢. Tente novamente.'
        errorText.style.display = 'block';
    }
    finally {
        loading.style.display = 'none';
    }
}

async function download() {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'geradoraudio.mp3';
    link.click();
}