<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'gender'">
          <span v-if="record.gender == 1">男</span>
          <span v-else-if="record.gender == 2">女</span>
        </template>
        <template v-else-if="column.key === 'isDisabled'">
          <span style="color: green" v-if="record.isDisabled == 0">正常</span>
          <span style="color: red" v-else-if="record.isDisabled == 1">已禁用</span>
        </template>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: changeUserState.bind(null, record.id),
              },
              ifShow: () => {
                return record.isDisabled == '1';
              },
            },
            {
              label: '禁用',
              popConfirm: {
                title: '是否禁用？',
                confirm: changeUserState.bind(null, record.id),
              },
              ifShow: () => {
                return record.isDisabled == '0';
              },
            },
            {
              label: '删除',
              popConfirm: {
                title: '确认删除？',
                confirm: deleteUser.bind(null, record.id),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, FormProps, TableAction } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { getUserList, changeUserState, deleteUser } from '/@/api/manage/user';

  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'nickname' },
        { title: '性别', dataIndex: 'gender' },
        { title: '生日', dataIndex: 'birthday' },
        { title: '手机号', dataIndex: 'mobile' },
        { title: '状态', dataIndex: 'isDisabled' },
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
            field: 'word',
            component: 'Input',
            label: '搜索关键词',
            colProps: {
              span: 10,
            },
          },
        ],
      };

      const [registerTable] = useTable({
        api: getUserList,
        striped: false,
        showIndexColumn: false,
        useSearchForm: true,
        formConfig: formConfig,
        columns: columns,
        rowKey: 'id',
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      return {
        registerTable,
        changeUserState,
        deleteUser,
      };
    },
  });
</script>

<style lang="less" scoped></style>
