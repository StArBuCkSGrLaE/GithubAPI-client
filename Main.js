const URL = 'http://localhost:3000';

Vue.component('user-display', {
  props: ['user'],
  computed: {
      startsWithA() {
        if (this.user.username) {
          if (/[aA]/.test(this.user.username.charAt())) return true;
          return false;
        }
      }
  },
  data() {
    return {
      showFollowers: false,
      followersList: []
    }
  },
  methods: {
    // if username starts with a or A, query for the user's followers list
    toggleShowFollowers() {
      if (this.startsWithA) {
        this.showFollowers = true;
        this.getFollowersList();
      }
    },
    getFollowersList() {
      axios.get(URL + '/followers/' + this.user.username)
      .then(res=> {
        this.followersList = res.data;
      })
      .catch(err=> {
        console.log("Error", err);
      });
    }
  },
  template:
    `<div class="col">
      <div class="image-container">
        <img @mouseenter="toggleShowFollowers" @mouseleave="showFollowers = false" :src="user.avatar" width="60" height="60">
      </div>
      <div v-if="showFollowers">
        <li v-for="follows in followersList">
          {{ follows }}
        </li>
      </div>
    </div>`,
})

// Root Instance
new Vue({
  el: '#app',
  data() {
    return {
      githubUsers: [],
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // receiving repo data from server
    getUserInfo() {
      axios.get(URL + '/repos')
      .then(res=> {
        this.githubUsers = res.data;
      })
      .catch(err=> {
        console.log("Error", err);
      });
    },
    logUser(user) {
      console.log('Error: ${user}');
    }
  }
})
