<template>
    <div
        class="fixed w-full h-[calc(100%-80px)] flex items-center mx-auto bg-gradient-to-r from-blue-400 to-transparent bg-purple-600 min-w-[1000px]">
        <button @click="isLyrics = false" type="button"
            class="absolute top-0 m-8 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full">
            <Close :size="30" fillColor="#FFFFFF" />
        </button>
        <div class="w-1/2 max-w-[400px] mx-auto relative flex flex-col items-center">
<div class="mb-4 px-4 py-3 text-xl font-medium leading-none text-center bg-blue-500 text-white rounded-full">
  <span class="mr-2">Word Score:</span>
  <span class="inline-block bg-white text-blue-500 px-3 py-1 rounded-full">{{ totalCorrectCount }}</span>
</div>

            <div v-if="(correctCount + wrongCount === 0) && (wordsSubmitted === 0)"
                class="px-5 py-3 text-lg font-large leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                Type along as the lyrics play!</div>
            <div v-if="(correctCount + wrongCount === 0) && (wordsSubmitted !== 0)"
                class="px-5 py-3 text-lg font-large leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                Wait for the next line...</div>
            <div :style="{ paddingTop: '1rem' }" class="flex items-center justify-end">
                <template v-for="n in correctCount">
                    <svg aria-hidden="true" class="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <title>Star</title>
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                </template>
                <template v-for="n in wrongCount">
                    <svg aria-hidden="true" class="w-10 h-10 text-gray-300 dark:text-gray-500" fill="currentColor"
                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Star</title>
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                </template>
            </div>
            <div :style="{ paddingTop: '1rem' }" class="mb-1 text-lg font-medium dark:text-white"> </div>
            <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${progressBarPercent}%` }">
                </div>
            </div>
            <input type="text" v-model="userInput" @keydown.space.prevent="handleSpacebar"
                class="w-full h-16 px-3 pr-8 text-lg text-white placeholder-white bg-transparent border-2 border-white rounded-full focus:outline-none focus:border-white mt-4"
                placeholder="Type the words here">
        </div>
        <div id="LyricsDiv" class="w-1/2 max-w-[600px] mx-auto relative h-[calc(100%-1px)] overflow-auto scrollbar-hide"
            style="overflow-y: hidden;">
            <div class="my-[90%]"></div>
            <div class="text-center text-[40px] font-semibold opacity-100" v-for="res in lyrics[currentTrack.id]" :key="res"
                :class="snapToPosition(res)" v-show="res">
                <LyricRow :time="res.time" :words="res.words" />
            </div>

            <div class="my-[90%]"></div>
        </div>
    </div>
</template>

<script setup>

import { watch, onMounted, ref } from 'vue'
import Close from 'vue-material-design-icons/Close.vue'
import LyricRow from './LyricRow.vue'
import lyrics from '../lyrics.json'
import artist from '../artist.json'
import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()

let lyricLine = 0
let currentLyricLine = ""
let wordsSubmitted = 0
const userInput = ref("");
const progressBarPercent = ref(0);
const correctCount = ref(0);
const wrongCount = ref(0);
const totalCorrectCount = ref(0);

const { currentTrack, currentArtist, trackTime, isLyrics, spaceBarClicks } = storeToRefs(useSong)

onMounted(() => {
    if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
        document.getElementById('LyricsDiv').scrollTop = 0;
    }
})

const snapToPosition = (res) => {
    if (res && res.time < trackTime.value) {
        let position = document.getElementById(res.time)
        if (position) {
            position.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    }
}

watch(() => trackTime.value, () => {
    setTimeout(() => {
        if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
            document.getElementById('LyricsDiv').scrollTop = 0;
        }
    }, 500)
})

watch(() => currentTrack.value.id, (id) => {
    if (artist[id].lyrics) isLyrics.value = false
})

watch(() => trackTime.value, (trackTime) => {
    lyrics[currentTrack.value.id].forEach(res => {
        if (res.time == trackTime) {
            currentLyricLine = lyrics[currentTrack.value.id][lyricLine].words.split(' ')
            lyricLine++
            wordsSubmitted = 0
            progressBarPercent.value = 0
            correctCount.value = 0
            wrongCount.value = 0
            spaceBarClicks.value = 0
        }
    })
})


const handleSpacebar = () => {
    console.log("currentLyricLine:", currentLyricLine[wordsSubmitted], "wordsSubmitted", wordsSubmitted)
    if (wordsSubmitted < currentLyricLine.length) {
        spaceBarClicks.value++
        if (userInput.value === currentLyricLine[wordsSubmitted]) {
            console.log("correct")
            wordsSubmitted++
            correctCount.value++
            totalCorrectCount.value++
        }
        else {
            console.log("incorrect")
            wordsSubmitted++
            wrongCount.value++
        }
    }
    else {
        correctCount.value = 0
        wrongCount.value = 0
    }
    userInput.value = '';
    progressBarPercent.value = (wordsSubmitted / currentLyricLine.length) * 100
    console.log("pBar", progressBarPercent.value)
};

</script>