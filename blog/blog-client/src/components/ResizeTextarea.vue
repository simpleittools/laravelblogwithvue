<script>
import {ref, onMounted} from "vue";

export default {
  name: "ResizeTextarea",
  setup(props, context) {
    const el = ref(null)
    const resizeTarget = (target) => {
      target.style.height = 'auto'
      target.style.height = `${target.scrollHeight}px`


    }
    onMounted(() => {
      resizeTarget(el.value)
    })
    const resize = (e) => {
      resizeTarget(e.target)
    }

    return () => context.slots.default({
      resize,
      el
    })
  },
}
</script>

