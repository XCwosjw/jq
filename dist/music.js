const ap = new APlayer({
    container: document.getElementById('aplayer'),
    autoplay: true,
    loop: 'all',
    volume: 0.7,
    listFolded: true,
    listMaxHeight: 60,
    audio: [
        {
            name: 'In the end',
            artist: 'Tommee Profitt',
            url: 'dist/In the end.mp3',
            cover: 'dist/In the end.jpg',
        },
		{
            name: 'aLIEz',
            artist: 'mizuki / SawanoHiroyuki[nZk]',
            url: 'dist/aLIEz.mp3',
            cover: 'dist/aLIEz.jpg',
        }
    ]
});