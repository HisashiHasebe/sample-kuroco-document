<template>
  <div class="container">
    <main>
      <div>
        <img src="~/assets/image/logo_Kuroco_black.svg" />
      </div>
      <div>
        Visit our <a href="https://kuroco.app/">website</a> if you are new to
        Kuroco!
      </div>
    </main>
    <footer>
      Copyright © {{ new Date().getFullYear() }} Diverta Inc. All rights
      reserved.
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
}

.container {
  display: grid;
  grid-template:
    'main' calc(100vh - 3rem)
    'footer' 3rem /
    auto;
}

main {
  grid-area: main;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
footer {
  grid-area: footer;
  color: #eeedfa;
  background: #000000;
  border-top: 1px solid #3f4044;
  padding: 10px 20px;
  font-size: 0.7rem;
}
</style>
