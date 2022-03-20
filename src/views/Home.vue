<template>
  <div className="home">
    <post-preview v-for="(p,i) in $data.posts" :key="i" :post-sender="p.sender" :post-title="p.title"
                  :post-content="p.content" :post-send-date="p.sendTime" :post-pic-url="p.imgUrl"
                  :post-last-replied-time="p.lastRepliedTime" :post-replied-count="p.repliedCount"></post-preview>
  </div>
</template>

<script>

import PostPreview from "@/components/PostPreview";
import axios from "axios";

export default {
  name: 'Home',
  data: function () {
    return {
      user: {
        userName: "huahuaxiaomuzhu"
      },
      posts: []
    }
  },
  components: {
    PostPreview
  },
  beforeCreate() {
    axios.get("http://localhost:4396/section/index", {
      params: {
        id: 4,
        pageNum: 1,
        pageSize: 10
      }
    }).then((res) => {
      console.log(res.data.data.list)
      this.$data.posts = res.data.data.list
    })
  }
}
</script>
