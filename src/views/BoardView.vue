<template>
  <div
    class="card-block"
  >
    <div
      style="
        display: flex;
        overflow-x: scroll;
        padding: 20px;
        background: white;
      "
      >
      <el-card
        class="me-3"
        style="min-width:300px; background-color: #f1f6f9;"
        :body-style="{
          'height': '65dvh',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
        }"
      >
        <template #header>
            <div class="card-header">
              <span>等待中</span>
            </div>
        </template>
          <draggable
            class="list-group"
            :list="list1"
            group="people"
            item-key="name"
            v-bind="dragOptions"
            @change="handleTicketStatusChange"
          >
            <template #item="{ element }">
              <el-card
                style="min-width:250px"
                shadow="hover"
                class="list-group-item mb-4 card-hover"
                @click="handleTicketOpen('edit', element.id)"
              >
                <div class="rowBC">
                  <el-tag
                    type="danger"
                    plain
                    size="small"
                  >
                    告警
                  </el-tag>
                  <span>{{ element.time }}</span>
                </div>
                <span class="fw-bold my-1">{{ element.name }}</span>
                <div class="rowBC">
                  <span>{{ element.clientName }}</span>
                  <el-tag plain>
                  {{ element.firstLinePerson }}
                  </el-tag>
              </div>
              </el-card>
            </template>
          </draggable>
          <template #footer>
            <div class="card-footer">
                <span
                  class="rowSC"
                  @click="handleTicketOpen('create')"
                >
                  <el-icon class="me-2"><Plus /></el-icon>
                  <span>新建工單</span>
                </span>
            </div>
        </template>
          
      </el-card>
      <el-card
        class="me-3"
        style="min-width:300px; background-color: #f1f6f9;"
        :body-style="{
          'height': '65dvh',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
        }"
      >
        <template #header>
          <div class="card-header">
            <span>處理中</span>
          </div>
        </template>
        <draggable
          class="list-group"
          :list="list2"
          group="people"
          item-key="name"
          v-bind="dragOptions"
          @change="handleTicketStatusChange"
        >
          <template #item="{ element }">
            <el-card
              style="min-width:250px"
              shadow="hover"
              class="list-group-item mb-4 card-hover"
              @click="handleTicketOpen('edit', element.id)"
            >
              <div class="rowBC">
                <el-tag
                  type="danger"
                  plain
                >
                  告警
                </el-tag>
                <span>{{ element.time }}</span>
              </div>
              <span class="fw-bold my-1">{{ element.name }}</span>
              <div class="rowBC">
                <span>{{ element.clientName }}</span>
                <el-tag plain>
                {{ element.firstLinePerson }}
                </el-tag>
            </div>
            </el-card>
          </template>
        </draggable>
      </el-card>
      <el-card
        class="me-3"
        style="min-width:300px; background-color: #f1f6f9;"
        :body-style="{
          'height': '65dvh',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
        }"
      >
        <template #header>
          <div class="card-header">
            <span>結案</span>
          </div>
        </template>
        <draggable
          class="list-group"
          :list="list3"
          group="people"
          item-key="name"
          v-bind="dragOptions"
          @change="handleTicketStatusChange"
        >
          <template #item="{ element }">
            <el-card
              style="min-width:250px"
              shadow="hover"
              class="list-group-item mb-4 card-hover"
              @click="handleTicketOpen('edit', element.id)"
            >
              <div class="rowBC">
                <el-tag
                  type="danger"
                  plain
                >
                  告警
                </el-tag>
                <span>{{ element.time }}</span>
              </div>
              <span class="fw-bold my-1">{{ element.name }}</span>
              <div class="rowBC">
                <span>{{ element.clientName }}</span>
                <el-tag plain>
                {{ element.firstLinePerson }}
                </el-tag>
            </div>
            </el-card>
          </template>
        </draggable>
      </el-card>
    </div>
    <el-drawer
      v-model="ticketOpenRef"
      direction="rtl"
      :size="ticketSizeRef"
      :before-close="handleTicketClose"
      class="pb-8"
    >
      <template #header>
        <div
          class="rowSC"
        >
          <el-button
            type="info"
            size="small"
            text
            class="me-3"
            @click="handleTicketExpand"
          >
            <svg-icon v-if="fullScreenRef" icon-class="toggle-close"/>
            <svg-icon v-else icon-class="toggle-open"/>
          </el-button>
          <h2 class="fw-bold">{{ ticketDetailFormRef.ticketId ? ticketDetailFormRef.ticketId : '工單編號' }}</h2>
        </div>
      </template>
      <el-form
        ref="refTicketForm"
        label-width="150px"
        :rules="formRules"
        :model="ticketDetailFormRef"
        style="max-width: 500px; margin-left: auto; margin-right: auto;"
      >
        <el-form-item
          v-if="ticketStatusRef === 'create'"
          label="工單編號"
          prop="ticketId"
          :rules="formRules.isNotNull('工單編號為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.ticketId"
          />
        </el-form-item>
        <el-form-item
          label="處理人員"
          prop="ticketOwner"
          :rules="formRules.isNotNull('處理人員為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.ticketOwner"
          />
        </el-form-item>
        <el-form-item
          label="客戶姓名"
          prop="clientName"
          :rules="formRules.isNotNull('客戶姓名為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.clientName"
          />
        </el-form-item>
        <el-form-item
          label="告警時間"
          prop="firstLinePerson"
          :rules="formRules.isNotNull('告警時間為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.firstLinePerson"
          />
        </el-form-item>
        <el-form-item
          label="事件狀態"
          prop="ticketStatus"
          :rules="formRules.isNotNull('事件狀態為必填')"
        >
          <el-select
            v-model="ticketDetailFormRef.ticketStatus"
            placeholder="請選擇狀態"
          >
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item
          label="恢復時間"
          prop="fixedTime"
          :rules="formRules.isNotNull('恢復時間為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.fixedTime"
          />
        </el-form-item>
        <el-form-item
          label="異常時常"
          prop="errorTime"
          :rules="formRules.isNotNull('異常時常為必填')"
        >
          <el-input
            v-model="ticketDetailFormRef.errorTime"
          />
        </el-form-item>
        <el-row
          justify="end"
        >
          <el-button
            type="primary"
            size="small"
            plain
          >
            送出
          </el-button>
        </el-row>
      </el-form>
      <div v-if="ticketStatusRef === 'edit'">

        <el-divider />
        <h2 class="fw-bold mb-4">變更紀錄</h2>
        <div
          v-for="record in changeRecords"
          :key="record.id"
        >
          <div
            class="rowSC"
          >
            <img
              src="@/assets/img/user.png"
              class="avatar"
            />
            <span
              class="fw-bold me-2"
            >
              {{ record.name }}
            </span>
            <span>{{ record.time }}</span>
          </div>
          <p
            style="
              margin: 5px 0px 15px 40px
            "
          >
            {{ record.change }}
          </p>
        </div>
        <el-divider />
        <h2 class="fw-bold mb-4">comment</h2>
        <div
          v-for="comment in comments"
          :key="comment.id"
        >
          <div
            class="rowSC"
          >
            <img
              src="@/assets/img/user.png"
              class="avatar"
            />
            <span
              class="fw-bold me-2"
            >
              {{ comment.name }}
            </span>
            <span>{{ comment.time }}</span>
          </div>
          <p
            style="
              margin: 5px 0px 15px 40px
            "
          >
            {{ comment.content}}
          </p>
        </div>
        <div class="rowSC mt-12">
          <img
              src="@/assets/img/user.png"
              class="avatar"
            />
          <el-input
            v-model="ticketComment"
            placeholder="輸入回覆內容"
            class="me-2"
          />
          <el-button
            size="small"
            plain
          >
            送出
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
const formRules = useElement().formRules
const router = useRouter()
const route = useRoute()

