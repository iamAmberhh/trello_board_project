<template>
  <div
    class="card-block"
  >
  <div
    class="mb-4 bg-white p-3"
  >
  <el-dropdown split-button type="primary" >
      Group By
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toggleTable('total')">None</el-dropdown-item>
          <el-dropdown-item @click="toggleTable('status')">Status</el-dropdown-item>
          <el-dropdown-item @click="toggleTable('company')">Company</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    
  </div>
    <div
      style="
        padding: 20px;
        background: white;
      "
    >
    <div v-for="item in renderData" :key="item.id">
      <el-table :data="item">
        <el-table-column prop="time" label="告警時間" width="180" />
        <el-table-column prop="clientName" label="客戶公司" width="180"  />
        <el-table-column prop="status" label="狀態" width="180">
          <template #default="scope">
            <el-tag :type="scope.row.status === '等待中' ? 'warning' : scope.row.status === '處理中' ? '' : 'success'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="firstLinePerson" label="一線人員" width="180" />
      </el-table>

    </div>
    </div>
</div>
</template>

<script setup>
const tableData = [
  { name: "A332334-5432", id: 1, status: '等待中', time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' },
  { name: "B332334-5432", id: 2, status: '等待中', time: '2023/12/12 11:00', clientName: '公司B', firstLinePerson: 'Simon' },
  { name: "C332334-5432", id: 3, status: '等待中', time: '2023/12/12 11:00', clientName: '公司B', firstLinePerson: 'Simon' },
  { name: "D332334-5432", id: 4, status: '等待中', time: '2023/12/12 11:00', clientName: '公司C', firstLinePerson: 'Simon' },
  { name: "111", id: 5, status: '處理中', time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon'},
  { name: "222", id: 6, status: '處理中', time: '2023/12/12 11:00', clientName: '公司B', firstLinePerson: 'Simon'},
  { name: "333", id: 7, status: '處理中', time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon'},
  { name: "甲", id: 8, status: '結案', time: '2023/12/12 11:00', clientName: '公司C', firstLinePerson: 'Simon' },
  { name: "乙", id: 9, status: '結案', time: '2023/12/12 11:00', clientName: '公司C', firstLinePerson: 'Simon' },
  { name: "丙", id: 10, status: '結案', time: '2023/12/12 11:00', clientName: '公司A', firstLinePerson: 'Simon' }
]

const total = { 'total': tableData }
const status = Object.groupBy(tableData, ({ status }) => status)
const company = Object.groupBy(tableData, ({ clientName }) => clientName)

const renderData = ref(total)

const toggleTable = (value) => {
  const valueMap = {
    'total': total,
    'status': status,
    'company': company
  };
  renderData.value = valueMap[value]
}

</script>