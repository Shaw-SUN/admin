<template>
  <BasicModal v-bind="$attrs" @register="register" title="审批" @ok="submit()" destroyOnClose>
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" @submit="handleSubmit()">
        <template #f1>{{ detail.name }}</template>
        <template #f2>{{ detail.address }}</template>
        <template #f3>{{ detail.phone }}</template>
        <template #f4>{{ detail.time }}</template>
        <template #f5>{{ detail.area }}平方米</template>
        <template #f10>
          <a-map height="300px" width="300px" :x="detail.longitude" :y="detail.latitude" />
        </template>
        <template #f6>{{ detail.content }}</template>
        <template #f7>
          <ImagePreview :imageList="detail.logoUrlList" />
        </template>
        <template #f8>
          <ImagePreview :imageList="detail.detailUrlList" />
        </template>
        <template #f9>
          <ImagePreview :imageList="detail.auditUrlList" />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { getGymDetail, auditGym } from '/@/api/gym/gym';
  import { ImagePreview } from '/@/components/Preview/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import AMap from '../components/Gaode.vue';

  const { notification } = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      component: 'Input',
      label: '名称',
      slot: 'f1',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field2',
      component: 'Input',
      label: '地址',
      slot: 'f2',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field3',
      component: 'Input',
      label: '联系电话',
      slot: 'f3',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field4',
      component: 'Input',
      label: '运营时间',
      slot: 'f4',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field5',
      component: 'Input',
      label: '占地面积',
      slot: 'f5',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field10',
      component: 'Input',
      label: '地图点位',
      slot: 'f10',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field6',
      component: 'Input',
      label: '详情',
      slot: 'f6',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field7',
      component: 'Input',
      label: 'logo',
      slot: 'f7',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field8',
      component: 'Input',
      label: '详情图',
      slot: 'f8',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'field9',
      component: 'Input',
      label: '营业执照',
      slot: 'f9',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '',
      colProps: {
        span: 24,
      },
    },
    {
      field: 'state',
      component: 'RadioGroup',
      label: '审核结果',
      colProps: {
        span: 20,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '通过',
            value: '1',
          },
          {
            label: '驳回',
            value: '3',
          },
        ],
      },
    },
    {
      field: 'refuseReason',
      component: 'InputTextArea',
      label: '驳回理由',
      colProps: {
        span: 20,
      },
      required: true,
      ifShow: ({ values }) => {
        return values.state === '3';
      },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm, ImagePreview, AMap },
    setup() {
      const [registerForm, { getFieldsValue, submit }] = useForm({
        labelWidth: 100,
        schemas,
        showActionButtonGroup: false,
      });

      const [register, { closeModal }] = useModalInner((data) => {
        onDataReceive(data);
      });

      const detail = ref({});
      detail.value.auditUrlList = [];
      detail.value.logoUrlList = [];
      detail.value.detailUrlList = [];

      function onDataReceive(data) {
        getGymDetail(data.id).then((res) => {
          detail.value = { ...res };
          detail.value.logoUrlList = detail.value.logoUrl.split(',');
          detail.value.auditUrlList = detail.value.auditUrl.split(',');
          detail.value.detailUrlList = detail.value.detailUrl.split(',');
        });
      }

      const handleSubmit = () => {
        const params = getFieldsValue();
        params.id = detail.value.id;
        auditGym(params).then(() => {
          notification.success({ message: '成功' });
          closeModal();
        });
      };

      return {
        register,
        schemas,
        registerForm,
        handleSubmit,
        submit,
        detail,
      };
    },
  });
</script>
