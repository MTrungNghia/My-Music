const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');     
const player = $('.player');
const playBtn = $('.btn-toggle-play');
const progress = $('.progress');

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Leyla',
            singer: 'Trung Nghia',
            path: './asset/music/Leyla.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'Monsters',
            singer: 'Trung Nghia 1',
            path: './asset/music/Monsters.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'The Show',
            singer: 'Trung Nghia 2',
            path: './asset/music/The_Show.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'Yêu anh em nhé',
            singer: 'Trung Nghia',
            path: './asset/music/song1.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'Nếu ngày mai không đến',
            singer: 'Trung Nghia 1',
            path: './asset/music/song2.mp3',
            image: './asset/img/anh1.jpg'
        },
        {
            name: 'Có em đời bỗng vui',
            singer: 'Trung Nghia 2',
            path: './asset/music/song3.mp3',
            image: './asset/img/anh1.jpg'
        }
    
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
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
            }
            //khi song pause:
            audio.onpause = function() {
                _this.isPlaying = false;
                player.classList.remove('playing');
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
    },
    loadCurrentSong:function() {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function() {
        //Dinhj nghiax cac thuoc tinh cho object
        this.defineProperties();

        //Lang nghe/xu ly cac su kien(Dom events)
        this.handleEvents();

        //tai thong tin bài hát đầu tien khi chay ưn dung
        this.loadCurrentSong();

        //Render playlist
        this.render();
    },
}

app.start()


