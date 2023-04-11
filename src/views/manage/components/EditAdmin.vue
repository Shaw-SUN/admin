<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    @ok="submit()"
    destroyOnClose
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" @submit="handleSubmit()" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import {
    createAdmin,
    editAdmin,
    getAdminDetail,
    getDepartments,
    getRoles,
  } from '/@/api/manage/admin';
  import { uploadApi } from '/@/api/sys/upload';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { notification } = useMessage();

  const schemas: FormSchema[] = [
    {
      field: 'username',
      component: 'Input',
      label: '用户名',
      colProps: {
        span: 20,
      },
      required: true,
    },
    {
      field: 'password',
      component: 'Input',
      label: '密码',
      required: true,
      colProps: {
        span: 20,
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: '管理员名称',
      colProps: {
        span: 20,
      },
      required: true,
    },
    {
      field: 'avatarUrl',
      component: 'Upload',
      rules: [{ required: true, message: '请选择上传头像' }],
      label: '头像',
      componentProps: {
        api: uploadApi,
        maxNumber: 1,
        //change:
      },
      colProps: {
        span: 20,
      },
    },
    {
      field: 'deptId',
      component: 'ApiSelect',
      label: '部门',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: {
        api: getDepartments,
        labelField: 'title',
        valueField: 'id',
      },
    },
    {
      field: 'roleId',
      component: 'ApiSelect',
      label: '角色',
      required: true,
      colProps: {
        span: 20,
      },
      componentProps: {
        api: getRoles,
        labelField: 'name',
        valueField: 'id',
      },
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const modelRef = ref({});
      const [registerForm, { getFieldsValue, submit }] = useForm({
        labelWidth: 100,
        schemas,
        showActionButtonGroup: false,
      });

      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        onDataReceive(data);
      });
      const id = ref(null);
      function onDataReceive(data) {
        setModalProps({ title: data.title + '管理员' });
        if (data.id) {
          id.value = data.id;
          getAdminDetail(data.id).then((res) => {
            modelRef.value = {
              username: res.username,
              name: res.name,
              password: res.password,
              avatarUrl: [res.avatarUrl],
              deptId: res.deptId,
              roleId: res.roleId,
            };
          });
        }
      }

      const handleSubmit = () => {
        const params = getFieldsValue();
        params.avatarUrl = params.avatarUrl.toString();
        if (id.value) {
          params.id = id.value;
          editAdmin(params).then(() => {
            notification.success({ message: '成功' });
            closeModal();
          });
        } else {
          createAdmin(params).then(() => {
            notification.success({ message: '成功' });
            closeModal();
          });
        }
      };

      return {
        register,
        schemas,
        registerForm,
        model: modelRef,
        handleSubmit,
        submit,
      };
    },
  });
</script>
