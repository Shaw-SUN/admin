<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    @visible-change="handleVisibleChange(true)"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';

  const schemas: FormSchema[] = [
    {
      field: 'id',
      component: 'Input',
      label: 'ID',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'username',
      component: 'Input',
      label: '用户名',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'password',
      component: 'Input',
      label: '密码',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'avatarUrl',
      component: 'Input',
      label: '头像',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'deptId',
      component: 'Input',
      label: '部门',
      colProps: {
        span: 20,
      },
    },
    {
      field: 'roleId',
      component: 'Input',
      label: '角色',
      colProps: {
        span: 20,
      },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      adminData: { type: Object },
    },
    setup(props) {
      const modelRef = ref({});
      const [registerForm] = useForm({
        labelWidth: 80,
        schemas,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps }] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        setModalProps({ title: data.title + '管理员' });
        //if (data.id){}
        //modelRef.value = { field2: data.data, field1: data.info };
      }

      function handleVisibleChange(v) {
        v && props.adminData && nextTick(() => onDataReceive(props.adminData));
      }

      return { register, schemas, registerForm, model: modelRef, handleVisibleChange };
    },
  });
</script>
