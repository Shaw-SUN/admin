<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createdAt'">
          <span>{{ formatToDateTime(record.createdAt * 1000) }}</span>
        </template>
        <template v-if="column.key === 'state'">
          <span v-if="record.state == 1" style="color: blue">未核销</span>
          <span v-else-if="record.state == 2" style="color: green">已核销</span>
          <span v-else-if="record.state == 3" style="color: orange">已取消</span>
        </template>
      </template>
    </BasicTable>
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
        { title: '商品名', dataIndex: 'goodName' },
        { title: '健身房', dataIndex: 'gymName' },
        { title: '价格（元）', dataIndex: 'price' },
        { title: '下单用户', dataIndex: 'username' },
        { title: '下单时间', dataIndex: 'createdAt' },
        { title: '状态', dataIndex: 'state' },
      ];

      // 查询
      const formConfig: Partial<FormProps> = {
        labelWidth: 100,
        showAdvancedButton: false,
        actionColOptions: {
          span: 16,
        },
        schemas: [
          {
            field: 'state',
            component: 'Select',
            label: '状态',
            defaultValue: '0',
            colProps: {
              span: 8,
            },
            componentProps: {
              options: [
                {
                  label: '全部',
                  value: '0',
                  key: '0',
                },
                {
                  label: '未核销',
                  value: '1',
                  key: '1',
                },
                {
                  label: '已核销',
                  value: '2',
                  key: '2',
                },
                {
                  label: '已取消',
                  value: '3',
                  key: '3',
                },
              ],
            },
          },
          {
            field: '[start, end]',
            label: '时间',
            component: 'RangePicker',
            colProps: {
              span: 8,
            },
            componentProps: {
              format: 'YYYY-MM-DD HH:mm:ss',
              placeholder: ['开始时间', '结束时间'],
              showTime: { format: 'HH:mm:ss' },
              valueFormat: 'X',
            },
          },
          {
            field: 'gymName',
            component: 'Input',
            label: '健身房名称',
            colProps: {
              span: 8,
            },
          },
          {
            field: 'goodName',
            component: 'Input',
            label: '商品名称',
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
