<template>
  <ConfigProvider :theme="appTheme" :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue';
  import { theme } from 'ant-design-vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import { useAppStore } from '/@/store/modules/app';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { ThemeEnum } from '/@/enums/appEnum';
  import { changeTheme } from '/@/logics/theme/index';

  const appStore = useAppStore();
  // 解决日期时间国际化问题
  import 'dayjs/locale/zh-cn';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  useTitle();
  const appTheme: any = ref({});
  const { getDarkMode } = useRootSetting();
  watch(
    () => getDarkMode.value,
    (newValue) => {
      delete appTheme.value.algorithm;
      if (newValue === ThemeEnum.DARK) {
        appTheme.value.algorithm = theme.darkAlgorithm;
      }
      if (import.meta.env.PROD) {
        changeTheme(appStore.getProjectConfig.themeColor);
      }
      appTheme.value = {
        ...appTheme.value,
      };
    },
    { immediate: true }
  );
  watch(
    appStore.getProjectConfig,
    (newValue) => {
      const primary = newValue.themeColor;
      appTheme.value = {
        ...appTheme.value,
        ...{
          token: {
            colorPrimary: primary,
            wireframe: true,
            fontSize: 14,
            colorSuccess: '#55D187',
            colorInfo: primary,
            borderRadius: 2,
            sizeStep: 4,
            sizeUnit: 4,
            colorWarning: '#EFBD47',
            colorError: '#ED6F6F',
          },
        },
      };
    },
    { immediate: true }
  );
  setTimeout(() => {
    appStore.getProjectConfig?.themeColor && changeTheme(appStore.getProjectConfig.themeColor);
  }, 300);
</script>
<style lang="less">
  img {
    display: inline-block;
    color: red;
  }
</style>
