$(document).ready(function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const form = document.getElementById('capture-form');
    const capturedImagesDivTestada = document.getElementById('captured-images-testada');
    const capturedImagesDivHRetirado = document.getElementById('captured-images-hidrometro-retirado');
    const capturedImagesDivHNovo = document.getElementById('captured-images-hidrometro-novo');
    const capturedImagesDivHCavalete = document.getElementById('captured-images-cavalete');

    let cameraStarted = false;
    let capturesCount = 0;

    // Inicia a câmera quando clicar no botão de ativar
    $('#ativar').on('click', function () {

        $("#video").removeAttr('hidden');
        $("#capture").removeAttr('hidden');



        setTimeout(function () {
            if (!cameraStarted) {
                startCamera();
                cameraStarted = true;
            }


        }, 500);
    });

    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
            });
    }

    // Captura a foto e exibe abaixo do formulário
    captureButton.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');
        const image = new Image();
        image.src = dataURL;
        image.className = 'preview-image';
        // capturedImagesDiv.appendChild(image);

        switch (capturesCount) {
            case 0:
                capturedImagesDivTestada.appendChild(image)
                break;

            case 1:
                capturedImagesDivHRetirado.appendChild(image)
                break
            
            case 2:
                capturedImagesDivHNovo.appendChild(image)
                break
            
            case 3:
                capturedImagesDivHCavalete.appendChild(image)
                break
        
            default:
                break;
        }

        capturesCount++;

        if (capturesCount === 4) {
            stopCamera();
        }
    });

    // Desliga a câmera
    function stopCamera() {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
        cameraStarted = false;
        $('#ativar').prop('disabled', true); // Desabilita o botão de ativar
        $('#capture').attr('hidden', true);
        $('#video').attr('hidden', true);
    }


    $('#capture-form').submit(function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    });
});
$(document).on('click', '#sendsend', function () {
    alert('Registro Salvo Com Sucesso')
    location.reload()
})