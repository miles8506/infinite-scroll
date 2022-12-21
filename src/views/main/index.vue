<template>
  <div class="main">
    <div class="main-list">
      <div
        v-for="repo in repoList"
        :key="repo.id"
        class="main-item"
      >
        <RepoItem :detail="repo" />
      </div>
    </div>
    <div class="main-observer" ref="observerRef" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestAllRepo } from '@/service'

import RepoItem, { IRepoItem } from '@/components/main/repo-item/index.vue'
import { ElLoading } from 'element-plus'

defineComponent({
  name: 'MAIN',
  inheritAttrs: false
})

const repoList = ref<IRepoItem[]>([])
const observerRef = ref<HTMLDivElement | null>(null)

const repoItemMapping = (data: any[]) => data.map((item: any) => ({
  id: item.id,
  name: item.name,
  url: item.html_url,
  description: item.description,
  visibility: item.visibility,
  language: item.language,
  updateTime: item.updated_at
}))

onMounted(async () => {
  const { data } = await requestAllRepo('miles8506')
  repoList.value = repoItemMapping(data)

  const observer = new IntersectionObserver(async([entry]) => {
    if (entry.isIntersecting) {
      const loadingInstance = ElLoading.service({
        target: observerRef.value!
      })

      const { data } = await requestAllRepo('miles8506')
      repoList.value.push(...repoItemMapping(data))
      
      loadingInstance.close()
    }
  },
  {
    threshold: 0
  })
  
  observer.observe(observerRef.value!)
})

</script>

<style lang="scss">
.main {
  width: 800px;
  margin: 0 auto;
  padding-bottom: 20px;

  &-list {
    margin: 0 auto;
    overflow-y: auto;
  }

  &-observer {
    height: 50px;
  }
}
</style>
