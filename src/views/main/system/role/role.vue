<template>
  <div class="role">
    <table-page
      :searchConfig="searchConfig"
      :tableConfig="tableConfig"
      ref="tablePageRef"
    >
      <template #handler="scope">
        <handle-edit-btn @click="handleEdit(scope.row)"></handle-edit-btn>
        <handle-delete-btn @click="handleDelete(scope.row, 'name')" />
      </template>
      <template #tableHeader>
        <el-button type="primary" @click="handleAdd">新建角色</el-button>
      </template>
    </table-page>
    <page-modal ref="pageModalRef" :dialogConfig="dialogConfig">
      <template #bottomContent>
        <el-tree
          ref="tree"
          :data="menuData"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import tableConfig from './config/table-config'
import searchConfig from './config/search-config'
import dialogConfig from './config/modal.config'
/*引入hooks*/
import { usePageModal } from '@/hooks/use-page-modal'
import { useTablePage } from '@/hooks/use-table-page'
import { Delete, Edit } from '@element-plus/icons'
import requestStore from '@/store/modules/requestStore'
export default defineComponent({
  name: 'role',
  components: { Delete, Edit },
  setup() {
    const sysStore = requestStore['main/system/user']()
    const { tablePageRef, handleDelete } = useTablePage('角色', 'role')
    let menuData = reactive([])
    const getMenuList = () => {
      sysStore.getMenuList().then((res) => {
        menuData = res ?? []
      })
    }
    getMenuList()
    // 回显其他数据
    const editCallback = () => {
      dialogConfig.formItems?.forEach((item) => {
        if (item.value === 'password') {
          item.hidden = true
        }
        return item
      })
    }
    const [pageModalRef, handleAdd, handleEdit] = usePageModal(
      '角色',
      'role',
      dialogConfig,
      null,
      editCallback
    )
    return {
      menuData,
      tableConfig,
      searchConfig,
      dialogConfig,
      pageModalRef,
      tablePageRef,
      handleAdd,
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style scoped></style>
