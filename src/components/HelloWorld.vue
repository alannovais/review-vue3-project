<script setup>
import router from "@/router";
import { ref, onMounted } from "vue";

let title = "List tasks";

let agenda = ref([]);

const loadList = () => {
  let array = JSON.parse(localStorage.getItem("contacts"));
  if (array == null || typeof array === "undefined") return;
  agenda.value = array;
};

onMounted(() => {
  loadList();
});

const goToDetail = (index) => {
  router.push({ path: `/task/${index}` });
};

const goToAddContact = () => {
  router.push({ path: `/task` });
};
</script>

<template>
  <div
    class="hello"
    style="display: flex; justify-content: center; flex-direction: column"
  >
    <h1 style="color: #123644">{{ title }}</h1>
    <div style="display: flex; justify-content: flex-end">
      <v-btn
        type="button"
        width="20"
        elevation="6"
        color="#14697f"
        @click="goToAddContact"
        ><span>
          <v-icon color="#20dad8" icon="mdi-plus" class="colorPositionArrow"
        /></span>
      </v-btn>
    </div>
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0.5rem;
        padding: 2rem;
      "
    >
      <div
        v-for="(item, index) in agenda"
        :key="index"
        style="width: 300px; aspect-ratio: 16/9; background-color: #1da1c7; display: flex; justify-content: center;"
        @click="goToDetail(item.id)"
      >
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="color: white;">
            <p><b>Contact: </b> {{ item.name }}</p>
            <p><b>Phone: </b> {{ item.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
