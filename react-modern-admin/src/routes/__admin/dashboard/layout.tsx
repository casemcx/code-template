import { ProTableProvider } from '@/components/ProTable';
import { Outlet } from '@modern-js/runtime/router';

export default function DashboardLayout() {
  return (
    <ProTableProvider>
      <Outlet />
    </ProTableProvider>
  );
}
