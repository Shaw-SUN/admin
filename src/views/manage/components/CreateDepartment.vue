<template>
  <BasicModal v-bind="$attrs" title="新增部门" @register="register" @ok="submit()" destroyOnClose>
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" @submit="handleSubmit()" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { createDepartment } from '/@/api/manage/department';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '名称',
      colProps: {
        span: 20,
      },
      required: true,
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const [register, { closeModal }] = useModalInner();

      const [registerForm, { getFieldsValue, submit }] = useForm({
        labelWidth: 80,
        schemas,
        showActionButtonGroup: false,
      });

      //新增
      const handleSubmit = () => {
        const params = getFieldsValue();
        createDepartment(params).then(() => {
          notification.success({ message: '成功' });
          closeModal();
        });
      };

      return { schemas, register, registerForm, handleSubmit, submit };
    },
  });
</script>
