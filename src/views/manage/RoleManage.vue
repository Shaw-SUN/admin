<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button @click="open()"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'state'">
          <span style="color: green" v-if="record.state == 1">正常</span>
          <span style="color: red" v-else-if="record.state == 0">已禁用</span>
        </template>
        <template v-if="column.key === 'createdAt'">
          <span>{{ formatToDateTime(record.createdAt * 1000) }}</span>
        </template>
        <template v-if="column.key === 'updatedAt'">
          <span v-if="record.updatedAt !== 0">{{ formatToDateTime(record.updatedAt * 1000) }}</span>
          <span v-else>暂无</span>
        </template>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: changeState.bind(null, record.id),
              },
              ifShow: () => {
                return record.state == '0';
              },
            },
            {
              label: '禁用',
              popConfirm: {
                title: '是否禁用？',
                confirm: changeState.bind(null, record.id),
              },
              ifShow: () => {
                return record.state == '1';
              },
            },
            {
              label: '删除',
              popConfirm: {
                title: '确认删除？',
                confirm: deleteRoleAction.bind(null, record.id),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <Modal @register="registerModal" @visible-change="handleClose" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/CreateRole.vue';
  import { getRoleList, changeRoleState, deleteRole } from '/@/api/manage/role';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();

  export default defineComponent({
    components: { BasicTable, TableAction, Modal },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '创建时间', dataIndex: 'createdAt' },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '状态', dataIndex: 'state' },
      ];

      const [registerTable, { reload }] = useTable({
        api: getRoleList,
        striped: false,
        showIndexColumn: false,
        columns: columns,
        rowKey: 'id',
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      // 弹窗
      const [registerModal, { openModal }] = useModal();
      // 新增/编辑
      const open = () => {
        openModal(true);
      };

      // 启用
      const changeState = (id: number) => {
        changeRoleState(id).then(() => {
          notification.success({ message: '成功' });
          reload();
        });
      };

      // 删除
      const deleteRoleAction = (id: number) => {
        deleteRole(id).then(() => {
          notification.success({ message: '成功' });
          reload();
        });
      };

      const handleClose = (visible: boolean) => {
        if (!visible) {
          reload();
        }
      };
      return {
        registerTable,
        changeState,
        deleteRoleAction,
        formatToDateTime,
        registerModal,
        open,
        handleClose,
      };
    },
  });
</script>

<style lang="less" scoped></style>
