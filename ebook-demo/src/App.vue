<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App"
};
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  body.style.fontSize = fontSize + "px";
});
</script>

<style>
</style>
