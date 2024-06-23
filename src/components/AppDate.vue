<template>
  <span :title="showTimeWhenHover()">
    publish at: {{ makeReadableTime() }}
  </span>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default {
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  methods: {
    makeReadableTime() {
      return dayjs.unix(this.timestamp).fromNow();
    },
    showTimeWhenHover() {
      return dayjs.unix(this.timestamp).format("llll");
    },
  },
};
</script>
