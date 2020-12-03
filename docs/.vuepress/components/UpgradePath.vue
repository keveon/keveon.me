<script>
export default {
  functional: true,
  props: {
    title: String,
    required: true,
  },
  render(h, { props, slots }) {
    return h(
      'div',
      {
        class: ['upgrade-path'],
      },
      [h('h3', props.title || 'Upgrade Path'), slots().default]
    )
  },
}
</script>

<style lang="stylus">
.upgrade-path
  margin-top: 2em
  padding: 2em
  background: rgba(73, 195, 140, .1)
  border-radius: 1em
  > h3
    margin-top: 0
    border-bottom: ridge
    padding-bottom: 3px
  > p:last-child
    margin-bottom: 0
    padding-bottom: 0
</style>
