$(document).ready(function () {
    const sections = ['testada', 'hidrometro-retirado', 'hidrometro-novo', 'cavalete'];

    sections.forEach(section => {
        const video = document.getElementById(`video-${section}`);
        const canvas = document.getElementById(`canvas-${section}`);
        const captureButton = document.getElementById(`capture-${section}`);
        const capturedImagesDiv = document.getElementById(`captured-images-${section}`);
        const activateButton = $(`button[data-section="${section}"]`);

        activateButton.on('click', function () {
            $(video).show();
            $(captureButton).removeAttr('hidden');
            activateButton.prop('hidden', true);
            startCamera(video);
        });

        captureButton.addEventListener('click', () => {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataURL = canvas.toDataURL('image/png');
            const image = new Image();
            image.src = dataURL;
            image.className = 'preview-image';
            capturedImagesDiv.innerHTML = '';  // Clear previous images
            capturedImagesDiv.appendChild(image);

            stopCamera(video);
            $(captureButton).prop('hidden', true);
            $(canvas).hide();
            $("#nova-testada").prop('hidden', false);
            
        });

    });

    $(document).on("click", "#nova-testada", function() {
        const quadro = $(`#captured-images-testada`)
        quadro.empty()
        $(`button[data-section="testada"]`).removeAttr('hidden');
        $("#nova-testada").prop('hidden', true);
    })

    function startCamera(video) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
            });
    }

    function stopCamera(video) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
            track.stop();
        });

        video.srcObject = null;
        $(video).hide();
    }

    $('#capture-form').submit(function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    });

    $(document).on('click', '#sendsend', function () {
        alert('Registro Salvo Com Sucesso');
        location.reload();
    });
});
