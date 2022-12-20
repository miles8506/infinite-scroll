<template>
  <div class="repo-item">
    <div class="repo-item-top">
      <a class="repo-item-name" :href="detail.url">{{ detail.name }}</a>
      <span class="repo-item-visibility">{{ detail.visibility }}</span>
    </div>
    <div class="repo-item-content">
      <div class="repo-item-des">description：{{ detail.description }}</div>
    </div>
    <div class="repo-item-bottom">
      <div class="repo-item-lang">
        <span 
          class="repo-item-lang__circle"
          :style="{ backgroundColor: languageColor(detail.language)}"
        />
        <span class="repo-item-lang__text">{{ detail.language }}</span>
      </div>
      <div class="repo-item-time">{{ formatUpdateTime(detail.updateTime) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export interface IRepoItem {
  id: number
  name: string
  url: string
  description: string | null
  visibility: string
  language: string
  updateTime: string
}
</script>

<script setup lang="ts">
import { defineComponent, defineProps, withDefaults } from 'vue'

import { dateFormat, transformValueOf } from '@/utils'
import { LanguageColor } from '@/enum'

defineComponent({
  name: 'RepoItem',
  inheritAttrs: false
});

withDefaults(
  defineProps<{
    detail: IRepoItem
  }>(),
  {}
)

const formatUpdateTime = (updateTime: string) => {
  const timeStamp = transformValueOf(updateTime)
  return `Updated on ${dateFormat(timeStamp, 'MMM DD')}`
}

const languageColor = (type: string) => {
  switch (type) {
    case LanguageColor.Vue:
      return '#41b883'
    case LanguageColor.TypeScript:
      return '#3178c6'
    case LanguageColor.JavaScript:
      return '#f1e05a'
    case LanguageColor.HTML:
      return '#e34c26'
    case LanguageColor.CSS:
      return '#563d7c'
    default:
      return ''
  }
}
</script>

<style lang="scss">
.repo-item {
  padding: 24px 0 24px;
  color: #57606a;
  font-size: 12px;
  border-top: 1px solid hsla(210, 18%, 87%, 1);

  &-name {
    color: #0969da;
    font-weight: 700;
    font-size: 20px;
    vertical-align: middle;

    &:hover {
      text-decoration: underline;
    }
  }

  &-visibility {
    display: inline-block;
    margin: 0 0 0 10px;
    padding: 0 7px;
    border: 1px solid #d0d7de;
    font-size: 12px;
    font-weight: 500;
    color: #57606a;
    border-radius: 10px;
    line-height: 18px;
  }

  &-content {
    margin: 10px 0;
  }

  &-bottom {
    display: flex;
    gap: 0 10px;
  }

  &-lang {
    display: flex;
    align-items: center;
    gap: 0 3px;

    &__circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }

  &-time {
    display: inline-block;
  }
}
</style>
