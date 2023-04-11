<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'isDisabled'">
          <span style="color: green" v-if="record.isDisabled == 0">正常</span>
          <span style="color: red" v-else-if="record.isDisabled == 1">已禁用</span>
        </template>
        <template v-if="column.key === 'createdAt'">
          <span>{{ formatToDateTime(record.createdAt * 1000) }}</span>
        </template>
        <template v-if="column.key === 'updatedAt'">
          <span>{{ formatToDateTime(record.updatedAt * 1000) }}</span>
        </template>
        <template v-if="column.key === 'state'">
          <span style="color: green" v-if="record.state == 1">已通过</span>
          <span style="color: orange" v-else-if="record.state == 2">待审核</span>
          <span style="color: red" v-else-if="record.state == 3">已驳回</span>
        </template>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '注销',
              popConfirm: {
                title: '确认注销？',
                confirm: cancelGymAction.bind(null, record.id),
              },
              ifShow: () => {
                return record.state == 1;
              },
            },
            {
              label: '详情',
              onClick: open.bind(null, record.id, record.state),
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
  import { BasicTable, useTable, FormProps, TableAction } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { useModal } from '/@/components/Modal';
  import Modal from './components/Approve.vue';
  import { formatToDateTime } from '/@/utils/dateUtil';

  import { getGymList, cancelGym } from '/@/api/gym/gym';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();

  export default defineComponent({
    components: { BasicTable, Modal, TableAction },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '地址', dataIndex: 'address' },
        { title: '联系电话', dataIndex: 'phone' },
        { title: '创建时间', dataIndex: 'createdAt' },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '状态', dataIndex: 'state' },
      ];

      // 查询
      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        showAdvancedButton: false,
        actionColOptions: {
          span: 8,
        },
        schemas: [
          {
            field: 'state',
            component: 'Select',
            label: '审核状态',
            colProps: {
              span: 8,
            },
            componentProps: {
              options: [
                {
                  label: '已通过',
                  value: '1',
                  key: '1',
                },
                {
                  label: '待审核',
                  value: '2',
                  key: '2',
                },
                {
                  label: '已驳回',
                  value: '3',
                  key: '3',
                },
              ],
            },
          },
          {
            field: 'name',
            component: 'Input',
            label: '名称',
            colProps: {
              span: 8,
            },
          },
        ],
      };

      const [registerTable, { reload }] = useTable({
        api: getGymList,
        striped: false,
        showIndexColumn: false,
        useSearchForm: true,
        formConfig: formConfig,
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
      const open = (id: number, state: number) => {
        openModal(true, { id: id, state: state });
      };
      const handleClose = (visible: boolean) => {
        if (!visible) {
          reload();
        }
      };

      const cancelGymAction = (id: number) => {
        cancelGym(id).then(() => {
          notification.success({ message: '成功' });
          reload();
        });
      };

      return {
        registerTable,
        formatToDateTime,
        registerModal,
        open,
        handleClose,
        cancelGymAction,
      };
    },
  });
</script>

<style lang="less" scoped></style>
