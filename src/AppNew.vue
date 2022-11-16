<template>
  <div
    ref="slider"
    class="slider"
  >
    <div
      class="slider__container"
      :style="{ transform: `translateX(${sliderContainerTransform}px)` }"
      @mouseenter="stopTimer"
      @mouseleave="setTimer"
    >
      <img
        v-for="img in slides"
        :key="img.imgsrc"
        class="slider__image"
        :src="require(`${img.imgsrc}`)"
      >
    </div>
    <div
      v-show="pags"
      class="dots-container"
    >
      <div
        v-for="dot in slides.length"
        :key="dot.imgsrc"
        class="dot"
        @click="changeSlide(dot)"
      />
    </div>
    <string class="slider__counter">
      {{ slideCounter }}
    </string>
    <string class="slider__caption">
      {{ slideText }}
    </string>
    <button
      v-show="navs"
      type="button"
      class="slider__left-bth"
      @click="currentSlide -= 1"
    >
      left
    </button>
    <button
      v-show="navs"
      type="button"
      class="slider__right-bth"
      @click="currentSlide += 1"
    >
      right
    </button>
  </div>
  <div class="control-buttons__container">
    <button
      :class="{ active: loop }"
      @click="loop = !loop"
    >
      loop
    </button>
    <button
      :class="{ active: navs }"
      @click="navs = !navs"
    >
      navs
    </button>
    <button
      :class="{ active: pags }"
      @click="pags = !pags"
    >
      pags
    </button>
    <button
      :class="{ active: auto }"
      @click="changeAutoLoop"
    >
      auto
    </button>
  </div>
  <div>
    <p>Loop: Возможность листать слайдер по кругу</p>
    <p>Navs: Вывод стрелочек</p>
    <p>Pags: Вывод пагинации</p>
    <p>Auto: Слайдер сам переключается. Если навести мышкой на слайд, он не переключается, как только мышку убрали, снова пошло.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          imgsrc: './images/1.jpg',
          text: 'Caption Text 1'
        },
        {
          imgsrc: './images/2.jpg',
          text: 'Caption Text 2'
        },
        {
          imgsrc: './images/3.jpg',
          text: 'Caption Text 3'
        },
        {
          imgsrc: './images/4.jpg',
          text: 'Caption Text 4'
        },
        {
          imgsrc: './images/5.jpg',
          text: 'Caption Text 5'
        },
      ],
      currentSlide: 1,
      slideText: '',
      slideCounter: '',
      sliderContainerTransform: 0,
      loop: true,
      navs: true,
      pags: true,
      auto: true,
      timer: '',
    }
  },
  mounted() {
    this.setSlideCaption();
    this.setSlideCounter();
    this.setTimer();
  },
  methods: {
    setTimer() {
      if (this.auto) {
      console.log('setTimer');
      this.timer = setInterval(() => {
        this.currentSlide += 1;
      }, 2000);
    }
    },
    stopTimer() {
      clearTimeout(this.timer);
      console.log('stopTimer');
    },
    setSlideCaption() {
      this.slideText = this.slides[this.currentSlide - 1].text;
    },
    setSlideCounter() {
      this.slideCounter = `${this.currentSlide}/${this.slides.length}`;
    },
    changeSlide(dot) {
      this.stopTimer();
      this.setTimer();
      this.currentSlide = dot;
    },
    changeAutoLoop() {
      if (this.auto) {
        this.auto = false;
        this.stopTimer();
      } else {
        this.auto = true;
        this.setTimer();
      }
    }
  },
  watch: {
    currentSlide() {
      if (this.currentSlide <= 0) {
        !this.loop ? this.currentSlide = 1 : this.currentSlide = this.slides.length;
      } else if (this.currentSlide <= this.slides.length) {
        this.sliderContainerTransform = -parseInt(getComputedStyle(this.$refs.slider).width) * (this.currentSlide - 1);
      } else if ((this.currentSlide >= this.slides.length) && !this.loop) {
        this.currentSlide = this.slides.length;
      } else {
        this.sliderContainerTransform = 0;
        this.currentSlide = 1;
      }
      this.setSlideCaption();
      this.setSlideCounter();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/montserrat-v25-latin_cyrillic-regular.woff2') format('woff2'),
    url('./fonts/montserrat-v25-latin_cyrillic-regular.woff') format('woff');
}

* {
  font-family: "Montserrat", Times, serif;
}

.control-buttons__container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  transition-duration: 0.4s;
  padding: 10px;
  background-color: none;
  border-radius: 8px;
  background-color: white;
  color: black;
  border: 1px solid #4CAF50;
  font-family: inherit;
  justify-self: start;
  align-self: start;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

button:active {
  background-color: #0d350f;
  color: white;
  transition-duration: 0.1s;
}

.active {
  background-color: #4CAF50;
  color: white;
}

.slider {
  margin: 0 auto;
  width: 800px;
  height: 400px;
  overflow: hidden;
  display: flex;
  position: relative;
}

.slider__container {
  position: absolute;
  display: flex;
  height: 80%;
  transition: transform 1s;
}

.slider__counter {
  position: absolute;
  top: 0;
}

.slider__caption {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.slider__left-bth {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.slider__right-bth {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.slider__image {
  object-fit: contain;
  width: 800px;
}

.dots-container {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  background-color: rgb(88, 88, 88);
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.dot:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>