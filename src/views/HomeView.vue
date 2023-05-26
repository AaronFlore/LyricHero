<script setup>
// import MixesInspiredBy from "../components/MixesInspiredBy.vue";
// import MultiArtistSelect from "../components/MultiArtistSelect.vue";
import CustomCarousel from "../components/CustomCarousel.vue";
import Highlights from "../components/Highlights.vue";
</script>

<template>
  <div class="max-w-[1500px] mx-auto">
    <div class="mt-8 min-w-[800px]">
      <CustomCarousel
        category="New releases for you"
        :data="[
          {
            url: 'https://picsum.photos/id/89/300/300',
            song: 'Song 2',
            by: 'In Flames',
            releasedOn: '10/02/2023',
          },
          {
            url: 'https://picsum.photos/id/101/300/300',
            song: 'Dark Waters',
            by: 'Delain',
            releasedOn: '09/01/2023',
          },
          {
            url: 'https://picsum.photos/id/121/300/300',
            song: 'Heritage',
            by: 'Distant',
            releasedOn: '10/01/2023',
          },
          {
            url: 'https://picsum.photos/id/134/300/300',
            song: 'Meanwhile',
            by: 'Klone',
            releasedOn: '08/02/2023',
          },
          {
            url: 'https://picsum.photos/id/144/300/300',
            song: 'Truth Decay',
            by: 'You Me At Six',
            releasedOn: '10/01/2023',
          },
          {
            url: 'https://picsum.photos/id/155/300/300',
            song: 'This Is Why',
            by: 'Paramore',
            releasedOn: '10/02/2023',
          },
          {
            url: 'https://picsum.photos/id/166/300/300',
            song: 'The Jaws Of Life',
            by: 'Pierce The Veil',
            releasedOn: '09/23/2023',
          },
          {
            url: 'https://picsum.photos/id/198/300/300',
            song: 'The Future Is Your Past',
            by: 'In The Brian Jonestown Massacre',
            releasedOn: '07/25/2023',
          },
        ]"
      />
    </div>

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="text-white text-xl font-semibold inline-block">
        Highlights
      </div>

      <div class="py-3"></div>

      <div class="flex items-center gap-8">
        <div class="rounded-lg w-1/2">
          <Highlights
            by="Some Artist 1"
            song="Awsome Song for you!"
            image="https://picsum.photos/id/220/800/300"
          />
        </div>
        <div class="rounded-lg w-1/2">
          <Highlights
            by="Some Artist 2"
            song="Another banger BRUV!"
            image="https://picsum.photos/id/229/800/300"
          />
        </div>
      </div>
    </div>

    <div class="px-8 mt-8 min-w-[800px]">
      <div class="py-3"></div>

      <p class="text-center pb-6 text-[#D1D1D6] text-sm">
        Unlock Flow by selecting your favourite artists for improved
        recommendations.
      </p>

      <div class="flex justify-center gap-7 full">
        <div class="flex items-center justify-center relative">
          <img
            width="100"
            class="absolute -left-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/188/300/300"
          />
          <img
            width="115"
            class="absolute -left-[80px] rounded-full z-10 cursor-pointer"
            src="https://picsum.photos/id/66/300/300"
          />
          <img
            width="160"
            class="rounded-full z-20 cursor-pointer"
            src="https://picsum.photos/id/144/300/300"
          />
          <img
            width="115"
            class="absolute -right-[80px] rounded-full z-10 cursor-pointer"
            src="https://picsum.photos/id/141/300/300"
          />
          <img
            width="100"
            class="absolute -right-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/222/300/300"
          />
        </div>
      </div>
      <div class="w-full flex justify-center p-3">
        <button
          type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center"
        >
          ADD ARTISTS
        </button>
      </div>
    </div>

    <div class="pb-40"></div>
  </div>
</template>
