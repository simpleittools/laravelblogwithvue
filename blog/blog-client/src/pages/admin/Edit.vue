<template>
<div>

  <div>
    <div class="absolute w-full left-0 top-0 p-6 flex justify-between items-center space-x-6">
      <div class="flex-grow flex items-center">
        <span class="mr-1">/</span> <input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug"
        spellcheck="false" @click="$event.target.select()">
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">Autosaved</span>
        </div>
        <button class="text-sm font-medium">
          Published
        </button>
<!--        todo: fix the preview link.-->
<!--        <router-link class="text-sm font-medium text-gray-800" :to="{name: 'post', params: {slug: post.slug}}">-->
        <router-link class="text-sm font-medium text-gray-800" to="/">
          Preview
        </router-link>
      </div>
    </div>

  </div>
  <div>
    <!--  creating a renderless component to expand the textarea-->
    <ResizeTextarea v-if="post.title">
      <template v-slot:default="{resize, el}">
      <textarea :ref="el" v-model="post.title" @input="resize" class="w-full text-4xl sm:text-6xl leading-10 font-extrabold tracking-tight
      text-gray-900 text-center border-none focus:ring-0 resize-none p-0"></textarea>
      </template>

    </ResizeTextarea>

  </div>
</div>

</template>

<script>
import useAdminPosts from "../../api/useAdminPosts";
import {onMounted, watch, watchEffect} from "vue";
import _ from 'lodash';
import ResizeTextarea from "../../components/ResizeTextarea.vue";
import slugify from "slugify";

export default {
  name: "Edit",
  components: {
    ResizeTextarea
  },
  props: {
    uuid: {
      required: true,
      type: String
    }
  },

  setup(props){
    const {post, fetchPost, patchPost} = useAdminPosts()

    const updatePost = async () => {
      await patchPost(props.uuid)
    }


    const replaceSlug = () => {
      const slug = post.value.slug
      if(slug.charAt(slug.length - 1) == " "){
        return
      }
      post.value.slug = slug ? slugify(slug, {strict:true}) : post.value.uuid
    }
    onMounted(async () => {
      await fetchPost(props.uuid)
      watchEffect(() => {
        replaceSlug()
      })
      // cloning the entire post using LowDash "_" and the cloneDeep function
      watch(() => _.cloneDeep(post), _.debounce(() => {
        updatePost()
      },500))

    })
    return {
      post
    }

  }
}
</script>

<style scoped>

</style>