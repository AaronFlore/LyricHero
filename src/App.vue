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
      <div class="flex items-center">
        <MusicNote class="text-xl text-blue-400 mr-2" />
        <span class="text-xl font-bold text-blue-200">LyricSpeedTyper</span>
      </div>
    </RouterLink>
    </div>

    <div class="mt-[53px]"></div>
    
    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/artist" name="Play" />
    <SideMenuItem iconString="music" :iconSize="20" pageUrl="/" name="Play2" />
    <SideMenuItem iconString="explore" :iconSize="20" pageUrl="/podcasts" name="Leaderboard" />
    <SideMenuItem iconString="favourite" :iconSize="20" pageUrl="/favourite" name="About" />

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
