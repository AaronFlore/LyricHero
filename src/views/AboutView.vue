<template>
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
      <h1 class="text-3xl font-semibold mb-6">About the App</h1>
      <p class="mb-6">
        Welcome to Lyric Hero, a unique web experience that combines music and typing! This app allows you to
        immerse yourself in music while testing and improving your typing skills. Whether you're a music enthusiast,
        language learner, or simply looking for a fun way to engage with lyrics, this app was designed for you.
      </p>
      <p class="mb-6">
        This app was created by Aaron Floreani in Los Angeles, CA. It was built using Vue JS, Vite, Tailwind CSS, and
        Pinia. The source code is available on Github. Feel free to reach out with any questions or feedback!
      </p>
      <div class="text-center mt-10">
        <a href="https://github.com/AaronFlore/LyricHero">
        <button type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center">
          GITHUB REPO
        </button>
        </a>
        <span class="mx-6"></span>
        <a href="aaronfloreani@gmail.com">
        <button type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center">
          EMAIL ME
        </button>
        </a>
        <span class="mx-6"></span>
        <a href="https://www.linkedin.com/in/aaron-floreani/">
        <button type="button"
          class="text-white text-[15px] font-semibold rounded-full bg-[#EF5465] hover:bg-[#d8384a] px-8 py-2 text-center">
          MY LINKEDIN
        </button>
        </a>
      </div>
    </div>
  </div>
</template>
