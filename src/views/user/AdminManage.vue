<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'state'">
          <div style="color: #70b603">启用</div>
        </template>
        <template v-else-if="column.key === 'role'">
          <div v-if="record.payChannelId === 2">活动管理员</div>
          <div v-else-if="record.payChannelId === 1">系统管理员</div>
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, FormProps } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '用户名', dataIndex: 'id' },
        { title: '真实姓名', dataIndex: 'id' },
        { title: '角色', dataIndex: 'role' },
        { title: '状态', dataIndex: 'state' },
        { title: '操作', dataIndex: 'state' },
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
            field: 'name',
            component: 'Input',
            label: '用户名',
            colProps: {
              span: 8,
            },
          },
          {
            field: 'status',
            component: 'Select',
            label: '启用状态',
            colProps: {
              span: 8,
            },
            componentProps: {
              options: [
                {
                  label: '启用',
                  value: '1',
                  key: '1',
                },
                {
                  label: '禁用',
                  value: '2',
                  key: '2',
                },
              ],
            },
          },
        ],
      };

      const [registerTable] = useTable({
        //api: getOrderList,
        striped: false,
        showIndexColumn: false,
        useSearchForm: true,
        formConfig: formConfig,
        columns: columns,
        rowKey: 'id',
      });

      return {
        registerTable,
      };
    },
  });
</script>

<style lang="less" scoped></style>
