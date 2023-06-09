<template>
    <li @mouseenter="isHover = true" @mouseleave="isHover = false"
        class="flex items-center justify-between p-3 hover:bg-[#979797] hover:bg-opacity-5">
        <div class="flex items-center">
            <div class="relative">
                <div v-if="isHover" class="p-2 mt-[3px] ml-[4px] absolute rounded-full bg-white cursor-pointer">
                    <Play v-if="!isPlaying" @click="useSong.playOrPauseThisSong(artist, track), openLyrics(track, artist)"
                        :size="30" />
                    <Play v-else-if="isPlaying && currentTrack.name !== track.name"
                        @click="useSong.loadSong(artist, track), openLyrics(track, artist)" :size="30" />
                </div>
                <div v-if="track && currentTrack && currentTrack.name === track.name"
                    class="p-2 mt-[3px] ml-[4px] absolute rounded-full bg-white cursor-pointer">
                    <Pause v-if="!isHover && isPlaying" :size="30" @click="useSong.playOrPauseSong()" />
                </div>
                <div @mouseenter="isHoverGif = true" @mouseleave="isHoverGif = false"
                    v-if="isPlaying && track && currentTrack && currentTrack.name === track.name"
                    class="p-2 mt-[3px] ml-[4px] absolute rounded-full bg-white cursor-pointer">
                    <img v-if="!isHoverGif" src="/images/audio-wave.gif" width="50">
                    <Pause v-if="isHoverGif" :size="30" @click="useSong.playOrPauseSong()" />
                </div>
                <img width="55" class="border border-[#494949]" :src="track.albumCover">
            </div>
            <div v-if="track"
                :class="track && currentTrack && currentTrack.name === track.name ? 'text-[#EF5464] text-lg' : 'text-[#d4d4d4] text-lg'"
                class="pl-6 hover:underline cursor-pointer" @click="openLyrics(track, artist)">
                {{ track.id }}. {{ track.name }}

            </div>
        </div>
        <div class="flex items-center">
            <SkullCrossbonesIcon v-if="track.difficulty >= 1" class="w-6 h-6 text-gray-300 dark:text-gray-500"/>
            <SkullCrossbonesIcon v-if="track.difficulty >= 2" class="w-6 h-6 text-gray-300 dark:text-gray-500"/>
            <SkullCrossbonesIcon v-if="track.difficulty >= 3" class="w-6 h-6 text-gray-300 dark:text-gray-500"/>
            <span class='text-[#d4d4d4] text-sm pl-4 pr-4'> Difficulty</span>
            <div v-if="isTrackTime"
                :class="track && currentTrack && currentTrack.name === track.name ? 'text-[#EF5464] text-sm' : 'text-[#d4d4d4] text-sm'"
                class="pl-12 font-[200] text-[#d4d4d4]">
                {{ isTrackTime }}
            </div>
        </div>
    </li>
</template>


<script setup>
import { ref, toRefs, onMounted } from 'vue'
import artist from '../artist.json'

import SkullCrossbonesIcon from 'vue-material-design-icons/SkullCrossbones.vue';
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
import MicrophoneVariant from 'vue-material-design-icons/MicrophoneVariant.vue';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';

import { useSongStore } from '../stores/song'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()
const { audio, isPlaying, currentTrack, isLyrics } = storeToRefs(useSong)

let isHover = ref(false)
let isHoverGif = ref(false)
let isTrackTime = ref('00:00')

const props = defineProps({ track: Object })
const { track } = toRefs(props)

onMounted(() => {
    const audioMeta = new Audio(track.value.path);
    audioMeta.addEventListener('loadedmetadata', () => {
        const duration = audioMeta.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
    });
})

const openLyrics = (track, artist) => {
    if (audio.value && !audio.value.paused && track.id === currentTrack.value.id) {
        isLyrics.value = true
    } else if (audio.value && audio.value.paused && track.id === currentTrack.value.id) {
        useSong.playOrPauseSong()
        isLyrics.value = true
    } else {
        useSong.playOrPauseThisSong(artist, track)
        setTimeout(() => isLyrics.value = true, 500)
    }
}
</script>