<script setup>
import { computed } from "vue";

const props = defineProps(["setDialog", "dialogArray"]);

const emit = defineEmits(["OnConfirm", "onCancel"]);

const dialogOpen = computed(() => props.setDialog);
const dialog = computed(() => props.dialogArray);

const OnConfirm = () => {
  emit("OnConfirm", true);
};

const onCancel = () => {
  emit("onCancel", false);
};
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialogOpen" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> {{ dialog.titleDialog }} </v-card-title>
        <v-card-text>{{ dialog.msgDialog }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" variant="text" @click="OnConfirm">
            {{ dialog.btCofirmDialog }}
          </v-btn>
          <v-btn color="darken-1" variant="text" @click="onCancel">
            {{ dialog.btCancelDialog }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
