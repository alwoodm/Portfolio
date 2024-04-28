document.getElementById('YoutubeDownloader_downloadBtn').addEventListener('click', function (event) {
    event.preventDefault();
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', 'files/YoutubeDownloader/Youtube_Downloader.exe');
    downloadLink.setAttribute('download', 'Youtube_Downloader.exe');

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
});
