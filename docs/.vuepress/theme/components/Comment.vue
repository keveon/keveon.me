<template>
  <div id="comment-container"></div>
</template>

<script>
import Gitalk from 'gitalk'

export default {
  name: 'Comment',

  mounted() {
    this.$nextTick(() => {
      this.loadGitalk(this.$route.path)
    })
  },

  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.loadGitalk(to)
      }
    },
  },

  methods: {
    loadGitalk(to) {
      if (typeof Gitalk !== 'undefined' && Gitalk instanceof Function) {
        try {
          this.renderGitalk(to.path)
        } catch (e) {
          console.error(e.message)
        }
      }
    },

    renderGitalk(path) {
      const gitalk = new Gitalk({
        owner: 'keveon',
        admin: ['keveon'],
        repo: 'keveon.me',
        labels: ['comment'],
        clientID: '74fc93094cd7aa3f4484',
        clientSecret: '00ee131f0c4f48d8c93a7e03926f192670fa3c6e',
        distractionFreeMode: true,
        createIssueManually: true,
        id: path,
      })

      const el = document.getElementById('comment-container')
      while (el.hasChildNodes()) el.removeChild(el.firstChild)
      gitalk.render('comment-container')
    },
  },
}
</script>

<style lang="stylus">
@require '~gitalk/dist/gitalk.css'
</style>
