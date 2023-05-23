<template>
    <div class="fixed w-full h-[calc(100%-80px)] flex items-center mx-auto bg-gradient-to-r from-blue-400 to-transparent bg-purple-600 min-w-[1000px]">
        <button
            @click="isLyrics = false"
            type="button" 
            class="absolute top-0 m-8 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full"
         >
            <Close  :size="30" fillColor="#FFFFFF"/>
        </button>
        <div class="w-1/2 max-w-[400px] mx-auto relative flex flex-col items-center">
            
            <div class="mb-1 text-lg font-medium dark:text-white">Extra Large</div>
            <div class="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" :style="{ width: `${progressBarPercent}%` }"></div>
            </div>
            <input type="text" v-model="userInput" @keydown.space.prevent="handleSpacebar" class="w-full h-16 px-3 pr-8 text-lg text-white placeholder-white bg-transparent border-2 border-white rounded-full focus:outline-none focus:border-white mt-4" placeholder="Type the words here">
            </div>
        <div id="LyricsDiv" class="w-1/2 max-w-[600px] mx-auto relative h-[calc(100%-1px)] overflow-auto scrollbar-hide">
        <div class="my-[90%]"></div>
            <div 
                class="text-center text-[40px] font-semibold opacity-100" 
                v-for="res in lyrics[currentTrack.id]" 
                :key="res"
                :class="snapToPosition(res)"
                v-show="res"
            >
                <LyricRow :time="res.time" :words="res.words"/>
            </div>

            <div class="my-[90%]"></div>
        </div>
    </div>
</template>

<script setup>

import { watch, onMounted, ref} from 'vue'
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


const { currentTrack, currentArtist, trackTime, isLyrics } = storeToRefs(useSong)

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
            console.log("input:", userInput.value)
            if (res.time == trackTime) {
                currentLyricLine = lyrics[currentTrack.value.id][lyricLine].words.split(' ')
                lyricLine++
                wordsSubmitted = 0
                progressBarPercent.value = 0
            }
        })
  })

const handleSpacebar = () => {
        console.log("currentLyricLine:", currentLyricLine[wordsSubmitted], "wordsSubmitted", wordsSubmitted)
        if (wordsSubmitted < currentLyricLine.length) {
            if (userInput.value === currentLyricLine[wordsSubmitted]) {
                console.log("correct")
                wordsSubmitted++
            }
            else {
                console.log("incorrect")
                wordsSubmitted++
            }
        }
        userInput.value = ''; 
        progressBarPercent.value = (wordsSubmitted / currentLyricLine.length) * 100
        console.log("pBar", progressBarPercent.value)
};

</script>