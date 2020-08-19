<template>
  <div id="app">
    <div class="wrapper">
      <div class="app-bar">
        <div class="nav">
          <img alt="Vue logo" src="./assets/logo.png" />
          <div class="logo">
            <span class="title">FrasaL Translator</span>
          </div>
          <div>
            <span class="separator"></span>
          </div>
          <div>
            <ul>
              <li class="active">Translator</li>
              <li class="desktop">Linguee</li>
            </ul>
          </div>
        </div>
        <ul class="desktop">
          <li>
            <span class="badge-container">
              <a class="shiny" href="#">Download for windows</a>
              <span class="badge">new!!</span>
            </span>
          </li>
          <li>
            <a href="#">
              <span class="material-icons">login</span> Login
            </a>
          </li>
          <li>
            <a href="#">
              <span class="material-icons">menu</span>
            </a>
          </li>
        </ul>
      </div>

      <Translate v-if="dictionary" v-bind:dictionary="dictionary" />
      <Loading v-if="!dictionary" />
      <div class="push"></div>
    </div>

    <div class="footer">
      <div class="content">
        <span role="img" title="love" aria-label="love">♥</span> by
        <a
          target="_blank"
          style="color: unset;"
          href="https://florius.com.ar"
          rel="noopener noreferrer"
        >Florius</a>.
      </div>
    </div>
  </div>
</template>

<script>
import Translate from "./components/Translate.vue";
import Loading from "./components/Loading.vue";
import { getDictionary } from "./lib/api";

export default {
  name: "App",
  components: {
    Translate,
    Loading,
  },
  data: function () {
    return { dictionary: false };
  },
  created() {
    getDictionary().then((dictionary) => {
      this.dictionary = dictionary;
    });
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 950px) {
  .desktop {
    visibility: hidden !important;
    display: none !important;
  }
}

#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html,
body {
  height: 100%;
  margin: 0;
  background: #f1f1f1;
}

.wrapper {
  min-height: 100%;
  margin-bottom: -50px;
}

.footer,
.push {
  height: 50px;
}

.footer .content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #9a9a9a;
}

.material-icons {
  vertical-align: middle;
}

.badge-container {
  position: relative;

  .badge {
    top: -13px;
    position: absolute;
    right: -4px;
    border-radius: 4px;
    background: #f44336;
    color: #fff;
    padding: 1px 6px;
    font-size: 0.8rem;
    font-weight: bold;
  }
}

.app-bar {
  background: #fff;
  display: flex;
  padding: 0 70px 0 80px;
  height: 60px;
  overflow: hidden;

  @media screen and (max-width: 950px) {
    padding: 0 20px 0 80px;
  }

  .separator {
    margin: 0 30px 0 16px;
    border-left: 2px solid #f1f1f1;
    height: 20px;
  }

  .nav {
    flex: 1;

    div {
      display: inline-flex;
      height: 100%;
    }
  }

  img {
    height: 60px;
    top: 8px;
    left: 40px;
    position: absolute;
  }

  .logo {
    .title {
      font-weight: bold;
      padding: 20px 15px 0 15px;
      font-family: "Montserrat", sans-serif;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    padding: 0;

    li {
      display: inline-block;
      list-style-type: none;
      margin-right: 28px;

      &.active {
        border-bottom: 3px solid #006494;
      }
    }
  }

  .shiny {
    display: inline-block;
    border-radius: 4px;
    background-color: #f46f52;
    color: #fff;
    padding: 0.5em 1em;
    font-weight: 400;
    transition: background-color 100ms ease-out;
    text-align: center;
    margin: 0 10px;
    line-height: 1em;

    &:hover {
      background-color: #0f2b46;
      color: #fff;
    }
  }
}
</style>
