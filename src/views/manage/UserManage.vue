<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, FormProps } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { getUserList } from '/@/api/manage/user';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '真实姓名', dataIndex: 'nickname' },
        { title: '性别', dataIndex: 'gender' },
        { title: '生日', dataIndex: 'birthday' },
        { title: '操作', dataIndex: 'op' },
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
            label: '用户名',
            colProps: {
              span: 8,
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
      });

      return {
        registerTable,
      };
    },
  });
</script>

<style lang="less" scoped></style>
