const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Trung_Nghia'


const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');     
const player = $('.player');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const progress = $('.progress');
const playlist = $('.playlist');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Leyla',
            singer: 'Mesto',
            path: './asset/music/Leyla.mp3',
            image: './asset/img/Leyla.jpg'
        },
        {
            name: 'Monsters',
            singer: 'Timeflies',
            path: './asset/music/Monsters.mp3',
            image: './asset/img/Monsters.jpg'
        },
        {
            name: 'The Show',
            singer: 'LenKa',
            path: './asset/music/The_Show.mp3',
            image: './asset/img/TheShow.jpg'
        },
        {
            name: 'Yêu anh em nhé',
            singer: 'Huy R',
            path: './asset/music/song1.mp3',
            image: './asset/img/YeuAnhEmNhe.jpg'
        },
        {
            name: 'Nếu ngày mai không đến',
            singer: 'Chillers',
            path: './asset/music/song2.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'Có em đời bỗng vui',
            singer: 'Chillers',
            path: './asset/music/song3.mp3',
            image: './asset/img/anh2.jfif'
        },
        {
            name: 'Một triệu Like',
            singer: 'Đen Vâu',
            path: './asset/music/MotTrieuLike.mp3',
            image: './asset/img/MotTrieuLike.jpg'
        },
        {
            name: 'Nàng thơ',
            singer: 'Hoàng Dũng',
            path: './asset/music/NangTho.mp3',
            image: './asset/img/NangTho.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/Nevada.mp3',
            image: './asset/img/Nevada.jpg'
        },
        {
            name: 'Summertime ',
            singer: 'Erik Lund',
            path: './asset/music/SummerTime.mp3',
            image: './asset/img/Summertime.jpg'
        }
    
    ],
    setConfig:function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song, index)=> {
            return `
            <div class="song ${index == this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties:function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents:function() {
        const _this = this;
        // xử lý CD quay và dừng:
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,//10s
            iterations: Infinity
        })
        cdThumbAnimate.pause();
        
        //click play
        playBtn.onclick = function() {
            //C1:
            // if(_this.isPlaying) {
            //     _this.isPlaying = false;
            //     audio.pause();
            //     player.classList.remove('playing');
            // }else {
            //     _this.isPlaying = true;
            //     audio.play();
            //     player.classList.add('playing');
            // }
            //c2:
            if(_this.isPlaying) {
                audio.pause();
            }else {
                audio.play();
            }
            //khi song duoc play
            audio.onplay = function() {
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
            //khi song pause:
            audio.onpause = function() {
                _this.isPlaying = false;
                player.classList.remove('playing');
                cdThumbAnimate.pause();
            }     
            
            //khi tien do bai hat thay doi
            audio.ontimeupdate =function() {
                if(audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                    progress.value = progressPercent;

                }
            }

            // Khi tua song 
            progress.onchange = function(e) {
                const seekTime = audio.duration / 100 * e.target.value;
                audio.currentTime = seekTime;
            }
        }
        //xu ly phong to thu nho
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ?newCdWidth + 'px' : 0;

            cd.style.opacity = newCdWidth / cdWidth;

        }
        //khi next song
        nextBtn.onclick = function() {
            //xu ly nut bam play
            if(_this.isPlaying === false){
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
                

            if(_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        //khi next ve
        prevBtn.onclick = function() {
            //xu ly nut bam play
            if(_this.isPlaying === false){
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }


            if(_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.prevSong();
            }
            
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        //khi an random
        randomBtn.onclick = function() {
            //chuyen mau
            // c1:
            // if(_this.isRandom) {
            //     randomBtn.classList.remove('active');
            //     _this.isRandom = false;
            // }
            // else{
            //     randomBtn.classList.add('active');
            //     _this.isRandom = true;
            // }
            // c2:
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }
        //khi repeat 
        repeatBtn.onclick = function() {
            // if(_this.isRepeat ) {
            //     repeatBtn.classList.remove('active');
            //     _this.isRepeat  = false;
            //     _this.setConfig('isRepeat', _this.isRepeat);
            // }
            // else{
            //     repeatBtn.classList.add('active');
            //     _this.isRepeat  = true;
            //     _this.setConfig('isRepeat', _this.isRepeat);
            // }

            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        //xu ly next xog khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play();
            }else{
                nextBtn.click();
            }
        }

            // lang nghe click vao playlist
            playlist.onclick = function (e) {
                const songNode = e.target.closest('.song:not(.active)');
                //xu ly khi chuyen den vaof song
                if(songNode || !e.target.closest('.option')) {
                    //clink vao song
                    if(songNode) {
                        //xu ly nut bam play
                        if(_this.isPlaying === false){
                            _this.isPlaying = true;
                            player.classList.add('playing');
                            cdThumbAnimate.play();
                        }

                        _this.currentIndex = Number(songNode.dataset.index);
                        _this.loadCurrentSong();
                        _this.render();
                        audio.play();
                    }

                    //xu ly khi click vao song option
                    if(e.target.closest('.option')) {
                        
                    }
                }
            }
        
    },
    scrollToActiveSong:function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadCurrentSong:function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig:function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong:function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        
    },
    prevSong:function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        
    },
    randomSong:function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        //gan cau hinh tu config vao ung dung
        this.loadConfig();
        //Dinhj nghiax cac thuoc tinh cho object
        this.defineProperties();

        //Lang nghe/xu ly cac su kien(Dom events)
        this.handleEvents();

        //tai thong tin bài hát đầu tien khi chay ưn dung
        this.loadCurrentSong();

        //Render playlist
        this.render();
        //hien thi trang thai ban dau cua button repeat va random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    },
}

app.start()


