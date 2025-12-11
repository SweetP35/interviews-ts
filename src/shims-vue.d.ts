declare module '*.vue'
declare module 'uuid'
declare module 'v-calendar' {
  import { Plugin } from 'vue'
  export const VCalendar: any
  export const VDatePicker: any
  const plugin: Plugin
  export default plugin
}
