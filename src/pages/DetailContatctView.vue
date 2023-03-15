<script setup>
import router from "@/router";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import AlertConfirm from "@/components/AlertConfirm";

const route = useRoute();
let array = JSON.parse(localStorage.getItem("contacts"));

let user = ref({
  id: 0,
  name: "",
  contact: "",
  email: "",
  picture: "",
});

const loadUpdate = () => {
  if (array == null || typeof array === "undefined") return;
  if (route.params.id && !array.find((e) => e.id == route.params.id))
    return router.push({ path: `/` });
  let filtred = [];
  if (array.length > 0) filtred = array.filter((e) => e.id == route.params.id);
  if (filtred.length > 0) user = filtred[0];
};

onMounted(() => {
  loadUpdate();
});

let title = !route.params.id ? "Create task" : "Update task";
let image = ref("");

const userReset = {
  id: 0,
  name: "",
  contact: "",
  email: "",
  picture: "",
};

const register = (param) => {
  console.log(param.picture);
  if (param.contact.trim().length == 0 || param.contact.trim().length == 0)
    return;
  let agenda = [];
  let store = localStorage.getItem("contacts");
  let objAgenda = { ...param };

  if (store == null || typeof store === "undefined") {
    objAgenda.id = agenda.length + 1;
    // if (image.value != "") objAgenda.picture = image.value;
    agenda.push(objAgenda);
    localStorage.setItem("contacts", JSON.stringify(agenda));
  } else {
    agenda = JSON.parse(store);
    objAgenda.id = agenda.length + 1;
    // if (image.value != "") objAgenda.picture = image.value;
    agenda.push(objAgenda);
    localStorage.setItem("contacts", JSON.stringify(agenda));
  }
  user.value = { ...userReset };
  return router.push({ path: `/` });
};

const update = (param) => {
  if (param.contact.trim().length == 0 || param.contact.trim().length == 0)
    return;
  let agenda = [];
  let store = localStorage.getItem("contacts");
  let objAgenda = { ...param };

  if (!store == null || typeof store !== "undefined") {
    agenda = JSON.parse(store);
    if (agenda.length > 0) {
      let updated = agenda.map((e) => {
        if (e.id == route.params.id) {
          e = { ...objAgenda };
        }
        // if (image.value != "") e = image.value;
        return e;
      });
      localStorage.setItem("contacts", JSON.stringify(updated));
    }
  }
  user.value = { ...userReset };
  return router.push({ path: `/` });
};

const oepnDelete = () => {
  openDialog.value = true;
};

let openDialog = ref(false);
let dialog = {
  titleDialog: "Confirm remove!",
  msgDialog: "Wold you like to confirm remove this record?",
  btCofirmDialog: "Confirm",
  btCancelDialog: "Cancel",
};

const OnConfirm = () => {
  openDialog.value = false;
  let store = localStorage.getItem("contacts");
  if (store == null || typeof store === "undefined") return;
  let array = JSON.parse(store);
  if (array.length > 0) {
    let deleteArray = array.filter((e) => e.id != route.params.id);
    localStorage.setItem("contacts", JSON.stringify(deleteArray));
  }
  return router.push({ path: `/` });
};

const onCancel = () => {
  openDialog.value = false;
};

const goToList = () => {
  router.push({ path: `/` });
};

const picture = (event) => {
  let file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const encodedFile = reader.result.split(",")[1];
    const data = {
      file: encodedFile,
    };
    try {
      await console.log("upload!");
      image = data.file;
      console.log(image);
    } catch (error) {
      console.error(error);
    }
  };
};
</script>

<template>
  <div class="hello container_manager_task">
    <h1 style="color: #123644">{{ title }}</h1>
    <div class="group_buttons">
      <div>
        <v-btn
          type="button"
          width="20"
          @click="goToList"
          elevation="6"
          color="#14697f"
          ><span>
            <v-icon
              color="#20dad8"
              icon="mdi-arrow-left"
              class="colorPositionArrow"
          /></span>
        </v-btn>
      </div>
      <div
        v-if="user.id != 0"
        style="background-color: white"
        @click="oepnDelete()"
      >
        <v-icon
          color="red"
          icon="mdi-trash-can-outline"
          class="colorPositionArrow"
        />
      </div>
    </div>
    <div>
      <form @keyup.enter="register(user)">
        <v-text-field v-model="user.name" variant="outlined" label="Name" />
        <v-text-field
          v-model="user.contact"
          variant="outlined"
          label="Contact"
          persistent-hint
          type="number"
        />
        <v-text-field
          v-model="user.email"
          variant="outlined"
          label="Email"
          persistent-hint
          type="email"
        />
        <v-text-field
          v-model="user.picture"
          variant="outlined"
          label="Photo"
          @change="picture"
          persistent-hint
          accept="image/*"
        />
        <!-- <div>
            <img :src="'data:image/png;base64,' + image" alt="Contact Image"/>
        </div> -->
        <v-btn
          v-if="user.id == 0"
          type="button"
          :width="'1000'"
          :color="'#123644'"
          @click="register(user)"
          ><span style="color: #20dad8">Save</span>
        </v-btn>
        <v-btn
          v-else
          type="button"
          :width="'1000'"
          :color="'#123644'"
          @click="update(user)"
          ><span style="color: #20dad8">Update</span>
        </v-btn>
      </form>
    </div>
    <AlertConfirm
      :setDialog="openDialog"
      :dialogArray="dialog"
      @OnConfirm="OnConfirm"
      @onCancel="onCancel"
    />
  </div>
</template>
<style scoped>
.container_manager_task {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.group_buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.3rem;
}
</style>
