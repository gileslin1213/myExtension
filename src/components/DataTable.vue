<script setup>
import useListStore from '@/store/list';

const store = useListStore();
const editData = reactive({ type: null, formData: null });
const rowHover = reactive({ ref: null, description: null });
const RowClassName = ({ row }) => (row.checked ? '' : 'unchecked');
const onDrop = (evt) => {
  const savaTab = evt.dataTransfer.getData('tab');
  const _obj = JSON.parse(savaTab);
  editData.formData = _obj;
  editData.type = 'create';
};
const handleMouseEnter = (row, column, cell, event) => {
  rowHover.ref = event.target.parentElement;
  rowHover.description = row.description;
};
const handleRightClick = (row, column, event) => {
  event.preventDefault();
  editData.formData = row;
  editData.type = 'edit';
};

const cancel = () => {
  editData.type = null;
  editData.formData = null;
};
</script>

<template>
  <div style="height: 100%" @drop="onDrop" @dragover.prevent @dragenter.prevent>
    <el-table
      :data="store.list"
      :default-sort="{ prop: 'time', order: 'descending' }"
      :show-header="false"
      :row-class-name="RowClassName"
      max-height="calc(100vh - 120px)"
      @cell-mouse-enter="handleMouseEnter"
      @row-contextmenu="handleRightClick"
      @mouseleave="rowHover.ref = null"
    >
      <el-table-column width="40">
        <template #default="scope">
          <img :src="scope.row.favIconUrl || 'favicon.ico'" />
        </template>
      </el-table-column>
      <el-table-column prop="title" />
      <el-table-column width="400">
        <template #default="scope">
          <el-tag v-for="(item, i) in scope.row.tags" :key="i" effect="plain">
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template #default="props">
          {{ props.row.description }}
        </template>
      </el-table-column>
    </el-table>
    <editForm
      v-if="editData.type"
      v-bind="editData"
      @create="store.addDatum"
      @remove="store.removeDatum"
      @edit="store.editDatum"
      @cancel="cancel"
    ></editForm>
    <el-tooltip
      :visible="rowHover.ref && rowHover.description ? true : false"
      :virtual-ref="rowHover.ref"
      virtual-triggering
      trigger="hover"
      :content="rowHover.description"
      :popper-options="{
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom'],
            },
          },
        ],
      }"
    />
  </div>
</template>

<style scoped>
.el-table {
  font-size: 18px;
}

img {
  width: 20px;
  vertical-align: middle;
}

.el-tag {
  margin-right: 0.5em;
}
</style>
<style>
.el-table .unchecked {
  background-color: var(--el-color-danger-light-9);
}

.el-table .cell {
  line-height: 30px;
}
</style>
