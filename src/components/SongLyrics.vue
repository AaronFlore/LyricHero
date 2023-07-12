<template>
    <div
        class="fixed w-full h-[calc(100%-80px)] flex items-center mx-auto bg-gradient-to-r from-blue-400 to-transparent bg-purple-600 min-w-[1000px]">
        <button @click="isLyrics = false, useSong.playOrPauseSong(), useSong.resetState() " type="button"
            class="absolute top-0 m-8 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full">
            <Close :size="30" fillColor="#FFFFFF" />
        </button>
        <div class="w-1/2 max-w-[400px] mx-auto relative flex flex-col items-center">
            <div v-if="isPlaying == false" role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" class="w-80 h-80 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div class="mb-10 px-6 py-4 text-2xl font-medium leading-none text-center bg-blue-500 text-white rounded-full">
                <span class="mr-3">Word Score:</span>
                <span class="inline-block bg-white text-blue-500 px-4 py-2 rounded-full">{{ totalCorrectCount }}</span>
            </div>
            <div v-if="isPlaying == false"
                class="px-5 py-3 text-lg font-large leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                LOADING SONG...</div>
            <div v-if="(spaceBarClicks === 0) && (wordsSubmitted === 0)"
                class="px-5 py-3 text-lg font-large leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                Type the highlighted word!</div>
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
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${percentage}%` }">
                </div>
            </div>
            <input type="text" v-model="userInput" @keydown.space.prevent="handleSpacebar"
                class="w-full h-16 px-3 pr-8 text-lg text-white placeholder-white bg-transparent border-2 border-white rounded-full focus:outline-none focus:border-white mt-4"
                placeholder="Type the words here">
        </div>
        <div id="LyricsDiv" class="w-1/2 max-w-[600px] mx-auto relative h-[calc(100%-1px)] overflow-auto scrollbar-hide"
            style="overflow-y: hidden">
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
let nextLyricTime = 0
const userInput = ref("");
const progressBarPercent = ref(0);
const correctCount = ref(0);
const wrongCount = ref(0);
const totalCorrectCount = ref(0);
const percentage = ref(0);

const { currentTrack, currentArtist, trackTime, isLyrics, spaceBarClicks, isPlaying} = storeToRefs(useSong)

onMounted(() => {
    if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
        document.getElementById('LyricsDiv').scrollTop = 0;
    }
    nextLyricTime = convertToSeconds(lyrics[currentTrack.value.id][0].time)
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
            userInput.value = ''
            progressBarPercent.value = 0
            correctCount.value = 0
            wrongCount.value = 0
            spaceBarClicks.value = 0
            nextLyricTime = convertToSeconds(lyrics[currentTrack.value.id][lyricLine].time) - convertToSeconds(lyrics[currentTrack.value.id][lyricLine - 1].time)
            startTimer(nextLyricTime)
        }
    })
})

function convertToSeconds(timeInput) {
    const [minutes, seconds] = timeInput.split(":");
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    return totalSeconds;
}

function startTimer(seconds) {
    const startTime = performance.now();
    const endTime = startTime + seconds * 1000;

    const timerInterval = setInterval(() => {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const remainingTime = Math.max(0, endTime - currentTime);

        const decisecondsElapsed = Math.floor(elapsedTime / 100);
        const decisecondsRemaining = Math.ceil(remainingTime / 100);

        percentage.value = ((decisecondsElapsed / (seconds * 10)) * 100).toFixed(2);
        if (remainingTime === 0) {
            clearInterval(timerInterval);
        }
    }, 500);
}


const handleSpacebar = () => {
    if (wordsSubmitted < currentLyricLine.length) {
        spaceBarClicks.value++
        if (userInput.value === currentLyricLine[wordsSubmitted]) {
            wordsSubmitted++
            correctCount.value++
            totalCorrectCount.value++
        }
        else {
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
};


</script>

<style scoped>
.bg-blue-600 {
    transition: width 0.1s ease-in-out;
}
</style>