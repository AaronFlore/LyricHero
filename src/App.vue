<script setup>
import { onBeforeMount } from 'vue';
import { RouterView, RouterLink } from 'vue-router'

import Magnify from 'vue-material-design-icons/Magnify.vue';
import MusicNote from 'vue-material-design-icons/MusicNote.vue';
import SideMenuItem from './components/SideMenuItem.vue';
import MusicPlayer from './components/MusicPlayer.vue';
import SongLyrics from './components/SongLyrics.vue';

import { useSongStore } from './stores/song'
import { storeToRefs } from 'pinia';
const useSong = useSongStore()
const { isPlaying, currentTrack, isLyrics, trackTime } = storeToRefs(useSong)

onBeforeMount(() => { 
  isPlaying.value = false
  isLyrics.value = false
  trackTime.value = '0:00'
})
</script>

<template>

  <div
    id="SideNav"
    class="fixed w-[240px] bg-[#191922] h-[100vh] border-r border-r-[#32323D]"
  >
    <div class="w-full pl-6 pt-3 cursor-pointer">
    <RouterLink to="/">
      <div class="flex items-center mr-3 mt-2">
        <MusicNote class="w-500 h-500 text-slate-400 mr-1" />
        <span class="text-3xl font-bold text-slate-100">Lyric Hero</span>
      </div>
    </RouterLink>
    </div>

    <div class="mt-[53px]"></div>
    
    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/" name="Play" />
    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/howtoplay" name="How to Play" />
    <SideMenuItem iconString="explore" :iconSize="20" pageUrl="/leaderboard" name="Leaderboard" />
    <SideMenuItem iconString="favourite" :iconSize="20" pageUrl="/about" name="About" />

  </div>

  <div class="fixed w-[calc(100%-240px)] h-[calc(100%-56px)] ml-[240px] overflow-x-auto">
      <RouterView />
  </div>
  
  <MusicPlayer v-if="currentTrack"/>

  <SongLyrics 
    v-if="isLyrics"
    :class="{'animate__animated animate__slideInUp animate__faster': isLyrics}"
  />
</template>
