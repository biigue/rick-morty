<template>
  <table class="table">
    <slot />
  </table>
</template>

<style lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
  border-spacing: 0;
  max-width: 800px;
  > tr {
    cursor: pointer;
    height: 66px;
    border-bottom: 1px #eaedee solid;
    &:hover {
      background-color: #baffac;
    }
    > td {
      white-space: nowrap;
      text-overflow: ellipsis;
      white-space: pre-wrap;
      font-size: 14px;
      padding-left: 24px;
      color: black;
      word-break: break-all;
      &.-name {
        color: #02b1c8;
        font-size: 16px;
      }
    }
  }
}
</style>
