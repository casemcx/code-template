import './semi-layer.css';
import './tailwind.css';
import './index.css';

import { Outlet } from '@modern-js/runtime/router';

import { ConfigProvider } from '@douyinfe/semi-ui';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';

// 初始化i18n
import '@/locales';
import { setupI18n, useLocale } from '@/locales';

setupI18n();

export default function Layout() {
  const { lang } = useLocale();

  const locale = useMemo(() => {
    return lang === 'zh-CN' ? zh_CN : en_US;
  }, [lang]);

  return (
    <ConfigProvider locale={locale}>
      <div className="app-layout w-full h-full m-0 p-0">
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