const refTicketForm = ref(null)

const ticketDetailFormRef = ref({})
const ticketOpenRef = ref(false)
const ticketStatusRef = ref(undefined)
const fullScreenRef = ref(false)
const ticketSizeRef = ref('50%')
const screenWidth = ref(window.innerWidth)
const ticketComment = ref(undefined)

const list1 = ref([
  { name: "A332334-5432", id: 1, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "B332334-5432", id: 2, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "C332334-5432", id: 3, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "D332334-5432", id: 4, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
])

const list2 = ref([
  { name: "111", id: 5, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon'},
  { name: "222", id: 6, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon'},
  { name: "333", id: 7, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon'}
])

const list3 = ref([
  { name: "甲", id: 8, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "乙", id: 9, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "丙", id: 10, time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' }
])

const dragOptions = computed(() => ({
  animation: 0,
  group: "description",
  disabled: false,
  ghostClass: "ghost"
}))

const options = [
  {
    label: 'To-Do',
    options: [
      {
        value: '1',
        label: '等待中',
      },
      {
        value: '2',
        label: '新建中',
      },
    ],
  },
  {
    label: 'In Progress',
    options: [
      {
        value: '3',
        label: '進入 SOP 流程',
      },
      {
        value: '4',
        label: '處理中',
      }
    ],
  },
  {
    label: 'Complete',
    options: [
      {
        value: '5',
        label: '不須處理',
      },
      {
        value: '6',
        label: '結案',
      },
    ]
  }
]

const comments = ref([
  {
    id: 1,
    name: 'Amber',
    time: '2023/11/22 14:33',
    content: '內容內容內容內容內容內容內容內容'
  },
  {
    id: 2,
    name: 'kumar',
    time: '2023/11/22 14:33',
    content: '內容內容內容內容內容內容內容內容'
  },
  {
    id: 3,
    name: 'Amber',
    time: '2023/11/22 14:33',
    content: '內容內容內容內容內容內容內容內容'
  }
])

const changeRecords = ref([
  {
    id:1,
    name: 'Amber',
    time: '2023/11/22 14:33',
    change: '將狀態變更為[結案]'
  },
  {
    id:2,
    name: 'Amber',
    time: '2023/11/22 14:53',
    change: '將恢復時間變更為[2023/12/30 12:00], 將異常時長變更為[00:03]'
  }
])

onBeforeMount(() => {
  handleResize()
  const urlParams = new URLSearchParams(route.query)
  if (urlParams.size !== 0 && urlParams.get('ticket_id')) {
    handleTicketOpen('edit', urlParams.get('ticket_id'))
  } 
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})


const handleTicketStatusChange = function (evt) {
  // console.log(evt);
}

const handleTicketOpen = (status, ticketId) => {
  ticketStatusRef.value = status
  ticketOpenRef.value = true
  ticketDetailFormRef.value = {}
  if(status === 'edit'){
    router.push({
      path: '/boardView',
      query: { ticket_id: ticketId }
    })
  } 
}

const handleTicketClose = () => {
  refTicketForm.value.resetFields()
  ticketComment.value = null
  ticketOpenRef.value = false
  router.replace({
    path: '/boardView',
    query: null
  })
}

const handleResize = () => {
  screenWidth.value = window.innerWidth
  if(screenWidth.value < 768){
    fullScreenRef.value = true
    ticketSizeRef.value = "100%"
  } else {
    fullScreenRef.value = false
    ticketSizeRef.value = "50%"
  }
}

const handleTicketExpand = () => {
  fullScreenRef.value = !fullScreenRef.value
  if(fullScreenRef.value){
    ticketSizeRef.value = "100%"
  } else{
    ticketSizeRef.value = "50%"
  }
}
</script>

<style lang="scss" scoped>
.card-block{
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #edece9;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #d3d1cb; 
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: pointer;
}

.card-hover:hover{
  border: 1px solid var(--el-color-primary)
}

.el-card__footer{
  padding: 0px;
}
.el-card{
  --el-card-padding: 10px;
}
.card-footer{
  cursor: pointer;
  padding: 5px;
  &:hover{
    background: #edece9;
    border-radius: 8px;
  }
}

.avatar{
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
}
</style>