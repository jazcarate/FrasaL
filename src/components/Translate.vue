<template>
  <div class="wrapper">
    <h3>
      Translate from
      <strong>
        <a href="#">
          Julino's broken spanish
          <span class="material-icons">expand_more</span>
        </a>
      </strong>
    </h3>

    <div class="editor-holder">
      <textarea
        v-model="query"
        class="textarea"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      ></textarea>
      <div class="textarea">
        <span
          v-for="(chunk, index) in translations"
          :class="{ highlight: !!chunk.translated }"
          :key="index"
        >{{chunk.original}}</span>
      </div>
    </div>

    <h3>
      To
      <strong>
        <a href="#">
          proper spanish
          <span class="material-icons">expand_more</span>
        </a>
      </strong>
    </h3>
    <div class="editor-holder">
      <Loading v-bind:value="loading" />
      <div class="textarea">
        <span
          v-for="(chunk, index) in translations"
          :class="{ highlight: !!chunk.translated }"
          v-on:click="focus = chunk"
          :key="index"
        >{{chunk.translated || chunk.original}}</span>
      </div>
    </div>

    <transition name="fade">
      <div class="lemma" v-if="focus" mode="out-in">
        <h2>
          {{focus.original}}
          <em>(smt.)</em>
        </h2>
        <div class="content">Del ingles: "{{focus.english}}"</div>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from "lodash";

import Loading from "./Loading.vue";
import { translate } from "../lib/translate";

export default {
  name: "Translate",
  components: {
    Loading,
  },
  data: function () {
    return {
      query: decodeURIComponent(location.hash.substr(1)),
      focus: "",
      loading: 30,
    };
  },
  computed: {
    translations() {
      return translate(this.query);
    },
  },
  methods: {
    load: _.debounce(function () {
      console.log("done");
      this.loading = 100;
    }, 2000),
  },
  watch: {
    query: function (val) {
      location.hash = encodeURIComponent(val);
      this.load();
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.wrapper {
  width: 66%;
  margin: auto;
}

.highlight {
  text-shadow: 0px 0px 7px #42b983;
  cursor: pointer;
}

h3 {
  margin: 40px 0 10px;
  a {
    color: #42b983;
  }
}

.lemma {
  h2 {
    color: #265180;
    em {
      font-size: 0.4em;
    }
  }
  .content {
    margin-left: 10px;
  }
}

.editor-holder {
  position: relative;
  width: 100%;
  height: 200px;
  background: #fff;
  overflow: hidden auto;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.4);

  .textarea {
    width: 100%;
    height: auto;

    border: 0;

    position: absolute;
    top: 0;
    left: 0;

    margin: 0;
    padding: 20px !important;

    font-size: 14px;
    line-height: 21px;
    overflow: visible;

    transition: all 0.5s ease-in-out;
    font-family: "Raleway", sans-serif;
    white-space: pre;
  }

  textarea {
    background: transparent !important;
    z-index: 2;
    height: auto;
    resize: none;
    color: #fff;
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    caret-color: #42b983;

    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 1);
    }

    &:focus {
      outline: 0;
      border: 0;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }
  }

  code {
    z-index: 1;
  }
}

.material-icons {
  vertical-align: middle;
}
</style>
