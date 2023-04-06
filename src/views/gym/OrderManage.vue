<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, FormProps } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  //import { useModal } from '/@/components/Modal';
  //import Modal from './components/Approve.vue';
  import { formatToDateTime } from '/@/utils/dateUtil';

  import { getOrderList } from '/@/api/gym/gym';
  /* import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();
 */
  export default defineComponent({
    components: { BasicTable },
    setup() {
      // 表头
      const columns: BasicColumn[] = [
        { title: 'ID', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '地址', dataIndex: 'address' },
        { title: '联系电话', dataIndex: 'phone' },
        { title: '创建时间', dataIndex: 'createdAt' },
        { title: '更新时间', dataIndex: 'updatedAt' },
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

      const [registerTable] = useTable({
        api: getOrderList,
        striped: false,
        showIndexColumn: false,
        useSearchForm: true,
        formConfig: formConfig,
        columns: columns,
        rowKey: 'id',
        /* actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        }, */
      });

      return {
        registerTable,
        formatToDateTime,
      };
    },
  });
</script>

<style lang="less" scoped></style>
