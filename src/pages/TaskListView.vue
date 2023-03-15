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
  <div class="hello container_list">
    <h1 style="color: #123644">{{ title }}</h1>
    <div class="position_button">
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
    <div class="grid_task">
      <div
        v-for="(item, index) in agenda"
        :key="index"
        class="tasks"
        @click="goToDetail(item.id)"
      >
        <div class="desc_task">
          <div style="color: white">
            <p><b>Contact: </b> {{ item.name }}</p>
            <p><b>Phone: </b> {{ item.contact }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container_list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.position_button {
  display: flex;
  justify-content: flex-end;
}
.grid_task {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 2rem;
}
.tasks {
  width: 300px;
  aspect-ratio: 16/9;
  background-color: #1da1c7;
  display: flex;
  justify-content: center;
}
.desc_task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
