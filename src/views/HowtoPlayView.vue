<template>
  <div>
    <div class="px-8 mt-4 min-w-[800px]">
      <div class="flex justify-center gap-7 full">
        <div class="flex items-center justify-center relative">
          <img width="100" class="absolute -left-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/188/300/300" />
          <img width="115" class="absolute -left-[80px]  rounded-full z-10 cursor-pointer"
            src="/images/albumCovers/Pina_Colada.jpeg" />
          <img width="160" class="rounded-full z-20 cursor-pointer" src="/images/albumCovers/fireType2.jpeg" />
          <img width="115" class="absolute -right-[80px] rounded-full z-10 cursor-pointer"
            src="/images/albumCovers/rumours.jpeg" />
          <img width="100" class="absolute -right-36 rounded-full z-0 cursor-pointer"
            src="https://picsum.photos/id/222/300/300" />
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center mt-4">
      <div class="max-w-3xl mx-auto p-8 bg-gray-800 rounded-lg text-white">
        <h1 class="text-3xl font-semibold mb-6">HOW TO PLAY</h1>
        <ol class="mb-6 list-decimal list-inside">
          <li>Select a song from the tracklist</li>
          <li>Type the highlighted word on the right in the input box on the left</li>
          <li>Once you've typed the whole word, press the spacebar to submit the word</li>
          <li>If it's correct, your word score will increase; be careful punctuation and capitalization matter</li>
          <li>You must try to type all the words in each line of the song before the next line begins</li>
          <li>The timer bar on the left indicates how much time is left until the next line of the song</li>
          <li>Type as fast you can and have fun!</li>
        </ol>
        <RouterLink to="/">
          <div class="text-center mt-10">
            <button type="button"
              class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center">
              PLAY NOW
            </button>
          </div>
        </RouterLink>
      </div>
  </div>
</div></template>
