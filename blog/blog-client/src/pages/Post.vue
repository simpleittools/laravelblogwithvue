<template>
  <h1 class="block text-center text-4xl sm:text-6x leading-10 font-extrabold tracking-tight text-gray-900">{{post.title}}</h1>
  <div class="mt-16 text-grey-500 prose prose-sm lg:prose" v-html="post.body"></div>
</template>

<script>
import usePosts from "../api/usePosts";
import {onMounted} from "vue";
export default {
  name: "Post",
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const {post, fetchPost} = usePosts()

    onMounted(fetchPost(props.slug))

    return {
      post
    }
  }
}
</script>

<style scoped>

</style>