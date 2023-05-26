<template>
  <div :id="time" class="my-10 text-white opacity-100" :class="{ 'opacity-30': lyricsPosition !== time }">
    <div>
      <span v-for="(word, index) in wordList" :key="index" :class="{ 'bg-yellow-500': index === spaceBarClicks && lyricsPosition === time }">
        {{ word }}&nbsp;
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRefs, watch } from 'vue';
import lyrics from '../lyrics.json';
import { useSongStore } from '../stores/song';
import { storeToRefs } from 'pinia';

const useSong = useSongStore();
const { trackTime, currentTrack, lyricsPosition, spaceBarClicks } = storeToRefs(useSong);

const props = defineProps({ time: String, words: String });
const { time, words } = toRefs(props);

const wordList = words.value.split(' ');

watch(() => trackTime.value, (trackTime) => {
  lyrics[currentTrack.value.id].forEach((res) => {
    if (res.time == trackTime) {
      lyricsPosition.value = res.time;
    }
  });
});

</script>
